'use client';

import { observeViewport } from '@studio/kit/motion';
import { type RefObject, useEffect, useState } from 'react';

/**
 * A seconds counter that starts at 0 (so the first client render matches the
 * server) and only runs while the element is on screen.
 */
export function useSecondTicks(ref: RefObject<Element | null>): number {
  const [tk, setTk] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    const stop = observeViewport(el, (e) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setTk((t) => t + 1), 1000);
    });
    return () => {
      stop();
      window.clearInterval(timer);
    };
  }, [ref]);
  return tk;
}
