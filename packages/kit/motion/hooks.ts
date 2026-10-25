'use client';

import { type RefObject, useEffect, useSyncExternalStore } from 'react';

import { ensureGsap, gsap } from './engine';
import { isReduced, subscribeMotion } from './preference';

/** True when motion should be reduced (OS setting or session override). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeMotion, isReduced, () => false);
}

interface MotionEffectOptions {
  /** Media query the effect needs, such as DESKTOP_QUERY or PIN_QUERY. */
  media?: string;
}

/**
 * Runs a GSAP setup for `ref` when full motion is on. Everything GSAP creates
 * inside `setup` (tweens, ScrollTriggers) is reverted automatically when motion
 * is reduced, the breakpoint no longer matches, or the component unmounts, so
 * elements return to their static styles.
 */
export function useMotionEffect<T extends Element>(
  ref: RefObject<T | null>,
  // Same shape as React's EffectCallback: return nothing or a cleanup.
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  setup: (el: T) => void | (() => void),
  deps: readonly unknown[] = [],
  { media = 'all' }: MotionEffectOptions = {},
): void {
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    // Give each motion setup its own task. Initialising every section inside
    // React's hydration effect otherwise blocks input on slower devices.
    let revert: (() => void) | undefined;
    const task = window.setTimeout(() => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(media, () => setup(el));
      revert = () => mm.revert();
    }, 0);
    return () => {
      window.clearTimeout(task);
      revert?.();
    };
    // `setup` is intentionally read fresh on each run; callers list their own deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, reduced, media, ...deps]);
}
