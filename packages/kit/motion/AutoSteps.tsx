'use client';

import {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cx } from '../lib/cx';
import { useReducedMotion } from './hooks';
import { observeViewport } from './viewport';

/** The first stage that belongs to `step`. */
export function firstStageOf(stepOf: readonly number[], step: number): number {
  const i = stepOf.indexOf(step);
  return i < 0 ? 0 : i;
}

/** Total time each step is on screen: the sum of its stages. */
export function stepDurations(durations: readonly number[], stepOf: readonly number[]): number[] {
  const steps = Math.max(0, ...stepOf) + 1;
  const out = Array.from({ length: steps }, () => 0);
  stepOf.forEach((s, i) => {
    out[s] = (out[s] ?? 0) + (durations[i] ?? 0);
  });
  return out;
}

export type AutoplayState = 'playing' | 'paused' | 'stopped';

interface AutoStepsValue {
  /** Current stage. Visuals that change within a step read this. */
  stage: number;
  /** Current step (the highlighted button). */
  step: number;
  autoplay: AutoplayState;
  /** Duration of the current step in ms, for its progress bar. */
  stepMs: number;
  select: (step: number) => void;
}

const AutoStepsContext = createContext<AutoStepsValue>({
  stage: 0,
  step: 0,
  autoplay: 'stopped',
  stepMs: 0,
  select: () => undefined,
});

/** The current stage and step of the enclosing `AutoSteps`. */
export function useAutoSteps(): AutoStepsValue {
  return useContext(AutoStepsContext);
}

interface AutoStepsProps extends HTMLAttributes<HTMLDivElement> {
  /** How long each stage holds, in ms. */
  durations: readonly number[];
  /** The step each stage belongs to. Several stages can share a step. */
  stepOf: readonly number[];
  children: ReactNode;
}

/**
 * A short demo that plays through its stages on a timer and loops (a phone
 * flow). Step buttons jump to a step. Playback pauses while the
 * pointer or focus is inside, stops for good once a step is picked, waits
 * while off screen, and never starts with reduced motion.
 */
export function AutoSteps({ durations, stepOf, className, children, ...rest }: AutoStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const remaining = useRef(durations[0] ?? 0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') setHover(true);
    };
    const leave = () => setHover(false);
    const focusIn = () => setFocus(true);
    const focusOut = (e: FocusEvent) => {
      if (!(e.relatedTarget instanceof Node) || !el.contains(e.relatedTarget)) setFocus(false);
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('focusin', focusIn);
    el.addEventListener('focusout', focusOut);
    const stop = observeViewport(el, (e) => {
      setVisible(e.isIntersecting);
      if (e.isIntersecting) el.removeAttribute('data-paused');
      else el.setAttribute('data-paused', '');
    });
    return () => {
      stop();
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      el.removeEventListener('focusin', focusIn);
      el.removeEventListener('focusout', focusOut);
    };
  }, []);

  const autoplay: AutoplayState =
    reduced || stopped ? 'stopped' : hover || focus || !visible ? 'paused' : 'playing';

  // Declared before the timer so a new stage starts with its full duration.
  useEffect(() => {
    remaining.current = durations[stage] ?? 0;
  }, [stage, durations]);

  useEffect(() => {
    if (autoplay !== 'playing') return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => setStage((s) => (s + 1) % durations.length),
      remaining.current,
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [stage, autoplay, durations.length]);

  const select = useCallback(
    (step: number) => {
      setStopped(true);
      setStage(firstStageOf(stepOf, step));
    },
    [stepOf],
  );

  const totals = useMemo(() => stepDurations(durations, stepOf), [durations, stepOf]);
  const step = stepOf[stage] ?? 0;
  const value = useMemo(
    () => ({ stage, step, autoplay, stepMs: totals[step] ?? 0, select }),
    [stage, step, autoplay, totals, select],
  );

  return (
    <AutoStepsContext.Provider value={value}>
      <div ref={ref} className={className} data-autoplay={autoplay} {...rest}>
        {children}
      </div>
    </AutoStepsContext.Provider>
  );
}

interface AutoStepButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  index: number;
  children: ReactNode;
}

/**
 * A step button for `AutoSteps`. It gets `aria-pressed` and `data-active`
 * while its step is current, and a `.astep-bar` child whose fill runs for the
 * step's duration while playing.
 */
export function AutoStepButton({
  index,
  className,
  style,
  children,
  ...rest
}: AutoStepButtonProps) {
  const { step, autoplay, stepMs, select } = useAutoSteps();
  const on = index === step;
  return (
    <button
      type="button"
      aria-pressed={on}
      data-active={on ? 'true' : 'false'}
      onClick={() => select(index)}
      className={cx('astep', className)}
      style={{ ...style, '--astep-ms': `${stepMs}ms` } as CSSProperties}
      {...rest}
    >
      {children}
      <span className="astep-bar" aria-hidden="true" data-show={on && autoplay !== 'stopped'}>
        {/* Mounted only while current, so the fill restarts each time the step comes round. */}
        {on ? <i /> : null}
      </span>
    </button>
  );
}
