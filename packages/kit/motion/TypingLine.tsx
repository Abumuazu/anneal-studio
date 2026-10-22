'use client';

import { type ReactNode, useEffect, useRef } from 'react';

import { cx } from '../lib/cx';
import { gsap } from './engine';
import { useReducedMotion } from './hooks';
import { observeViewport } from './viewport';

export interface TypingItem {
  /** Typed after the prefix, e.g. "a booking site for my clinic". */
  text: string;
  /** Shown under the line once typing finishes, e.g. "Website · 3 to 5 days". */
  answer: string;
}

interface TypingLineProps {
  prefix: ReactNode;
  items: readonly TypingItem[];
  className?: string;
  /** Classes for the prefix-and-text row (e.g. an underline). */
  rowClassName?: string;
  prefixClassName?: string;
  textClassName?: string;
  answerClassName?: string;
}

/**
 * A line that types each example, shows its answer, then deletes it and moves
 * on (Home hero). Board timing per example: type 1.47s, hold 1.36s, delete
 * 0.47s. Shows the first example still with reduced motion. Paused off screen.
 * The animated text is hidden from assistive tech, which reads every example
 * as a list instead.
 */
export function TypingLine({
  prefix,
  items,
  className,
  rowClassName,
  prefixClassName,
  textClassName,
  answerClassName,
}: TypingLineProps) {
  const root = useRef<HTMLDivElement>(null);
  const typed = useRef<HTMLSpanElement>(null);
  const answer = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const first = items[0];

  useEffect(() => {
    const el = root.current;
    const t = typed.current;
    const a = answer.current;
    if (!el || !t || !a || reduced || items.length === 0) return;

    const tl = gsap.timeline({ repeat: -1, paused: true });
    for (const item of items) {
      const n = item.text.length;
      const state = { chars: 0 };
      const render = () => {
        t.textContent = item.text.slice(0, Math.round(state.chars));
      };
      tl.call(() => {
        a.textContent = item.answer;
        state.chars = 0;
        render();
      })
        .set(a, { opacity: 0, y: 6 })
        .to(state, { chars: n, duration: 1.47, ease: `steps(${n})`, onUpdate: render })
        .to(a, { opacity: 1, y: 0, duration: 0.21, ease: 'power2.out' })
        .to({}, { duration: 1.36 })
        .to(a, { opacity: 0, y: -4, duration: 0.3, ease: 'power2.in' })
        .to(state, { chars: 0, duration: 0.47, ease: `steps(${n})`, onUpdate: render }, '<')
        .to({}, { duration: 0.2 });
    }

    const stop = observeViewport(el, (e) => {
      if (e.isIntersecting) tl.play();
      else tl.pause();
    });
    return () => {
      stop();
      tl.kill();
      t.textContent = first?.text ?? '';
      a.textContent = first?.answer ?? '';
      gsap.set(a, { clearProps: 'opacity,transform' });
    };
  }, [items, reduced, first]);

  return (
    <div ref={root} className={className}>
      <div className={cx('flex items-center gap-2.5', rowClassName)} aria-hidden="true">
        <span className={cx('flex-none', prefixClassName)}>{prefix}</span>
        {/* Sized in the text's own font so the box matches the typed line. */}
        <span className={cx('relative h-[1.4em] min-w-0 flex-1', textClassName)}>
          <span className="absolute top-0 left-0 inline-flex h-full items-center whitespace-nowrap">
            <span ref={typed}>{first?.text}</span>
            <span className="typing-caret" />
          </span>
        </span>
      </div>
      <div className="relative" aria-hidden="true">
        <span ref={answer} className={cx('inline-block whitespace-nowrap', answerClassName)}>
          {first?.answer}
        </span>
      </div>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.text}>
            {prefix} {item.text}: {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
}
