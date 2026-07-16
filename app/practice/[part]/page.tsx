import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getRandomQuestion } from '@/lib/questions';
import { PracticeSession } from '@/components/practice/PracticeSession';
import { PageHeading } from '@/components/ui/primitives';
import { IELTS_PART_LABELS } from '@/lib/constants';
import type { IeltsPart } from '@/types/database';

export default async function PracticePage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part: partParam } = await params;
  const partNumber = Number(partParam);

  if (![1, 2, 3].includes(partNumber)) notFound();
  const part = partNumber as IeltsPart;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Defense in depth: also enforced server-side in /api/analyze. A direct
  // page visit shouldn't let someone start recording once they're blocked.
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_premium, free_tries_used, free_tries_limit')
    .eq('id', user.id)
    .single();

  if (profile && !profile.is_premium && profile.free_tries_used >= profile.free_tries_limit) {
    redirect('/premium');
  }

  const question = await getRandomQuestion(supabase, part);

  return (
    <div className="space-y-6">
      <PageHeading eyebrow="Practice" title={IELTS_PART_LABELS[part]} />
      {question ? (
        <PracticeSession part={part} question={question} userId={user.id} />
      ) : (
        <p className="text-ink-soft">
          No questions are seeded for this part yet. Add rows to the <code>questions</code>{' '}
          table in Supabase — see <code>supabase/migrations/0001_init.sql</code> for examples.
        </p>
      )}
    </div>
  );
}
