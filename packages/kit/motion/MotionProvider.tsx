'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

import { ScrollTrigger, ensureGsap, getLenis, startSmoothScroll, stopSmoothScroll } from './engine';
import { useReducedMotion } from './hooks';
import { configureMotionPreference } from './preference';

interface MotionProviderProps {
  children: ReactNode;
  /** sessionStorage key for the reduced-motion override. Match the boot script. */
  storageKey?: string;
  /** Lenis smooth scrolling. Never runs with reduced motion. */
  smoothScroll?: boolean;
}

/**
 * Starts the motion engine for the page: Lenis smooth scroll driven by the
 * GSAP ticker, with ScrollTrigger kept in sync. Mount once in the root layout.
 */
export function MotionProvider({
  children,
  storageKey = 'kit-motion',
  smoothScroll = true,
}: MotionProviderProps) {
  configureMotionPreference(storageKey);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    ensureGsap();
    if (reduced || !smoothScroll) return;
    startSmoothScroll();
    return () => stopSmoothScroll();
  }, [reduced, smoothScroll]);

  // New route: content height changed, so re-measure every trigger.
  useEffect(() => {
    getLenis()?.resize();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Web fonts change line lengths and section heights once they load.
  useEffect(() => {
    let alive = true;
    void document.fonts.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    return () => {
      alive = false;
    };
  }, []);

  return children;
}
