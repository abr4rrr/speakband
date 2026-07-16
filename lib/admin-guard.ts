import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, verifyAdminCookie } from '@/lib/admin-auth';

/**
 * Use only inside Route Handlers / Server Components (Node runtime) - never
 * import this from middleware.ts. `next/headers` is not available on the
 * Edge Runtime that middleware runs on; middleware reads the admin cookie
 * directly off the NextRequest instead and calls verifyAdminCookie() itself.
 */
export async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}
