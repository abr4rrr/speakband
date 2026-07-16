import Link from 'next/link';
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
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold text-ink">
          <BandMark />
          {APP_NAME}
        </Link>

        <nav className="flex items-center gap-5">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-ink-soft hover:text-brand">
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
                  className="text-sm font-medium text-ink-soft hover:text-flag"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

/** Small tick-mark glyph echoing the 0-9 band ruler used throughout the app. */
function BandMark() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden className="shrink-0">
      <line x1="1" y1="16" x2="25" y2="16" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line
          key={i}
          x1={1 + i * 4.8}
          y1="12.5"
          x2={1 + i * 4.8}
          y2="16"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
      ))}
      <rect x="14" y="2" width="5" height="14" rx="1.5" fill="var(--color-gold)" />
    </svg>
  );
}
