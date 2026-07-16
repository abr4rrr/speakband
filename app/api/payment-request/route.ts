import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { PREMIUM_PRICE_BDT } from '@/lib/constants';

export const runtime = 'nodejs';

const paymentRequestSchema = z.object({
  method: z.enum(['bkash', 'nagad']),
  senderName: z.string().trim().min(2).max(100),
  senderPhone: z.string().trim().min(6).max(20),
  txnId: z.string().trim().min(4).max(50),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = paymentRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_request', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { method, senderName, senderPhone, txnId } = parsed.data;

  const { error: insertError } = await supabase.from('payment_requests').insert({
    user_id: user.id,
    method,
    sender_name: senderName,
    sender_phone: senderPhone,
    txn_id: txnId,
    amount_bdt: PREMIUM_PRICE_BDT,
    status: 'pending',
  });

  if (insertError) {
    // Postgres unique_violation - hits the uq_payment_requests_txn index,
    // meaning this exact (method, txnId) pair was already submitted.
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'duplicate_txn_id' }, { status: 409 });
    }
    console.error('[api/payment-request] insert failed:', insertError);
    return NextResponse.json({ error: 'save_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
