'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { cx } from '../lib/cx';
import { EASE_MORPH, ensureGsap, gsap, holdReveals } from '../motion/engine';
import { useReducedMotion } from '../motion/hooks';
import { cardRect, consumeHandoff, isPlainClick, writeHandoff } from './handoff-flag';

interface HandoffApi {
  /** Starts the morph from `from` and navigates to `href`. False if it declined. */
  go: (href: string, from: HTMLElement) => boolean;
}

const HandoffContext = createContext<HandoffApi | null>(null);

interface HandoffProviderProps {
  children: ReactNode;
  /** Shown in the middle of the overlay once it fills the screen. */
  overlay: ReactNode;
  /** sessionStorage key for the hand-off flag. Match the boot script. */
  storageKey?: string;
  maxAgeMs?: number;
  className?: string;
}

/**
 * The page hand-off transition (a "start a project" call to action). A link morphs into a card, the card
 * fills the screen, the site navigates, and the destination lifts the overlay
 * away. The destination decides by reading a timestamped flag, so the reveal
 * plays on every navigation, client-side or full reload. With reduced motion,
 * links navigate normally.
 */
export function HandoffProvider({
  children,
  overlay,
  storageKey = 'kit-handoff',
  maxAgeMs = 6000,
  className,
}: HandoffProviderProps) {
  const box = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const busy = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const hide = useCallback(() => {
    const o = box.current;
    if (!o) return;
    o.removeAttribute('data-content');
    gsap.set(o, { clearProps: 'all' });
    busy.current = false;
  }, []);

  const arrive = useCallback(() => {
    const o = box.current;
    if (!o) return;
    ensureGsap();
    tl.current?.kill();
    busy.current = true;
    holdReveals(1100);
    gsap.set(o, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: '0px 0px 0px 0px',
      opacity: 1,
      yPercent: 0,
    });
    o.setAttribute('data-content', '');
    document.documentElement.removeAttribute('data-handoff');
    tl.current = gsap
      .timeline({ onComplete: hide })
      .call(() => o.removeAttribute('data-content'), [], 0.45)
      .to(
        o,
        { yPercent: -102, borderRadius: '0px 0px 48px 48px', duration: 1, ease: EASE_MORPH },
        0.45,
      );
  }, [hide]);

  const go = useCallback(
    (href: string, from: HTMLElement) => {
      const o = box.current;
      if (!o || reduced || busy.current) return false;
      ensureGsap();
      busy.current = true;
      router.prefetch(href);
      const r = from.getBoundingClientRect();
      const W = window.innerWidth;
      const H = window.innerHeight;
      const card = cardRect(r, { width: W, height: H });
      tl.current?.kill();
      o.removeAttribute('data-content');
      tl.current = gsap
        .timeline()
        .set(o, {
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
          borderRadius: r.height / 2,
          opacity: 1,
          yPercent: 0,
        })
        .to(o, { ...card, borderRadius: 32, duration: 0.56, ease: EASE_MORPH })
        .to(
          o,
          {
            left: 0,
            top: 0,
            width: W,
            height: H,
            borderRadius: 0,
            duration: 0.72,
            ease: EASE_MORPH,
          },
          0.6,
        )
        .call(() => o.setAttribute('data-content', ''), [], 0.6)
        .call(
          () => {
            writeHandoff(window.sessionStorage, storageKey);
            const target = new URL(href, window.location.href);
            const here = window.location;
            if (target.pathname === here.pathname && target.search === here.search) {
              consumeHandoff(window.sessionStorage, storageKey, maxAgeMs);
              arrive();
            } else {
              router.push(href);
            }
          },
          [],
          1.5,
        );
      return true;
    },
    [reduced, router, storageKey, maxAgeMs, arrive],
  );

  // Every route change (and the first load): play the arrival if a fresh flag is waiting.
  useEffect(() => {
    const root = document.documentElement;
    const flagged = consumeHandoff(window.sessionStorage, storageKey, maxAgeMs);
    const covered = root.getAttribute('data-handoff') === 'arrive';
    if ((flagged || covered) && !reduced) arrive();
    else root.removeAttribute('data-handoff');
    // Only route changes should trigger this; `arrive` and `reduced` are read fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => void tl.current?.kill(), []);

  const api = useMemo(() => ({ go }), [go]);

  return (
    <HandoffContext.Provider value={api}>
      {children}
      <div ref={box} className={cx('handoff', className)} aria-hidden="true">
        <div className="handoff-content">{overlay}</div>
      </div>
    </HandoffContext.Provider>
  );
}

type HandoffLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

/** A Next.js link that plays the hand-off transition on a plain click. */
export function HandoffLink({ href, onClick, target, ...rest }: HandoffLinkProps) {
  const api = useContext(HandoffContext);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!api || target === '_blank' || !isPlainClick(e)) return;
    if (api.go(href, e.currentTarget)) e.preventDefault();
  };
  return <Link href={href} target={target} onClick={handle} {...rest} />;
}
