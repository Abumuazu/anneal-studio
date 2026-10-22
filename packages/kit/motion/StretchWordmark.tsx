'use client';

import { type CSSProperties, useEffect, useRef } from 'react';

import { cx } from '../lib/cx';
import { addTick } from './engine';
import { useReducedMotion } from './hooks';
import { observeViewport } from './viewport';

interface StretchWordmarkProps {
  /** The letters to draw, e.g. "STUDIO". */
  text: string;
  /** Accessible name, e.g. "Studio". */
  label: string;
  /**
   * Text width divided by font size, used before JS measures the real font so
   * the wordmark already fills its container on first paint.
   */
  widthRatio?: number;
  className?: string;
}

/**
 * A wordmark that fills its container's width and whose letters stretch
 * upward near the pointer (footer). Still with reduced motion.
 */
export function StretchWordmark({ text, label, widthRatio = 5, className }: StretchWordmarkProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const measure = useRef<HTMLSpanElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();
  const chars = text.split('');

  // Fit: measure the text at 100px once fonts are ready and store the ratio.
  useEffect(() => {
    const w = wrap.current;
    const m = measure.current;
    if (!w || !m) return;
    let alive = true;
    const fit = () => {
      const k = m.scrollWidth / 100;
      if (alive && k > 0) w.style.setProperty('--wm-k', k.toFixed(4));
    };
    fit();
    void document.fonts.ready.then(fit);
    return () => {
      alive = false;
    };
  }, [text]);

  useEffect(() => {
    const w = wrap.current;
    const letterEls = letters.current;
    if (!w || reduced || !window.matchMedia('(hover: hover)').matches) return;
    const pointer = { x: -9999, y: -9999 };
    const scales = chars.map(() => 1);
    let stopTick: (() => void) | null = null;
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const frame = (dt: number) => {
      const k = 1 - Math.pow(1 - 0.15, dt);
      letterEls.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const near = pointer.y > r.top - 260 && pointer.y < r.bottom + 40;
        const d = Math.abs(pointer.x - (r.left + r.width / 2));
        const pull = near ? Math.exp(-Math.pow(d / 180, 2)) : 0;
        const cur = scales[i] ?? 1;
        const next = cur + (1 + 0.3 * pull - cur) * k;
        scales[i] = next;
        el.style.transform = `scaleY(${next.toFixed(4)})`;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const stopObserve = observeViewport(w, (e) => {
      if (e.isIntersecting) stopTick ??= addTick(frame);
      else {
        stopTick?.();
        stopTick = null;
      }
    });
    return () => {
      stopTick?.();
      stopObserve();
      window.removeEventListener('pointermove', onMove);
      letterEls.forEach((el) => el?.style.removeProperty('transform'));
    };
    // `chars` derives from `text`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  return (
    <div
      ref={wrap}
      className={cx('wm', className)}
      style={{ '--wm-k': widthRatio } as CSSProperties}
    >
      <span ref={measure} className="wm-measure type-display-wide" aria-hidden="true">
        {text}
      </span>
      <div className="wm-text type-display-wide" role="img" aria-label={label}>
        {chars.map((c, i) => (
          <span
            key={i}
            ref={(node) => {
              letters.current[i] = node;
            }}
            className="wm-letter"
            aria-hidden="true"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
