'use client';

import { type HTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

import { cx } from '../lib/cx';
import { addTick, getScrollVelocity, trackScrollVelocity } from './engine';
import { useReducedMotion } from './hooks';
import { marqueeStep } from './marquee-math';
import { observeViewport } from './viewport';

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** -1 moves left, 1 moves right. */
  direction?: -1 | 1;
  /** Idle speed in px per 60fps frame. Scroll velocity adds to it. */
  speed?: number;
  children: ReactNode;
}

/**
 * An endless row whose speed follows scroll velocity (closing section). The
 * content repeats three times; only the first copy is exposed to assistive
 * tech. Still with reduced motion; paused while off screen.
 */
export function Marquee({
  direction = -1,
  speed = 0.7,
  className,
  children,
  ...rest
}: MarqueeProps) {
  const row = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = row.current;
    if (!el || reduced) return;
    let x = 0;
    let stopTick: (() => void) | null = null;
    const stopVelocity = trackScrollVelocity();
    const run = () => {
      stopTick ??= addTick((dt) => {
        x = marqueeStep(x, el.scrollWidth / 3, direction, speed, getScrollVelocity(), dt);
        el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      });
    };
    const pause = () => {
      stopTick?.();
      stopTick = null;
    };
    const stopObserve = observeViewport(el, (e) => (e.isIntersecting ? run() : pause()));
    return () => {
      pause();
      stopObserve();
      stopVelocity();
      el.style.transform = '';
    };
  }, [direction, speed, reduced]);

  return (
    <div ref={row} className={cx('mq-row', className)} {...rest}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
      <span aria-hidden="true">{children}</span>
    </div>
  );
}
