'use client';

import { DESKTOP_QUERY, gsap, useMotionEffect } from '@studio/kit/motion';
import { type ReactNode, useRef } from 'react';

/**
 * Scroll-linked hero: as the next section slides over the sticky hero, the
 * headline rows drift apart sideways and the hero scales back, fades and
 * blurs (board: rows -320, +240, +300px; scale 0.92; opacity 0.35; blur 6px).
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(
    ref,
    (inner) => {
      const hero = inner.parentElement;
      if (!hero) return;
      const rows = inner.querySelectorAll<HTMLElement>('[data-hero-row]');
      const shift = [-320, 240, 300];
      const tl = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: () => `+=${hero.offsetHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      rows.forEach((row, i) => {
        tl.to(row, { x: shift[i] ?? 0, ease: 'none' }, 0);
      });
      tl.to(inner, { scale: 0.92, opacity: 0.35, filter: 'blur(6px)', ease: 'none' }, 0);
      // Phones scroll the hero away like any section, so it only does this on wide screens.
    },
    [],
    { media: DESKTOP_QUERY },
  );
  return (
    <div
      ref={ref}
      className="origin-[50%_35%] max-desk:relative max-desk:flex max-desk:min-h-[inherit] max-desk:flex-col max-desk:px-[var(--spacing-gutter-sm)] max-desk:pt-[104px] max-desk:pb-7 desk:absolute desk:inset-0"
    >
      {children}
    </div>
  );
}
