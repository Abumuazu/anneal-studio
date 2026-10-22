'use client';

import { type CSSProperties, createElement, useRef } from 'react';

import { ScrollTrigger } from './engine';
import { useMotionEffect } from './hooks';

interface WordLightProps {
  text: string;
  as?: 'p' | 'h2' | 'div';
  className?: string;
  /** Colour of lit words. Defaults to the ink token. */
  on?: string;
  /** Colour of words not yet lit. */
  off?: string;
  /**
   * How far past the start the last word lights, as a share of the element's
   * height plus a quarter of the viewport (inner-page boards). Home uses 0.55
   * of the element height only; pass `span="element"` for that.
   */
  span?: 'element' | 'element-and-viewport';
  /**
   * Measure progress against the closest ancestor matching this selector
   * instead of the paragraph itself. Use it when the paragraph is sticky.
   */
  triggerClosest?: string;
}

/** A paragraph whose words light up one by one as it scrolls through. */
export function WordLight({
  text,
  as = 'p',
  className,
  on,
  off,
  span = 'element-and-viewport',
  triggerClosest,
}: WordLightProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useMotionEffect(
    ref,
    (el) => {
      const spans = Array.from(el.querySelectorAll<HTMLElement>('.wl'));
      let lit = -1;
      const apply = (progress: number) => {
        const next = Math.round(progress * spans.length);
        if (next === lit) return;
        lit = next;
        spans.forEach((s, i) => {
          if (i < next) s.setAttribute('data-on', '');
          else s.removeAttribute('data-on');
        });
      };
      const trigger = (triggerClosest ? el.closest<HTMLElement>(triggerClosest) : null) ?? el;
      const st = ScrollTrigger.create({
        trigger,
        start: 'top 85%',
        end: () =>
          span === 'element'
            ? `+=${trigger.offsetHeight * 0.55}`
            : `+=${trigger.offsetHeight + window.innerHeight * 0.25}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
      });
      return () => {
        st.kill();
        spans.forEach((s) => s.removeAttribute('data-on'));
      };
    },
    [span, text, triggerClosest],
  );

  const style = { '--wl-on': on, '--wl-off': off } as CSSProperties;
  return createElement(
    as,
    { ref, className, style },
    words.map((w, i) => (
      <span key={i} className="wl">
        {w}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    )),
  );
}
