'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Square, RotateCcw, Send, CheckCircle2, Lightbulb } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useAudioRecorder } from './useAudioRecorder';
import { Button, Card, AlertBanner } from '@/components/ui/primitives';
import type { Question, IeltsPart } from '@/types/database';

type Phase = 'idle' | 'preparing' | 'recording' | 'review' | 'uploading' | 'analyzing';

const SPEAKING_TIPS = [
  'Speak naturally — don\'t memorize scripts.',
  'Use a range of vocabulary and expressions.',
  'Extend your answers with reasons and examples.',
  'Vary your intonation to sound natural.',
  'Connect your ideas with linking words.',
  'Don\'t worry about small mistakes — keep going.',
  'Use specific examples from personal experience.',
  'Paraphrase the question in your answer.',
];

const PIPELINE_STEPS = [
  'Uploading audio…',
  'Transcribing speech…',
  'Analyzing pronunciation & fluency…',
  'Evaluating vocabulary & grammar…',
  'Scoring IELTS bands…',
];

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
  const [pipelineStep, setPipelineStep] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

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

  // Cycle speaking tips while recording.
  useEffect(() => {
    if (phase !== 'recording') return;
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % SPEAKING_TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [phase]);

  // Simulated multi-step pipeline progress.
  useEffect(() => {
    if (phase !== 'uploading' && phase !== 'analyzing') {
      setPipelineStep(0);
      return;
    }
    if (phase === 'uploading') {
      setPipelineStep(0);
      return;
    }
    // Analyzing: progress through steps 1-4 on timed intervals
    const timings = [0, 3000, 6000, 10000]; // delays for steps 1-4
    const timers = timings.map((delay, i) =>
      setTimeout(() => setPipelineStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleStart = useCallback(() => {
    setSubmitError(null);
    if (part === 2) {
      setPrepRemaining(question.prep_seconds);
      setPhase('preparing');
    } else {
      setPhase('recording');
      recorder.start();
    }
  }, [part, question.prep_seconds, recorder]);

  const handleSkipPrep = useCallback(() => {
    setPhase('recording');
    recorder.start();
  }, [recorder]);

  const handleRerecord = useCallback(() => {
    recorder.reset();
    setSubmitError(null);
    setPhase('idle');
  }, [recorder]);

  const handleSubmit = useCallback(async () => {
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
  }, [recorder.audioBlob, recorder.elapsedSeconds, userId, part, question, router]);

  const prepProgress = question.prep_seconds > 0
    ? ((question.prep_seconds - prepRemaining) / question.prep_seconds) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Question card */}
      <Card className="animate-fade-in-up">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          {question.topic}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">
          {question.question_text}
        </h2>
        {part === 2 && question.cue_card_points && (
          <div className="mt-4 rounded-xl bg-brand-soft/60 p-4 border border-brand/10">
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

      {/* Recording interface */}
      <Card className="animate-fade-in-up animate-delay-1 flex flex-col items-center gap-5 text-center">
        <div className="flex w-full flex-col items-center gap-5 py-6">
          {/* ── IDLE ───────────────────────────────────────── */}
          {phase === 'idle' && (
            <div className="animate-scale-in flex flex-col items-center gap-4">
              <button
                onClick={handleStart}
                aria-label={part === 2 ? 'Start preparation time' : 'Start recording'}
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-brand/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                <Mic className="relative h-9 w-9" aria-hidden />
              </button>
              <p className="max-w-xs text-sm text-ink-soft">
                {part === 2
                  ? `Tap to start your ${question.prep_seconds}-second preparation time.`
                  : 'Tap to start recording your answer.'}
              </p>
            </div>
          )}

          {/* ── PREPARING (Part 2 countdown) ───────────────── */}
          {phase === 'preparing' && (
            <div className="animate-scale-in flex flex-col items-center gap-5">
              {/* Circular countdown */}
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 112 112">
                  <circle cx="56" cy="56" r="50" fill="none" stroke="var(--color-border-subtle)" strokeWidth="6" />
                  <circle
                    cx="56" cy="56" r="50" fill="none"
                    stroke="var(--color-brand)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - prepProgress / 100)}
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>
                <span className="font-mono text-4xl font-bold text-brand">{prepRemaining}</span>
              </div>
              <p className="text-sm font-medium text-ink-soft">Preparation time — jot down a few notes.</p>
              <Button variant="secondary" onClick={handleSkipPrep}>
                Start speaking now
              </Button>
            </div>
          )}

          {/* ── RECORDING ──────────────────────────────────── */}
          {phase === 'recording' && (
            <div className="animate-scale-in flex w-full flex-col items-center gap-5">
              {/* Recording indicator + waveform */}
              <div className="relative flex h-24 w-24 items-center justify-center">
                <span className="record-pulse-ring absolute inset-0 rounded-full bg-flag/30" />
                <span className="record-pulse-ring absolute inset-0 rounded-full bg-flag/20" style={{ animationDelay: '0.4s' }} />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-flag text-white shadow-lg">
                  <Mic className="h-8 w-8" aria-hidden />
                </span>
              </div>

              {/* Live waveform visualization */}
              <div className="flex h-12 items-end justify-center gap-[3px]" aria-hidden>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="waveform-bar w-[3px] bg-flag/70"
                    style={{ height: '20%' }}
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="font-mono text-3xl font-bold text-ink">
                {formatTimer(recorder.elapsedSeconds)}
                <span className="text-lg font-medium text-ink-muted">
                  {' '}/ {formatTimer(question.max_speak_seconds)}
                </span>
              </div>

              <Button variant="danger" onClick={recorder.stop} className="px-8">
                <Square className="h-4 w-4" aria-hidden /> Stop recording
              </Button>

              {/* Speaking tip */}
              <div className="flex items-center gap-2 rounded-xl bg-gold-soft/60 px-4 py-2.5 text-xs text-gold-dark transition-all">
                <Lightbulb className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="font-medium">{SPEAKING_TIPS[currentTip]}</span>
              </div>
            </div>
          )}

          {/* ── REVIEW ─────────────────────────────────────── */}
          {phase === 'review' && audioUrl && (
            <div className="animate-scale-in w-full max-w-sm space-y-5">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio
                controls
                src={audioUrl}
                className="w-full rounded-xl"
              />
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button variant="secondary" onClick={handleRerecord} className="flex-1 justify-center">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Re-record
                </Button>
                <Button onClick={handleSubmit} className="flex-1 justify-center">
                  <Send className="h-4 w-4" aria-hidden /> Submit for scoring
                </Button>
              </div>
            </div>
          )}

          {/* ── MULTI-STEP PIPELINE ────────────────────────── */}
          {(phase === 'uploading' || phase === 'analyzing') && (
            <div className="animate-fade-in-up w-full max-w-sm space-y-1 py-4">
              {PIPELINE_STEPS.map((stepText, i) => {
                const isActive = i === (phase === 'uploading' ? 0 : pipelineStep + 1);
                const isCompleted = phase === 'uploading'
                  ? false
                  : (i === 0 || i <= pipelineStep);

                return (
                  <div
                    key={i}
                    className="step-connector"
                    data-completed={isCompleted ? 'true' : 'false'}
                  >
                    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive ? 'bg-brand-soft/60' : isCompleted ? 'opacity-100' : 'opacity-40'
                    }`}>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-good" />
                        ) : isActive ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-soft border-t-brand" />
                        ) : (
                          <div className="h-3 w-3 rounded-full bg-border" />
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isCompleted ? 'text-good' : isActive ? 'text-brand' : 'text-ink-muted'
                      }`}>
                        {stepText}
                      </span>
                      {isCompleted && (
                        <span className="ml-auto text-sm text-good">✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── ERRORS ─────────────────────────────────────── */}
          {recorder.error && (
            <AlertBanner
              variant="error"
              message={recorder.error}
              onRetry={() => {
                recorder.reset();
                setPhase('idle');
              }}
            />
          )}
          {submitError && (
            <AlertBanner
              variant="error"
              message={submitError}
              onRetry={handleSubmit}
            />
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
