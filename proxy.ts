// Next.js 16 renamed the middleware.ts file convention to proxy.ts (same
// behavior, same config.matcher - only the file name and the exported
// function name changed). If you're on an older Next.js version, rename
// this file back to middleware.ts and this function back to `middleware`.
//
// Note this only handles UX-level redirects for logged-out/non-admin users.
// It is not the security boundary: every protected Server Component and API
// route in this app re-checks auth/admin status itself (see app/dashboard,
// app/practice/[part], app/admin/dashboard, and lib/admin-guard.ts), and Row
// Level Security locks down the database underneath all of it. Don't remove
// those checks on the assumption this file already covers it.
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminCookie } from '@/lib/admin-auth';

const USER_PROTECTED_PREFIXES = ['/dashboard', '/practice', '/results'];
const ADMIN_PROTECTED_PREFIXES = ['/admin/dashboard'];

export async function proxy(request: NextRequest) {
  // `supabaseResponse` is the response object @supabase/ssr writes refreshed
  // auth cookies onto. It must be the response we ultimately return (or a
  // redirect built from it), or the refreshed session gets silently dropped.
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;

  const needsUser = USER_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (needsUser) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  const needsAdmin = ADMIN_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (needsAdmin) {
    const cookie = request.cookies.get('admin_session')?.value;
    if (!(await verifyAdminCookie(cookie))) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Run on every route except static assets, so the session cookie stays
     * fresh everywhere, but skip the noisy stuff that never needs auth.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
