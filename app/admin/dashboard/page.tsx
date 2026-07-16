import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-guard';
import { createAdminClient } from '@/lib/supabase/admin';
import { AdminRequestsTable } from '@/components/AdminRequestsTable';
import { PageHeading } from '@/components/ui/primitives';
import type { PaymentRequest } from '@/types/database';

export default async function AdminDashboardPage() {
  // middleware.ts already redirects unauthenticated requests before this
  // page ever renders; this check is a deliberate second layer so the page
  // is still safe if it's ever reached a different way.
  if (!(await requireAdmin())) redirect('/admin');

  const supabaseAdmin = createAdminClient();
  const { data: requests } = await supabaseAdmin
    .from('payment_requests')
    .select('*, profile:profiles(email, full_name)')
    .order('created_at', { ascending: false })
    .limit(200);

  return (
    <div className="space-y-6">
      <PageHeading
        eyebrow="Admin"
        title="Payment requests"
        description="Review manual bKash/Nagad transfers and approve to grant unlimited access."
      />
      <AdminRequestsTable initialRequests={(requests ?? []) as PaymentRequest[]} />
    </div>
  );
}
