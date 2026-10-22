'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  type ComponentProps,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';

import { EASE_MORPH, ensureGsap, getLenis, gsap } from '../motion/engine';
import { useReducedMotion } from '../motion/hooks';
import { isPlainClick } from './handoff-flag';

/** The shared view-transition name the cover and its target take, one at a time. */
const NAME = 'kit-cover';
/** Give up waiting for the destination after this long and just finish. */
const WAIT_MS = 3000;

let waiter: ((el: HTMLElement) => void) | null = null;
let busy = false;

function waitForTarget(): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      waiter = null;
      resolve(null);
    }, WAIT_MS);
    waiter = (el) => {
      window.clearTimeout(timer);
      waiter = null;
      resolve(el);
    };
  });
}

function toTop(): void {
  getLenis()?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

function setName(el: HTMLElement | null, on: boolean): void {
  if (on) el?.style.setProperty('view-transition-name', NAME);
  else el?.style.removeProperty('view-transition-name');
}

/**
 * Morphs `frame` into the destination's `CoverTarget`. Uses the View
 * Transitions API where it exists; elsewhere a solid overlay in the frame's
 * colour flies to the target's box and fades, which reads the same.
 */
async function playCover(frame: HTMLElement, navigate: () => void): Promise<void> {
  if (busy) return;
  busy = true;
  ensureGsap();

  if (typeof document.startViewTransition === 'function') {
    const root = document.documentElement;
    let target: HTMLElement | null = null;
    setName(frame, true);
    root.setAttribute('data-cover', '');
    const vt = document.startViewTransition(async () => {
      setName(frame, false);
      const arrived = waitForTarget();
      navigate();
      target = await arrived;
      toTop();
      setName(target, true);
    });
    try {
      await vt.finished;
    } finally {
      setName(target, false);
      root.removeAttribute('data-cover');
      busy = false;
    }
    return;
  }

  const from = frame.getBoundingClientRect();
  const look = getComputedStyle(frame);
  const overlay = document.createElement('div');
  overlay.className = 'cover-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  gsap.set(overlay, {
    left: from.left,
    top: from.top,
    width: from.width,
    height: from.height,
    borderRadius: look.borderRadius,
    background: look.backgroundColor,
  });
  document.body.append(overlay);
  const arrived = waitForTarget();
  navigate();
  const target = await arrived;
  toTop();
  const tl = gsap.timeline({
    onComplete: () => {
      overlay.remove();
      busy = false;
    },
  });
  if (target) {
    const to = target.getBoundingClientRect();
    tl.to(overlay, {
      left: to.left,
      top: to.top,
      width: to.width,
      height: to.height,
      borderRadius: getComputedStyle(target).borderRadius,
      duration: 0.9,
      ease: EASE_MORPH,
    });
  }
  tl.to(overlay, { opacity: 0, duration: 0.35, ease: 'none' });
}

type CoverLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/**
 * A link whose `[data-cover-frame]` child (or the link itself) grows into the
 * destination's `CoverTarget` (work cover to case hero). Plain navigation with
 * reduced motion and for modified clicks.
 */
export function CoverLink({ href, onClick, target, children, ...rest }: CoverLinkProps) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || reduced || busy || target === '_blank' || !isPlainClick(e)) return;
    const link = e.currentTarget;
    const frame = link.querySelector<HTMLElement>('[data-cover-frame]') ?? link;
    e.preventDefault();
    void playCover(frame, () => router.push(href));
  };
  return (
    <Link href={href} target={target} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}

interface CoverTargetProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Where an incoming cover lands (the case hero stage). */
export function CoverTarget({ children, ...rest }: CoverTargetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Keyed on the path too: moving between two cases can reuse this element.
  useLayoutEffect(() => {
    if (ref.current && waiter) waiter(ref.current);
  }, [pathname]);
  return (
    <div ref={ref} data-cover-target="" {...rest}>
      {children}
    </div>
  );
}
