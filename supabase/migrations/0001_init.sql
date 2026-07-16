-- =============================================================================
-- SpeakScore BD — initial schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`).
-- Safe to re-run: every statement is idempotent (create-if-not-exists / or-replace).
-- =============================================================================

create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- profiles: one row per authenticated user, 1:1 with auth.users
-- -----------------------------------------------------------------------------
create table if not exists public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  email            text,
  full_name        text,
  avatar_url       text,
  is_premium       boolean not null default false,
  is_admin         boolean not null default false, -- optional extra RBAC layer; the
                                                     -- admin panel itself uses a separate
                                                     -- shared-password gate (see lib/admin-auth.ts)
  free_tries_used  integer not null default 0,
  free_tries_limit integer not null default 2,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.profiles is 'One row per user. Source of truth for premium status and free-trial usage.';

-- -----------------------------------------------------------------------------
-- questions: the Part 1 / Part 2 / Part 3 question bank
-- -----------------------------------------------------------------------------
create table if not exists public.questions (
  id                 uuid primary key default uuid_generate_v4(),
  part               smallint not null check (part in (1, 2, 3)),
  topic              text not null,               -- e.g. "Hometown", "Books", "Technology"
  question_text      text not null,                -- Part 1/3 question, or Part 2 cue-card title
  cue_card_points    text[],                       -- Part 2 only: the "You should say:" bullets
  prep_seconds       integer not null default 60,  -- Part 2 preparation time
  min_speak_seconds  integer not null default 60,  -- suggested minimum speaking time
  max_speak_seconds  integer not null default 120, -- hard cap enforced by the recorder
  created_at         timestamptz not null default now()
);

comment on table public.questions is 'Seedable question bank for all three IELTS Speaking parts.';

-- -----------------------------------------------------------------------------
-- attempts: one row per submitted-and-scored answer
-- -----------------------------------------------------------------------------
create table if not exists public.attempts (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references public.profiles (id) on delete cascade,
  question_id                 uuid references public.questions (id) on delete set null,
  part                        smallint not null check (part in (1, 2, 3)),
  question_text               text not null,
  cue_card_points             text[],
  audio_path                  text not null,       -- path inside the `audio-answers` storage bucket
  audio_duration_seconds      numeric(6, 1),
  transcription               text,
  band_fluency_coherence      numeric(2, 1),
  band_lexical_resource       numeric(2, 1),
  band_grammatical_range      numeric(2, 1),
  band_pronunciation          numeric(2, 1),
  band_overall                numeric(2, 1),
  feedback_summary            text,
  corrections                 jsonb not null default '[]'::jsonb, -- [{original, corrected, explanation, type}]
  model_answer                text,
  status                      text not null default 'completed'
                                 check (status in ('completed', 'failed')),
  error_message                text,
  created_at                  timestamptz not null default now()
);

comment on table public.attempts is 'One row per scored speaking submission, including the AI feedback payload.';

create index if not exists idx_attempts_user_created on public.attempts (user_id, created_at desc);

-- -----------------------------------------------------------------------------
-- payment_requests: manual bKash / Nagad "Send Money" verification queue
-- -----------------------------------------------------------------------------
create table if not exists public.payment_requests (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles (id) on delete cascade,
  method        text not null check (method in ('bkash', 'nagad')),
  sender_name   text not null,
  sender_phone  text not null,
  txn_id        text not null,
  amount_bdt    numeric(10, 2) not null default 200,
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note    text,
  reviewed_at   timestamptz,
  created_at    timestamptz not null default now()
);

comment on table public.payment_requests is 'Manual payment-verification queue reviewed from the /admin dashboard.';

create index if not exists idx_payment_requests_status on public.payment_requests (status, created_at desc);
-- Prevent a user from spamming duplicate pending requests with the same TxnID.
create unique index if not exists uq_payment_requests_txn on public.payment_requests (method, txn_id);

-- -----------------------------------------------------------------------------
-- updated_at trigger for profiles
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- Auto-create a profile row whenever a new Supabase Auth user signs up
-- (fires after Google OAuth completes for a first-time user).
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------------------------
-- Atomic "increment free tries used" RPC.
-- Called from the server after a successful (non-premium) analysis so two
-- concurrent submissions can't both slip through on the same trial count.
-- -----------------------------------------------------------------------------
create or replace function public.increment_free_tries(p_user_id uuid)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_row public.profiles;
begin
  update public.profiles
  set free_tries_used = free_tries_used + 1
  where id = p_user_id
  returning * into updated_row;

  return updated_row;
end;
$$;

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;
alter table public.payment_requests enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "questions_public_read" on public.questions;
create policy "questions_public_read" on public.questions
  for select using (true);

drop policy if exists "attempts_select_own" on public.attempts;
create policy "attempts_select_own" on public.attempts
  for select using (auth.uid() = user_id);

drop policy if exists "attempts_insert_own" on public.attempts;
create policy "attempts_insert_own" on public.attempts
  for insert with check (auth.uid() = user_id);

drop policy if exists "payment_requests_select_own" on public.payment_requests;
create policy "payment_requests_select_own" on public.payment_requests
  for select using (auth.uid() = user_id);

drop policy if exists "payment_requests_insert_own" on public.payment_requests;
create policy "payment_requests_insert_own" on public.payment_requests
  for insert with check (auth.uid() = user_id);

-- Note: the admin dashboard reads/writes payment_requests and profiles using
-- the SUPABASE_SERVICE_ROLE_KEY on the server (lib/supabase/admin.ts), which
-- bypasses RLS entirely. That is intentional: the admin gate in this project
-- is a single shared password (see the "4. Manual Payment Verification"
-- section of the brief), not a Supabase-authenticated role, so there is no
-- auth.uid() to write a matching RLS policy against. If you'd rather tie admin
-- rights to a specific Supabase-authenticated user, use the `is_admin` column
-- above and add "using (is_admin = true)" policies instead.

-- -----------------------------------------------------------------------------
-- Storage bucket for recorded answers (private; access via signed paths only)
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('audio-answers', 'audio-answers', false)
on conflict (id) do nothing;

drop policy if exists "audio_insert_own_folder" on storage.objects;
create policy "audio_insert_own_folder" on storage.objects
  for insert with check (
    bucket_id = 'audio-answers'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "audio_select_own_folder" on storage.objects;
create policy "audio_select_own_folder" on storage.objects
  for select using (
    bucket_id = 'audio-answers'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- -----------------------------------------------------------------------------
-- Starter question bank (feel free to add more from the Supabase Table Editor)
-- -----------------------------------------------------------------------------
insert into public.questions (part, topic, question_text, cue_card_points, prep_seconds, min_speak_seconds, max_speak_seconds)
values
  (1, 'Hometown', 'Where is your hometown?', null, 0, 15, 45),
  (1, 'Hometown', 'What do you like most about your hometown?', null, 0, 15, 45),
  (1, 'Work / Study', 'Do you work or are you a student?', null, 0, 15, 45),
  (1, 'Hobbies', 'What do you usually do in your free time?', null, 0, 15, 45),
  (1, 'Technology', 'How often do you use your phone?', null, 0, 15, 45),
  (2, 'Books', 'Describe a book you recently read.',
    array['what the book was', 'why you decided to read it', 'what it was about', 'and explain whether you would recommend it to others'],
    60, 60, 120),
  (2, 'People', 'Describe a person who has influenced you.',
    array['who this person is', 'how you know them', 'what they are like', 'and explain why they have influenced you'],
    60, 60, 120),
  (2, 'Travel', 'Describe a memorable trip you have taken.',
    array['where you went', 'who you went with', 'what you did there', 'and explain why it was memorable'],
    60, 60, 120),
  (3, 'Books', 'Do you think reading habits have changed in the last 10 years?', null, 0, 30, 90),
  (3, 'Books', 'Should schools spend more time encouraging children to read?', null, 0, 30, 90),
  (3, 'Technology', 'What are the advantages and disadvantages of social media?', null, 0, 30, 90),
  (3, 'Travel', 'How does tourism affect local communities?', null, 0, 30, 90)
on conflict do nothing;
