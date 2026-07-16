import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client for use in Server Components, Route Handlers, and Server
 * Actions. Reads the user's session from cookies, so every query it runs is
 * subject to that user's Row Level Security policies (never elevated).
 *
 * NOTE: `cookies()` is async in the Next.js App Router - always `await`
 * this factory function before using the client it returns.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component (not a Route Handler / Server
            // Action) - cookies are read-only there. Safe to ignore because
            // middleware.ts refreshes the session on every navigation anyway.
          }
        },
      },
    }
  );
}
