'use client';

import { gsap, useMotionEffect } from '@studio/kit/motion';
import { type ReactNode, useRef } from 'react';

/**
 * Scroll-linked hero: as the next section slides over the sticky hero, the
 * headline rows drift apart sideways and the hero scales back, fades and
 * blurs (board: rows -320, +240, +300px; scale 0.92; opacity 0.35; blur 6px).
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(ref, (inner) => {
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
  });
  return (
    <div ref={ref} className="absolute inset-0 origin-[50%_35%]">
      {children}
    </div>
  );
}
