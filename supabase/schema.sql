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
