'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Square, RotateCcw, Send, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAudioRecorder } from './useAudioRecorder';
import { Button, Card } from '@/components/ui/primitives';
import type { Question, IeltsPart } from '@/types/database';

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'uploading' | 'analyzing';

export function PracticeSession({
  part,
  question,
  userId,
}: {
  part: IeltsPart;
  question: Question;
  userId: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const [prepRemaining, setPrepRemaining] = useState(question.prep_seconds);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const recorder = useAudioRecorder(question.max_speak_seconds);

  const audioUrl = useMemo(
    () => (recorder.audioBlob ? URL.createObjectURL(recorder.audioBlob) : null),
    [recorder.audioBlob]
  );
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  // Part 2 preparation countdown.
  useEffect(() => {
    if (phase !== 'preparing') return;
    if (prepRemaining <= 0) {
      setPhase('recording');
      recorder.start();
      return;
    }
    const timer = setTimeout(() => setPrepRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, prepRemaining]);

  // Once the recorder produces a blob, move on to review.
  useEffect(() => {
    if (phase === 'recording' && !recorder.isRecording && recorder.audioBlob) {
      setPhase('review');
    }
  }, [phase, recorder.isRecording, recorder.audioBlob]);

  function handleStart() {
    setSubmitError(null);
    if (part === 2) {
      setPrepRemaining(question.prep_seconds);
      setPhase('preparing');
    } else {
      setPhase('recording');
      recorder.start();
    }
  }

  function handleSkipPrep() {
    setPhase('recording');
    recorder.start();
  }

  function handleRerecord() {
    recorder.reset();
    setSubmitError(null);
    setPhase('idle');
  }

  async function handleSubmit() {
    if (!recorder.audioBlob) return;
    setSubmitError(null);
    setPhase('uploading');

    try {
      const supabase = createClient();
      const path = `${userId}/${crypto.randomUUID()}.wav`;

      const { error: uploadError } = await supabase.storage
        .from('audio-answers')
        .upload(path, recorder.audioBlob, { contentType: 'audio/wav', upsert: false });
      if (uploadError) throw new Error(uploadError.message);

      setPhase('analyzing');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storagePath: path,
          part,
          questionId: question.id,
          questionText: question.question_text,
          cueCardPoints: question.cue_card_points,
          audioDurationSeconds: recorder.elapsedSeconds,
        }),
      });
      const result = await response.json();

      if (response.status === 403 && result.error === 'limit_reached') {
        router.push('/premium');
        return;
      }
      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong while scoring your answer.');
      }

      router.push(`/results/${result.attemptId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setPhase('review');
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          {question.topic}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          {question.question_text}
        </h2>
        {part === 2 && question.cue_card_points && (
          <div className="mt-4 rounded-lg bg-brand-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
              You should say:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink">
              {question.cue_card_points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Card className="flex flex-col items-center gap-5 text-center">
        <div className="flex w-full flex-col items-center gap-5 py-6">
          {phase === 'idle' && (
            <>
              <button
                onClick={handleStart}
                aria-label={part === 2 ? 'Start preparation time' : 'Start recording'}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white transition-transform hover:scale-105"
              >
                <Mic className="h-8 w-8" aria-hidden />
              </button>
              <p className="text-sm text-ink-soft">
                {part === 2
                  ? `Tap to start your ${question.prep_seconds}-second preparation time.`
                  : 'Tap to start recording your answer.'}
              </p>
            </>
          )}

          {phase === 'preparing' && (
            <>
              <div className="font-mono text-5xl font-semibold text-brand">{prepRemaining}s</div>
              <p className="text-sm text-ink-soft">Preparation time — jot down a few notes.</p>
              <Button variant="secondary" onClick={handleSkipPrep}>
                Start speaking now
              </Button>
            </>
          )}

          {phase === 'recording' && (
            <>
              <div className="relative flex h-20 w-20 items-center justify-center">
                <span className="record-pulse-ring absolute inset-0 rounded-full bg-flag/40" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-flag text-white">
                  <Mic className="h-7 w-7" aria-hidden />
                </span>
              </div>
              <div className="font-mono text-3xl font-semibold text-ink">
                {formatTimer(recorder.elapsedSeconds)}
                <span className="text-lg text-ink-soft">
                  {' '}
                  / {formatTimer(question.max_speak_seconds)}
                </span>
              </div>
              <Button variant="danger" onClick={recorder.stop}>
                <Square className="h-4 w-4" aria-hidden /> Stop recording
              </Button>
            </>
          )}

          {phase === 'review' && audioUrl && (
            <div className="w-full max-w-sm space-y-4">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio controls src={audioUrl} className="w-full" />
              <div className="flex justify-center gap-3">
                <Button variant="secondary" onClick={handleRerecord}>
                  <RotateCcw className="h-4 w-4" aria-hidden /> Re-record
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="h-4 w-4" aria-hidden /> Submit for scoring
                </Button>
              </div>
            </div>
          )}

          {(phase === 'uploading' || phase === 'analyzing') && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-soft border-t-brand" />
              <p className="text-sm font-medium text-ink-soft">
                {phase === 'uploading'
                  ? 'Uploading your answer…'
                  : 'Scoring your answer — this can take up to 20 seconds…'}
              </p>
            </div>
          )}

          {recorder.error && (
            <p className="flex items-center gap-1.5 text-sm text-flag">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {recorder.error}
            </p>
          )}
          {submitError && (
            <p className="flex items-center gap-1.5 text-sm text-flag">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {submitError}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

function formatTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
