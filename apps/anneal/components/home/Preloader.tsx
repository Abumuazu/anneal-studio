'use client';

import { EASE_MORPH, ensureGsap, gsap } from '@studio/kit/motion';
import { type CSSProperties, useEffect, useRef } from 'react';

import { boardCopy } from '@/content/copy';

const SEEN_KEY = 'anneal-pre';

/**
 * Runs before first paint on a hard load of Home: shows the preloader once
 * per session, with full motion on wide screens (phones have none, as on
 * HomeMobileV6), and never over a "Work with us" arrival.
 * Client-side navigation never runs it (React does not execute this script).
 */
const START = `(function(){try{var d=document.documentElement;if(d.getAttribute('data-motion')!=='full'||matchMedia('(max-width:900px)').matches||d.hasAttribute('data-handoff')||sessionStorage.getItem('${SEEN_KEY}'))return;d.setAttribute('data-preload','count')}catch(e){}})();`;

/**
 * The four-cell logo counts to 100, splits, then each cell flies into a hero
 * tile (and one into the header mark). The hero text is painted under the
 * overlay from the first frame, so it stays the LCP element.
 */
export function Preloader() {
  const count = useRef<HTMLSpanElement>(null);
  const cells = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute('data-preload') !== 'count') return;
    ensureGsap();
    const timers: number[] = [];
    let raf = 0;
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const split = () => {
      root.setAttribute('data-preload', 'split');
      const dirs = [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ] as const;
      cells.current.forEach((el, i) => {
        const d = dirs[i];
        if (!el || !d) return;
        gsap.to(el, {
          x: d[0] * 118,
          y: d[1] * 96,
          rotate: i % 2 ? 90 : -90,
          scale: 1.15,
          duration: 0.52,
          ease: EASE_MORPH,
        });
      });
    };

    const fly = () => {
      root.setAttribute('data-preload', 'fly');
      const targets = [
        document.querySelector('[data-hero-tile="1"] .morph-tile'),
        document.querySelector('[data-hero-tile="2"] .morph-tile'),
        document.querySelector('header .mark i:nth-child(3)'),
        document.querySelector('[data-hero-tile="3"] .morph-tile'),
      ];
      const delays = [0, 0.09, 0.26, 0.17];
      const W = window.innerWidth;
      const H = window.innerHeight;
      cells.current.forEach((el, i) => {
        const t = targets[i];
        if (!el || !t) return;
        const r = t.getBoundingClientRect();
        gsap.to(el, {
          x: r.left + r.width / 2 - W / 2,
          y: r.top + r.height / 2 - H / 2,
          rotate: 0,
          scale: r.width / 66,
          borderRadius: getComputedStyle(t).borderRadius,
          duration: 0.94,
          delay: delays[i],
          ease: EASE_MORPH,
        });
      });
      later(() => {
        root.setAttribute('data-preload', 'landed');
        cells.current.forEach((el) => el && (el.style.opacity = '0'));
      }, 1220);
      later(() => {
        root.removeAttribute('data-preload');
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          // Storage blocked: the preloader may show again next visit.
        }
      }, 1560);
    };

    // Count with the clock since navigation started, so a slow hydration
    // does not stretch the preloader: 100 at about 1.4s.
    const tick = () => {
      const p = Math.min(100, Math.round(performance.now() / 14));
      if (count.current) count.current.textContent = String(p).padStart(3, '0');
      if (p < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }
      later(split, 120);
      later(fly, 680);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: START }} />
      <div className="pre" aria-hidden="true">
        <div className="pre-ui type-label top-[34px] right-[var(--spacing-gutter)] left-[var(--spacing-gutter)] flex justify-between text-grey-600">
          <span>{boardCopy.studioName}</span>
          <span>{boardCopy.cities}</span>
        </div>
        <div className="pre-ui type-label bottom-11 left-[var(--spacing-gutter)] text-grey-600">
          {boardCopy.preloaderLine}
        </div>
        <span
          ref={count}
          className="pre-ui type-display right-[var(--spacing-gutter)] bottom-[30px] text-[150px]"
        >
          000
        </span>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={(n) => {
              cells.current[i] = n;
            }}
            data-cell={i}
            className="pre-cell"
            style={
              {
                transform: `translate(${i % 2 ? 42 : -42}px, ${i < 2 ? -42 : 42}px)`,
                '--cell-delay': `${-0.8 * i}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
}
