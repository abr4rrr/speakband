'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, Button } from '@/components/ui/primitives';
import { APP_NAME, FREE_TRIES_LIMIT } from '@/lib/constants';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginCard />
    </Suspense>
  );
}

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  async function handleGoogleSignIn() {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
    // On success the browser navigates to Google immediately - nothing else to do here.
  }

  return (
    <div className="mx-auto max-w-sm py-12">
      <Card className="text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Sign in to {APP_NAME}</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Your first {FREE_TRIES_LIMIT} answer checks are free — no card required.
        </p>

        <Button
          onClick={handleGoogleSignIn}
          loading={loading}
          variant="secondary"
          className="mt-6 w-full justify-center py-3"
        >
          <GoogleMark />
          Continue with Google
        </Button>

        {error && <p className="mt-4 text-sm text-flag">{error}</p>}

        <p className="mt-6 text-xs text-ink-soft">
          By continuing, you agree to receive a transcription and AI-generated feedback on the
          audio you submit.
        </p>
      </Card>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.44c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.58-5.17 3.58-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.12 0-5.76-2.1-6.7-4.93H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.59H1.29A11.94 11.94 0 000 12c0 1.93.46 3.76 1.29 5.41l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l4.01 3.09c.94-2.83 3.58-4.93 6.7-4.93z"
      />
    </svg>
  );
}
