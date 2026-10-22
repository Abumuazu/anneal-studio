'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  createElement,
  useEffect,
  useRef,
} from 'react';

import { revealHoldRemaining } from './engine';
import { observeViewport } from './viewport';

type Tag = 'div' | 'section' | 'span' | 'header' | 'footer' | 'ul' | 'ol' | 'li' | 'article';

interface InViewProps extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  /**
   * Fraction of the viewport height the element's top must cross to count as
   * "in". The boards use 0.9 on inner pages and 0.82 on Home.
   */
  at?: number;
  children?: ReactNode;
}

/**
 * Sets `data-in` on itself, once, when it scrolls into view. Children with
 * `.rv` (Reveal) or `.ml` (LineMask) animate from that. Waits while a page
 * transition overlay is still covering the screen.
 */
export function InView({ as = 'div', at = 0.9, children, ...rest }: InViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.hasAttribute('data-in')) return;
    let timer = 0;
    const mark = () => {
      const wait = revealHoldRemaining();
      if (wait > 0) timer = window.setTimeout(mark, wait);
      else el.setAttribute('data-in', '');
    };
    const margin = `0px 0px ${(-(1 - at) * 100).toFixed(1)}% 0px`;
    const stop = observeViewport(
      el,
      (e) => {
        // Also fire for elements already scrolled past (a reload mid-page).
        const past = e.boundingClientRect.top < window.innerHeight * at;
        if (e.isIntersecting || past) {
          stop();
          mark();
        }
      },
      margin,
    );
    return () => {
      stop();
      window.clearTimeout(timer);
    };
  }, [at]);

  return createElement(as, { ...rest, ref: ref as RefObject<HTMLDivElement> }, children);
}
