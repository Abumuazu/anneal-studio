/**
 * The single motion engine: GSAP (ticker, ScrollTrigger, eases) plus Lenis.
 * Every per-frame callback in the kit goes through `addTick`, and every scroll
 * reading goes through `subscribeScroll` or ScrollTrigger, so there is one RAF
 * loop and one scroll listener for the whole page.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { easeMorph, easeReveal } from './bezier';

export { gsap, ScrollTrigger };

/** Above this width, pinned and scrubbed effects run (board breakpoint). */
export const DESKTOP_QUERY = '(min-width: 901px)';
/** Pinned and sticky sections also need a viewport under 1300px tall (board rule). */
export const PIN_QUERY = '(min-width: 901px) and (max-height: 1299px)';
/** GSAP eases for the two spec curves. Pass as `ease`. */
export const EASE_REVEAL = easeReveal;
export const EASE_MORPH = easeMorph;

let registered = false;

export function ensureGsap(): void {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/* ---------- Per-frame callbacks ---------- */

/**
 * Registers a per-frame callback on the shared GSAP ticker. `dt` is the frame
 * time as a multiple of a 60fps frame, so board maths written per frame stays
 * correct on 120Hz screens.
 */
export function addTick(fn: (dt: number) => void): () => void {
  ensureGsap();
  const cb = () => fn(gsap.ticker.deltaRatio(60));
  gsap.ticker.add(cb);
  return () => gsap.ticker.remove(cb);
}

/* ---------- Smooth scroll ---------- */

let lenis: Lenis | null = null;
let lenisTick: (() => void) | null = null;

export function startSmoothScroll(): Lenis {
  ensureGsap();
  if (lenis) return lenis;
  const instance = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
  instance.on('scroll', () => ScrollTrigger.update());
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  lenis = instance;
  lenisTick = () => gsap.ticker.remove(tick);
  return instance;
}

export function stopSmoothScroll(): void {
  lenisTick?.();
  lenisTick = null;
  lenis?.destroy();
  lenis = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/* ---------- Scroll subscription and velocity ---------- */

const scrollListeners = new Set<() => void>();
let scrollQueued = false;

function onWindowScroll(): void {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    for (const l of scrollListeners) l();
  });
}

/** Calls `fn` at most once per frame after the page scrolls. */
export function subscribeScroll(fn: () => void): () => void {
  if (scrollListeners.size === 0) {
    window.addEventListener('scroll', onWindowScroll, { passive: true });
  }
  scrollListeners.add(fn);
  return () => {
    scrollListeners.delete(fn);
    if (scrollListeners.size === 0) window.removeEventListener('scroll', onWindowScroll);
  };
}

let velocity = 0;
let lastY: number | null = null;
let velocityUsers = 0;
let velocityStop: (() => void) | null = null;

/**
 * Smoothed scroll velocity in px per 60fps frame (board: v = v * .86 + d * .14).
 * Call the returned function to stop tracking.
 */
export function trackScrollVelocity(): () => void {
  velocityUsers += 1;
  velocityStop ??= addTick(() => {
    const y = window.scrollY;
    if (lastY !== null) velocity = velocity * 0.86 + (y - lastY) * 0.14;
    lastY = y;
  });
  return () => {
    velocityUsers -= 1;
    if (velocityUsers <= 0 && velocityStop) {
      velocityStop();
      velocityStop = null;
      lastY = null;
      velocity = 0;
    }
  };
}

export function getScrollVelocity(): number {
  return velocity;
}

/* ---------- Reveal hold ---------- */

let holdUntil = 0;

/** Delays reveal-on-enter while a page transition overlay is still covering. */
export function holdReveals(ms: number): void {
  holdUntil = Math.max(holdUntil, performance.now() + ms);
}

export function revealHoldRemaining(): number {
  return Math.max(0, holdUntil - performance.now());
}
