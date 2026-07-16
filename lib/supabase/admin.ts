import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';

/**
 * Privileged Supabase client using the service_role key.
 *
 * This BYPASSES Row Level Security completely. It must only be imported from
 * server-only code (Route Handlers) and must NEVER be sent to the browser:
 *   - the admin login/approve/reject/requests routes use it, because the
 *     admin panel is gated by a shared password rather than a Supabase-
 *     authenticated user, so there is no auth.uid() for RLS to check.
 *   - nowhere else in this codebase should import this file.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createSupabaseJsClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
