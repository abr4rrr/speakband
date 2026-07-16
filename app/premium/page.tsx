import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PaymentForm } from '@/components/PaymentForm';
import { Card, PageHeading, Badge } from '@/components/ui/primitives';
import {
  APP_NAME,
  PREMIUM_PRICE_BDT,
  BKASH_NUMBER,
  BKASH_TYPE,
  NAGAD_NUMBER,
  NAGAD_TYPE,
} from '@/lib/constants';

export default async function PremiumPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', user.id)
    .single();

  if (profile?.is_premium) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <Badge variant="gold">Premium active</Badge>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          You already have unlimited access
        </h1>
        <p className="mt-2 text-ink-soft">Head back to the dashboard to keep practicing.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <PageHeading
        eyebrow="Upgrade"
        title={`Unlock unlimited ${APP_NAME} checks`}
        description={`A one-time payment of ${PREMIUM_PRICE_BDT}৳ removes the free-trial limit for good.`}
      />

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">1. Send money</h2>
        <div className="mt-4 space-y-3">
          <PaymentMethodRow name="bKash" number={BKASH_NUMBER} type={BKASH_TYPE} />
          <PaymentMethodRow name="Nagad" number={NAGAD_NUMBER} type={NAGAD_TYPE} />
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-ink-soft">
          <li>Open your bKash or Nagad app and choose &quot;Send Money&quot;.</li>
          <li>
            Enter the number above and an amount of {PREMIUM_PRICE_BDT} Taka.
          </li>
          <li>Complete the transfer with your PIN.</li>
          <li>Copy the Transaction ID (TxnID) from the confirmation SMS.</li>
        </ol>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">2. Tell us about it</h2>
        <p className="mt-1 text-sm text-ink-soft">
          We manually verify every payment, usually within a few hours.
        </p>
        <div className="mt-4">
          <PaymentForm />
        </div>
      </Card>
    </div>
  );
}

function PaymentMethodRow({ name, number, type }: { name: string; number: string; type: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="text-xs text-ink-soft">{type}</p>
      </div>
      <p className="font-mono text-lg font-semibold text-brand">{number}</p>
    </div>
  );
}
