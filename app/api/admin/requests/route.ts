import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabaseAdmin = createAdminClient();
  const { data: requests, error } = await supabaseAdmin
    .from('payment_requests')
    .select('*, profile:profiles(email, full_name)')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    console.error('[api/admin/requests] failed:', error);
    return NextResponse.json({ error: 'fetch_failed' }, { status: 500 });
  }

  return NextResponse.json({ requests });
}
