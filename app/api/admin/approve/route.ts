import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin-guard';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

const approveSchema = z.object({ requestId: z.string().uuid() });

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = approveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const supabaseAdmin = createAdminClient();

  const { data: paymentRequest, error: fetchError } = await supabaseAdmin
    .from('payment_requests')
    .select('*')
    .eq('id', parsed.data.requestId)
    .single();

  if (fetchError || !paymentRequest) {
    return NextResponse.json({ error: 'request_not_found' }, { status: 404 });
  }
  if (paymentRequest.status !== 'pending') {
    return NextResponse.json({ error: 'already_reviewed' }, { status: 409 });
  }

  const { error: updateRequestError } = await supabaseAdmin
    .from('payment_requests')
    .update({ status: 'approved', reviewed_at: new Date().toISOString() })
    .eq('id', paymentRequest.id);

  if (updateRequestError) {
    console.error('[api/admin/approve] failed to update request:', updateRequestError);
    return NextResponse.json({ error: 'update_failed' }, { status: 500 });
  }

  // Grants unlimited tries: with is_premium = true, /api/analyze's
  // `!profile.is_premium && free_tries_used >= free_tries_limit` check can
  // never block this user again.
  const { error: updateProfileError } = await supabaseAdmin
    .from('profiles')
    .update({ is_premium: true })
    .eq('id', paymentRequest.user_id);

  if (updateProfileError) {
    console.error('[api/admin/approve] failed to grant premium:', updateProfileError);
    return NextResponse.json({ error: 'grant_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
