import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { APP_NAME } from '@/lib/constants';
import { Badge } from '@/components/ui/primitives';

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let triesLeft: number | null = null;
  let isPremium = false;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium, free_tries_used, free_tries_limit')
      .eq('id', user.id)
      .single();

    if (profile) {
      isPremium = profile.is_premium;
      triesLeft = Math.max(0, profile.free_tries_limit - profile.free_tries_used);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-ink">
          <Image
            src="/speakband-logo.png"
            alt="SpeakBand logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="hidden sm:inline">{APP_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center gap-3 sm:gap-5">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-ink-soft transition-colors hover:text-brand">
                Dashboard
              </Link>
              {isPremium ? (
                <Badge variant="gold">Premium</Badge>
              ) : (
                <Badge variant="brand">
                  {triesLeft ?? '—'} free {triesLeft === 1 ? 'try' : 'tries'} left
                </Badge>
              )}
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-flag"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>

      {/* Trust bar — subtle British Council alignment */}
      <div className="border-t border-border/40 bg-brand-soft/30">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-4 px-4 py-1.5 sm:gap-6 sm:px-6">
          <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wide text-brand-dark sm:text-xs">
            <TrustShield />
            Aligned with British Council IELTS criteria
          </span>
          <span className="hidden text-border sm:inline">·</span>
          <span className="hidden text-[10px] font-medium tracking-wide text-brand-dark sm:inline sm:text-xs">
            Real IELTS Scoring Rubrics
          </span>
          <span className="hidden text-border md:inline">·</span>
          <span className="hidden text-[10px] font-medium tracking-wide text-brand-dark md:inline md:text-xs">
            AI-Powered IELTS Evaluation
          </span>
        </div>
      </div>
    </header>
  );
}

function TrustShield() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path
        d="M8 1L2.5 3.5v4c0 3.5 2.3 6.2 5.5 7 3.2-.8 5.5-3.5 5.5-7v-4L8 1z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M8 1L2.5 3.5v4c0 3.5 2.3 6.2 5.5 7 3.2-.8 5.5-3.5 5.5-7v-4L8 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M5.5 8l1.5 1.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
