'use client';

import { Sparkles } from 'lucide-react';
import { ExpandableCard, CopyButton } from '@/components/ui/primitives';

export function ModelAnswerCard({ modelAnswer }: { modelAnswer: string | null }) {
  if (!modelAnswer) return null;

  return (
    <ExpandableCard
      title="Band 8–9 Model Answer"
      icon={<Sparkles className="h-4 w-4 text-gold" aria-hidden />}
      defaultExpanded={false}
      className="border-gold/30 bg-gold-soft/20"
    >
      <div className="flex justify-end mb-2">
        <CopyButton text={modelAnswer} />
      </div>
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{modelAnswer}</p>
    </ExpandableCard>
  );
}
