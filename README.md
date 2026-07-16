# SpeakScore BD

An IELTS Speaking answer checker: record a Part 1, 2, or 3 answer, get an
instant band score (overall + all four criteria), a transcription with
inline corrections, and a Band 8-9 model answer — powered by Google Gemini.
Two free tries per account, then a one-time bKash/Nagad payment unlocked by
manual admin approval.

> **Rename me first.** `NEXT_PUBLIC_APP_NAME` in `.env.local` is the only
> place the brand name lives. Pick something that isn't confusingly similar
> to an existing IELTS-prep brand before you launch.

## Stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-first config — see `app/globals.css`)
- **Auth + DB + Storage:** Supabase (Postgres, Google OAuth, private audio bucket, Row Level Security)
- **AI:** Google Gemini (`gemini-2.5-flash` by default) — a single multimodal call transcribes the audio and scores it
- **Hosting:** Netlify, via the official Next.js Runtime (`@netlify/plugin-nextjs`)

Every Route Handler under `app/api/**/route.ts` becomes a Netlify Function
automatically at deploy time — there's no separate `/netlify/functions`
folder, and that's expected, not missing.

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste the contents of `supabase/migrations/0001_init.sql` → Run.
   This creates every table, the `audio-answers` storage bucket, RLS
   policies, and a small starter question bank.
3. **Authentication → Sign In / Providers → Google**: enable it. You'll need
   a Google Cloud OAuth Client ID/Secret (OAuth consent screen + Web
   application credentials, with `https://<your-project-ref>.supabase.co/auth/v1/callback`
   added as an authorized redirect URI).
4. **Authentication → URL Configuration**: set your Site URL and add your
   Netlify URL (and `http://localhost:3000` for local dev) to the redirect
   allow-list.
5. **Project Settings → API**: copy the Project URL and the anon/publishable
   key for your `.env.local`.
6. **Project Settings → API → service_role key**: copy this too. It's
   secret — it bypasses RLS and is only used server-side by the admin and
   analyze routes.

## 2. Get a Gemini API key

Create a key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

**On the model name:** `gemini-1.5-pro`/`gemini-1.5-flash` have been fully
retired by Google (requests now 404) — this project defaults to
`gemini-2.5-flash` via the `GEMINI_MODEL` env var instead. It's the current
cost-effective choice for this workload. For noticeably higher-quality
scoring at meaningfully higher per-request cost, try `gemini-3.5-flash` or
a `-pro` tier model — just change the env var, no code changes needed.

## 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in every value — each one is
commented with where it comes from. The same variables need to be added
under Netlify's **Site settings → Environment variables** before deploying.

## 4. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## 5. Deploy to Netlify

> **Before you push: check your repo root.** If you unzipped this project,
> make sure `netlify.toml` and `package.json` end up directly at the root of
> your Git repository — not nested one level deeper inside a
> `speakscore-bd/` subfolder. If you drag-and-dropped the whole unzipped
> folder into a new repo (or ran `git add speakscore-bd` from its parent
> directory instead of `cd`-ing into it first), that's exactly what happens.
> Symptom on Netlify: the build log says `No config file was defined: using
> default values` and then fails with *"Your publish directory is pointing
> to the base directory of your site."* Fix: either move everything up one
> level so `netlify.toml` sits at the repo root, or set **Base directory**
> to `speakscore-bd` under Build settings (see below).

1. Push this repo to GitHub.
2. Netlify → **Add new site → Import an existing project**. Netlify
   auto-detects Next.js and installs its Next.js Runtime — `netlify.toml`
   is already set up (`npm run build`, publish `.next`). If it doesn't
   auto-detect correctly, go to **Project configuration → Build & deploy →
   Continuous deployment → Build settings → Configure** and set the Build
   command to `npm run build` and Publish directory to `.next` explicitly.
3. If Netlify's dashboard already has an old `@netlify/plugin-nextjs`
   installed from a previous site setup (check **Project configuration →
   Build & deploy → Build plugins**), remove it first so a current version
   gets installed fresh — an old major version (v4.x) predates a lot of App
   Router route-handler support this project relies on.
4. Add every variable from `.env.example` under **Site configuration →
   Environment variables**, using your real values.
5. Deploy — ideally the first one via **"Clear cache and deploy site"** from
   the Deploys tab if you're retrying after fixing build settings. Update
   the Supabase redirect URL allow-list and your Google OAuth client's
   authorized redirect URIs with the real Netlify URL afterward.

## Using the admin panel

Visit `/admin` and enter the `ADMIN_PASSWORD` you set. You'll land on
`/admin/dashboard`, which lists pending bKash/Nagad payment requests.
**Approve** sets `is_premium = true` on that user's profile (unlocking
unlimited tries) and marks the request `approved`; **Reject** just marks it
`rejected`. Both actions run through `SUPABASE_SERVICE_ROLE_KEY` server-side
— the admin panel is a single shared password, not a Supabase-authenticated
role, so there's no `auth.uid()` for a Row Level Security policy to check.
Rotate `ADMIN_PASSWORD` and don't share the link casually.

If you'd rather tie admin rights to a specific Supabase-authenticated user
instead of a shared password, `profiles.is_admin` already exists in the
schema for that — swap `lib/admin-guard.ts`'s check for a query against it
and add matching RLS policies.

## Design notes

The palette and type system are original (an academic blue + a muted "band
8-9 gold," paired with Space Grotesk for display type, Inter for body copy,
and IBM Plex Mono reserved for anything that's literally a measurement —
band scores, timers, transaction IDs). The recurring visual motif is a
literal 0-9 band ruler, used at hero scale on the homepage and at a
compact scale for each criterion on the results page. None of this copies
Engnovate's or any other specific product's UI — swap colors/fonts in
`app/globals.css`'s `@theme` block to make it your own.

## Known limitations / good next steps

- **Pronunciation scoring** is inherently the hardest of the four criteria
  to judge from audio alone, for a human examiner or an AI. Gemini is
  instructed to note when audio quality limits this judgment, but treat
  pronunciation bands as more approximate than the other three.
- **Function timeouts:** `/api/analyze` calls Gemini with an audio file,
  which can take several seconds. Netlify's synchronous function timeout is
  10s on the free tier and 26s on paid tiers. If you see timeouts under load
  or with long Part 2 answers, upgrade your plan or move this route to a
  Background Function with a polling endpoint.
- **Rate limiting:** there isn't any yet, beyond the 2-free-tries gate. If
  abuse becomes a problem, add IP- or account-based rate limiting in front
  of `/api/analyze` and `/api/payment-request`.
- **Part 3** currently serves one discussion question at a time from the
  question bank, the same as Part 1. Real Part 3 is a multi-question
  discussion following on from the Part 2 topic — grouping questions by
  topic and asking 2-3 in one session would be a natural v2.
- **Duplicate TxnIDs** are rejected at the database level (a unique index
  on `(method, txn_id)`), but a typo'd TxnID that happens to collide with
  someone else's would also be rejected — the admin dashboard is where
  you'd catch and manually resolve that.
