import { Card } from '@/components/ui/primitives';
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
      <Card>
        <h3 className="font-display text-lg font-semibold text-ink">Transcription</h3>
        <p className="mt-2 text-sm text-ink-soft">No transcription is available for this attempt.</p>
      </Card>
    );
  }

  const segments = buildSegments(transcription, corrections);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-ink">Transcription</h3>
        {corrections.length > 0 && (
          <span className="shrink-0 text-xs font-medium text-ink-soft">
            {corrections.length} fix{corrections.length === 1 ? '' : 'es'} highlighted
          </span>
        )}
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
        {segments.map((segment, i) =>
          segment.correction ? (
            <span key={i} className="group relative">
              <span className="rounded bg-flag-soft px-0.5 text-flag line-through decoration-flag/60">
                {segment.text}
              </span>
              <span className="mx-1 rounded bg-good-soft px-1 font-medium text-good">
                {segment.correction.corrected}
              </span>
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-56 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {segment.correction.explanation}
              </span>
            </span>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        )}
      </p>
    </Card>
  );
}
