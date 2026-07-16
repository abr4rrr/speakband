import { Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/primitives';

export function ModelAnswerCard({ modelAnswer }: { modelAnswer: string | null }) {
  if (!modelAnswer) return null;

  return (
    <Card className="border-gold/40 bg-gold-soft/40">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-gold" aria-hidden />
        <h3 className="font-display text-lg font-semibold text-ink">Band 8-9 model answer</h3>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">{modelAnswer}</p>
    </Card>
  );
}
