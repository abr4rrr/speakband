import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PaymentForm } from '@/components/PaymentForm';
import { Card, PageHeading, Badge } from '@/components/ui/primitives';
import { Check, ShieldCheck } from 'lucide-react';
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
      <div className="animate-fade-in-up mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-soft">
          <Check className="h-8 w-8 text-gold" aria-hidden />
        </div>
        <Badge variant="gold" className="mt-4">Premium active</Badge>
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

      {/* Feature highlights */}
      <div className="animate-fade-in-up grid gap-3 sm:grid-cols-2">
        {[
          'Unlimited practice sessions',
          'All IELTS parts (1, 2, 3)',
          'Detailed corrections & model answers',
          'One-time payment — no subscription',
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-2.5 rounded-xl bg-good-soft/50 px-4 py-3">
            <Check className="h-4 w-4 shrink-0 text-good" aria-hidden />
            <span className="text-sm font-medium text-ink">{feature}</span>
          </div>
        ))}
      </div>

      <Card className="animate-fade-in-up animate-delay-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand font-display font-bold text-sm">1</div>
          <h2 className="font-display text-lg font-semibold text-ink">Send money</h2>
        </div>
        <div className="space-y-3">
          <PaymentMethodRow name="bKash" number={BKASH_NUMBER} type={BKASH_TYPE} color="good" />
          <PaymentMethodRow name="Nagad" number={NAGAD_NUMBER} type={NAGAD_TYPE} color="brand" />
        </div>
        <ol className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
          <li>Open your bKash or Nagad app and choose &quot;Send Money&quot;.</li>
          <li>
            Enter the number above and an amount of <strong className="text-ink">{PREMIUM_PRICE_BDT} Taka</strong>.
          </li>
          <li>Complete the transfer with your PIN.</li>
          <li>Copy the Transaction ID (TxnID) from the confirmation SMS.</li>
        </ol>
      </Card>

      <Card className="animate-fade-in-up animate-delay-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand font-display font-bold text-sm">2</div>
          <h2 className="font-display text-lg font-semibold text-ink">Tell us about it</h2>
        </div>
        <p className="text-sm text-ink-soft">
          We manually verify every payment, usually within a few hours.
        </p>
        <div className="mt-4">
          <PaymentForm />
        </div>
      </Card>

      <div className="animate-fade-in-up animate-delay-3 flex items-center justify-center gap-2 text-xs text-ink-muted">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        <span>Secure payment verification · Your data is protected</span>
      </div>
    </div>
  );
}

function PaymentMethodRow({ name, number, type, color }: { name: string; number: string; type: string; color: string }) {
  const bgMap: Record<string, string> = {
    good: 'bg-good-soft/50 border-good/20',
    brand: 'bg-brand-soft/50 border-brand/20',
  };

  return (
    <div className={`flex items-center justify-between rounded-xl border p-4 ${bgMap[color] ?? 'border-border'}`}>
      <div>
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="text-xs text-ink-soft">{type}</p>
      </div>
      <p className="font-mono text-lg font-bold text-brand">{number}</p>
    </div>
  );
}
