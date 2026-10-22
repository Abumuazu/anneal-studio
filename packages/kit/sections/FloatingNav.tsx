'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { subscribeScroll } from '../motion/engine';

interface FloatingNavProps {
  /** Small mark at the left. */
  mark: ReactNode;
  /** Call to action at the right. */
  cta: ReactNode;
  /** Accessible name for the nav, e.g. "Quick". */
  label: string;
  /**
   * Shows once the page has scrolled past this many px. Elements with
   * `data-nav-after` override it: the nav shows once 70% of that element has
   * scrolled by (Home hero).
   */
  showAfter?: number;
}

/**
 * A glass pill at the bottom of the screen. Its message follows the section
 * in view: the last `[data-msg]` element whose top has passed the middle of
 * the viewport. Hidden (and inert) until the page scrolls.
 */
export function FloatingNav({ mark, cta, label, showAfter = 320 }: FloatingNavProps) {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');
  const pathname = usePathname();
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      const after = document.querySelector<HTMLElement>('[data-nav-after]');
      const threshold = after ? after.offsetTop + after.offsetHeight * 0.7 : showAfter;
      setVisible(window.scrollY > threshold);
      const sections = document.querySelectorAll<HTMLElement>('[data-msg]');
      let next = sections[0]?.dataset.msg ?? '';
      for (const s of sections) {
        if (s.getBoundingClientRect().top < vh * 0.5) next = s.dataset.msg ?? next;
      }
      setMsg(next);
    };
    update();
    const stop = subscribeScroll(update);
    window.addEventListener('resize', update);
    return () => {
      stop();
      window.removeEventListener('resize', update);
    };
  }, [showAfter, pathname]);

  // `inert` keeps the hidden CTA out of the tab order.
  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    el.inert = !visible;
  }, [visible]);

  return (
    <nav
      ref={nav}
      aria-label={label}
      className="fnav glass"
      data-visible={visible ? '' : undefined}
    >
      {mark}
      {/* Keyed so each new message remounts and replays the CSS entrance. */}
      <span key={msg} className="fnav-msg">
        {msg}
      </span>
      {cta}
    </nav>
  );
}
