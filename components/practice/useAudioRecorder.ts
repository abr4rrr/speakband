'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { encodeWavFromFloat32, mergeFloat32Chunks } from '@/lib/wav-encoder';

interface UseAudioRecorderResult {
  isRecording: boolean;
  elapsedSeconds: number;
  audioBlob: Blob | null;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
  reset: () => void;
}

/**
 * Records the microphone and encodes the result as a 16-bit mono WAV Blob.
 *
 * Deliberately uses ScriptProcessorNode rather than AudioWorklet: it's a
 * deprecated API, but it keeps mic capture self-contained in one file with no
 * extra worklet script to serve from /public, and every major browser still
 * fully supports it. Swap to AudioWorkletNode if you outgrow that trade-off.
 */
export function useAudioRecorder(maxSeconds: number): UseAudioRecorderResult {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const chunksRef = useRef<Float32Array[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  // Mirrors `isRecording` in a ref so stop() always reads the live value, even
  // if it's invoked from a timer callback created on an earlier render.
  const isRecordingRef = useRef(false);

  const cleanupAudioGraph = useCallback(() => {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close().catch(() => {});
    processorRef.current = null;
    sourceRef.current = null;
    streamRef.current = null;
    audioContextRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    if (!isRecordingRef.current) return;
    isRecordingRef.current = false;
    setIsRecording(false);

    const sampleRate = audioContextRef.current?.sampleRate ?? 44100;
    const merged = mergeFloat32Chunks(chunksRef.current);
    setAudioBlob(encodeWavFromFloat32(merged, sampleRate));

    cleanupAudioGraph();
  }, [cleanupAudioGraph]);

  const start = useCallback(async () => {
    setError(null);
    setAudioBlob(null);
    chunksRef.current = [];
    setElapsedSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      const AudioContextCtor: typeof AudioContext =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const context = new AudioContextCtor();
      audioContextRef.current = context;

      const source = context.createMediaStreamSource(stream);
      sourceRef.current = source;

      // eslint-disable-next-line deprecation/deprecation -- see file header
      const processor = context.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (event) => {
        chunksRef.current.push(new Float32Array(event.inputBuffer.getChannelData(0)));
      };

      source.connect(processor);
      // Required by some browsers to keep onaudioprocess firing. Harmless:
      // we never write to the output buffer, so it stays silent.
      processor.connect(context.destination);

      startTimeRef.current = Date.now();
      isRecordingRef.current = true;
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedSeconds(elapsed);
        if (elapsed >= maxSeconds) stop();
      }, 200);
    } catch (err) {
      setError(
        err instanceof Error && err.name === 'NotAllowedError'
          ? 'Microphone access was denied. Allow microphone access in your browser and try again.'
          : 'Could not access your microphone. Check your device and try again.'
      );
    }
  }, [maxSeconds, stop]);

  const reset = useCallback(() => {
    setAudioBlob(null);
    setElapsedSeconds(0);
    setError(null);
    chunksRef.current = [];
  }, []);

  // Safety net: release the mic if the component unmounts mid-recording.
  useEffect(() => cleanupAudioGraph, [cleanupAudioGraph]);

  return { isRecording, elapsedSeconds, audioBlob, error, start, stop, reset };
}
