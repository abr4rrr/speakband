'use client';

import { ExpandableCard, CopyButton } from '@/components/ui/primitives';
import type { Correction } from '@/types/database';

interface Segment {
  text: string;
  correction: Correction | null;
}

/**
 * Splits the transcript around each correction's `original` phrase (first,
 * non-overlapping, case-insensitive match) so we can render the mistake and
 * its fix inline without disturbing the rest of the text.
 */
function buildSegments(transcript: string, corrections: Correction[]): Segment[] {
  type Match = { start: number; end: number; correction: Correction };
  const lowerTranscript = transcript.toLowerCase();
  const matches: Match[] = [];

  for (const correction of corrections) {
    if (!correction.original) continue;
    const idx = lowerTranscript.indexOf(correction.original.toLowerCase());
    if (idx === -1) continue;

    const start = idx;
    const end = idx + correction.original.length;
    const overlaps = matches.some((m) => start < m.end && end > m.start);
    if (!overlaps) matches.push({ start, end, correction });
  }

  matches.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of matches) {
    if (match.start > cursor) {
      segments.push({ text: transcript.slice(cursor, match.start), correction: null });
    }
    segments.push({ text: transcript.slice(match.start, match.end), correction: match.correction });
    cursor = match.end;
  }
  if (cursor < transcript.length) {
    segments.push({ text: transcript.slice(cursor), correction: null });
  }

  return segments;
}

export function TranscriptWithFixes({
  transcription,
  corrections,
}: {
  transcription: string | null;
  corrections: Correction[];
}) {
  if (!transcription) {
    return (
      <ExpandableCard title="Transcription" defaultExpanded>
        <p className="text-sm text-ink-soft">No transcription is available for this attempt.</p>
      </ExpandableCard>
    );
  }

  const segments = buildSegments(transcription, corrections);

  return (
    <ExpandableCard
      title="Transcription"
      badge={
        corrections.length > 0 ? (
          <span className="shrink-0 rounded-full bg-flag-soft px-2.5 py-0.5 text-[10px] font-semibold text-flag">
            {corrections.length} fix{corrections.length === 1 ? '' : 'es'}
          </span>
        ) : undefined
      }
      defaultExpanded
    >
      <div className="flex justify-end mb-2">
        <CopyButton text={transcription} />
      </div>
      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
        {segments.map((segment, i) =>
          segment.correction ? (
            <span key={i} className="group relative">
              <span className="rounded bg-flag-soft px-0.5 text-flag line-through decoration-flag/50 decoration-1">
                {segment.text}
              </span>
              <span className="mx-1 rounded bg-good-soft px-1 font-medium text-good">
                {segment.correction.corrected}
              </span>
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-60 -translate-x-1/2 rounded-xl bg-ink px-3.5 py-2.5 text-xs leading-snug text-white opacity-0 shadow-elevated transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-ink" />
                {segment.correction.explanation}
              </span>
            </span>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </p>
    </ExpandableCard>
  );
}
