-- Email me when someone asks a question or joins the early access list.
--
-- Run this in the Supabase SQL Editor after schema.sql, and after the two
-- secrets below exist. Safe to run again.
--
-- WHY THERE IS NO EDGE FUNCTION HERE
--
-- The usual recipe for this is a database webhook pointed at a Deno function
-- that calls an email API. That is a second runtime, a second deploy, a
-- second thing to have broken at 3am, and a TypeScript file whose entire body
-- is one fetch. Postgres can make the call itself: pg_net is already
-- available on Supabase, and a trigger is the natural place for "when a row
-- lands, do this". Nothing in the site's code changes at all.
--
-- WHY THE SENDING IS ITS OWN FUNCTION
--
-- Two tables want the same email. Copying the whole thing twice would mean
-- two vault lookups, two http_post calls and two exception handlers to keep
-- in step, and the day one of them is fixed and the other is not is the day
-- this stops being trustworthy. So send_notification() owns everything that
-- is the same, and the two triggers own the only thing that differs: what
-- the email says.
--
-- WHY A FAILED EMAIL MUST NOT FAIL THE INSERT
--
-- The row is the thing that matters. If the key is wrong, the quota is spent
-- or Resend is down, the visitor must still be told they got through,
-- because they did: they are in the table, and the email is only how you
-- hear about it. So send_notification swallows every error it can raise. A
-- question you did not get an email about is recoverable. A question that
-- was never saved is not.

-- ---------------------------------------------------------------- setup
--
-- 1. Sign up at resend.com and create an API key.
--
-- 2. Store the key and your address as secrets. Run this ONCE, with your own
--    values, and do not commit the result:
--
--      select vault.create_secret('re_your_key_here', 'resend_api_key');
--      select vault.create_secret('you@yourdomain.com', 'notify_email');
--
--    To change one later:
--      select vault.update_secret(id, 'new value')
--      from vault.secrets where name = 'resend_api_key';
--
-- 3. Run the rest of this file.
--
-- On the from address: onboarding@resend.dev works immediately but Resend
-- will only deliver it to the address that owns the Resend account, which is
-- fine for this and is why it is the default. To send anywhere else, verify a
-- domain in Resend and change FROM below to something at that domain.

create extension if not exists pg_net with schema extensions;

-- ------------------------------------------------------------ the sender

create or replace function public.send_notification(
  subject text,
  body text,
  reply_to text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  key text;
  inbox text;
begin
  select decrypted_secret into key
    from vault.decrypted_secrets where name = 'resend_api_key';
  select decrypted_secret into inbox
    from vault.decrypted_secrets where name = 'notify_email';

  -- Not configured yet. Saving the row is still the job.
  if key is null or inbox is null then
    return;
  end if;

  perform net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || key
    ),
    body := jsonb_build_object(
      'from', 'PIDA <onboarding@resend.dev>',
      'to', jsonb_build_array(inbox),
      -- So hitting reply in your mail client answers the person directly,
      -- which is the whole point of collecting their address.
      'reply_to', reply_to,
      'subject', subject,
      'text', body
    )
  );
exception
  when others then
    -- Deliberately silent, and deliberately here rather than in the two
    -- triggers: one place to be sure of. An exception escaping this would
    -- roll back the insert that caused it.
    return;
end;
$$;

-- This one is callable: it returns void and takes plain arguments, so with
-- the default grant anyone holding the publishable key could reach it
-- through PostgREST and send whatever they liked from our account. The two
-- triggers below are security definer, so they still reach it; nothing else
-- does.
revoke all on function public.send_notification(text, text, text)
  from public, anon, authenticated;

-- --------------------------------------------------------- the questions

create or replace function public.notify_question()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.send_notification(
    'PIDA question from ' || new.email,
    new.question
      || E'\n\n---\nFrom: ' || new.email
      || E'\nVia: ' || new.source
      || E'\nAt:   ' || new.created_at,
    new.email
  );
  return new;
end;
$$;

drop trigger if exists questions_notify on public.questions;
create trigger questions_notify
  after insert on public.questions
  for each row execute function public.notify_question();

-- ----------------------------------------------------------- the signups

create or replace function public.notify_signup()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.send_notification(
    'PIDA early access: ' || new.name,
    new.name || ' joined the early access list.'
      || E'\n\n---\nFrom: ' || new.email
      || E'\nAt:   ' || new.created_at,
    new.email
  );
  return new;
end;
$$;

drop trigger if exists signups_notify on public.signups;
create trigger signups_notify
  after insert on public.signups
  for each row execute function public.notify_signup();

-- ------------------------------------------------------------- checking
--
-- Insert a row by hand and watch it go:
--
--   insert into public.questions (question, email)
--   values ('test from the SQL editor', 'someone@example.com');
--
--   insert into public.signups (name, email)
--   values ('Test Person', 'someone@example.com');
--
-- pg_net is asynchronous, so the response lands a moment later in:
--
--   select id, status_code, content from net._http_response
--   order by created desc limit 5;
--
-- 200 means Resend accepted it. 401 is a bad key, 403 is usually an
-- unverified from-domain, 422 is a malformed address.
--
-- Note that the signups table has a unique index on lower(email), so a
-- second insert with the same address is a 409 and no email is sent. That
-- is correct: nobody joined, so there is nothing to hear about.
