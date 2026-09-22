-- The one table this site writes to.
--
-- Run this once, in the Supabase dashboard under SQL Editor. It is written to
-- be safe to run again: every statement is guarded.
--
-- WHAT PROTECTS THIS DATA
--
-- Not the key. next.config.mjs sets output: "export", so the site is static
-- and the publishable key is downloaded by every visitor, exactly as it is
-- designed to be. Row level security is what stands between that key and the
-- table, and the policy below is deliberately one-way:
--
--   insert   granted to anon. Anyone can ask a question.
--   select   NOT granted. There is no select policy, so row level security
--            denies every read. A visitor cannot read back their own row,
--            let alone anyone else's. The founders read this table through
--            the dashboard, which connects as a role that bypasses RLS.
--   update   not granted.
--   delete   not granted.
--
-- The length checks are the trust boundary. Without them the publishable key
-- is an invitation to write a gigabyte into the table.

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null check (char_length(question) between 1 and 4000),
  email text not null check (char_length(email) between 3 and 320),
  -- Which surface it came from. Currently always 'faq'.
  source text not null default 'faq' check (char_length(source) <= 40)
);

alter table public.questions enable row level security;

-- Insert only, and only the columns a visitor should be setting. id and
-- created_at come from their defaults.
revoke all on public.questions from anon, authenticated;
grant insert (question, email, source) on public.questions to anon, authenticated;

drop policy if exists "anyone may ask a question" on public.questions;
create policy "anyone may ask a question"
  on public.questions
  for insert
  to anon, authenticated
  with check (true);

-- Newest first is the only way this is ever read.
create index if not exists questions_created_at_idx
  on public.questions (created_at desc);


-- The early access list.
--
-- Not auth.users. There is no account here: no password, no verification,
-- nothing to sign in to. Someone who presses Continue with Google ends up in
-- auth.users because Supabase puts them there; someone who types their name
-- and address ends up here. Two lists, read with two queries.
--
-- Same one-way grant as public.questions, and for the same reason: the
-- publishable key is public, so insert is all the anonymous role gets. With
-- no select policy nobody can read the list back, which matters more here
-- than it does for questions. A readable table of names and work addresses
-- at a named company is a lead list for whoever asks for it first.

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 320)
);

-- Signing up twice is not an error, and the form treats the 409 this raises
-- as success. Lowercased, so one address is one row whatever case it is
-- typed in.
create unique index if not exists signups_email_key
  on public.signups (lower(email));

alter table public.signups enable row level security;

revoke all on public.signups from anon, authenticated;
grant insert (name, email) on public.signups to anon, authenticated;

drop policy if exists "anyone may join the list" on public.signups;
create policy "anyone may join the list"
  on public.signups
  for insert
  to anon, authenticated
  with check (true);

create index if not exists signups_created_at_idx
  on public.signups (created_at desc);
