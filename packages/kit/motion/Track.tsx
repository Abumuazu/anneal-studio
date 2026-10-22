'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cx } from '../lib/cx';
import { PIN_QUERY, ScrollTrigger, gsap } from './engine';
import { useMotionEffect } from './hooks';

interface ActiveContext {
  active: number;
  count: number;
  /** False when everything shows as active (small screens, reduced motion). */
  scrubbing: boolean;
}

const TrackContext = createContext<ActiveContext>({ active: 0, count: 0, scrubbing: false });

interface HorizontalTrackProps extends HTMLAttributes<HTMLElement> {
  /** Shown above the track inside the pinned frame (headline, counter). */
  header?: ReactNode;
  /** Accessible name for the row when it scrolls natively (small screens, reduced motion). */
  label: string;
  count: number;
  /** Card width and gap in px. Used to reserve the pinned height before JS measures. */
  itemWidth: number;
  gap?: number;
  /** Side padding of the track row in px. */
  padding?: number;
  children: ReactNode;
}

/**
 * A section that pins while its row of cards scrolls sideways (the process
 * track). It uses `position: sticky` and a CSS-computed height instead of a
 * pin-spacer, so nothing below it shifts when JS starts. On small screens and
 * with reduced motion the row is a normal horizontal scroller.
 */
export function HorizontalTrack({
  header,
  label,
  count,
  itemWidth,
  gap = 20,
  padding = 40,
  className,
  style,
  children,
  ...rest
}: HorizontalTrackProps) {
  const outer = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  useMotionEffect(
    outer,
    (el) => {
      const vp = viewport.current;
      const track = row.current;
      if (!vp || !track) return;
      const distance = () => Math.max(0, track.scrollWidth - vp.clientWidth);
      const measure = () => el.style.setProperty('--htrack-dist', `${distance()}px`);
      measure();
      const ro = new ResizeObserver(() => {
        measure();
        ScrollTrigger.refresh();
      });
      ro.observe(track);
      setScrubbing(true);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActive(Math.min(count - 1, Math.floor(self.progress * (count - 0.001))));
          },
        },
      });
      return () => {
        ro.disconnect();
        el.style.removeProperty('--htrack-dist');
        setScrubbing(false);
        setActive(0);
      };
    },
    [count],
    { media: PIN_QUERY },
  );

  // Scrolling natively (phones, reduced motion): the card nearest the left edge is current.
  useEffect(() => {
    if (scrubbing) return;
    const vp = viewport.current;
    const track = row.current;
    if (!vp || !track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const first = track.firstElementChild;
      if (!(first instanceof HTMLElement)) return;
      const next = Math.round(vp.scrollLeft / (first.offsetWidth + gap));
      setActive(Math.min(count - 1, Math.max(0, next)));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      vp.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scrubbing, count, gap]);

  // Reserve the pinned height in CSS so the page does not grow when JS runs.
  const reserved = `max(0px, ${count * itemWidth + (count - 1) * gap + padding * 2}px - 100vw)`;

  return (
    <TrackContext.Provider value={{ active, count, scrubbing }}>
      <section
        ref={outer}
        className={cx('htrack relative', className)}
        style={{ ...style, '--htrack-dist': reserved } as CSSProperties}
        {...rest}
      >
        <div className="htrack-sticky">
          {header}
          {/* When not pinned the row scrolls natively, so keyboard users need to reach it. */}
          <div
            ref={viewport}
            className="htrack-vp"
            role="region"
            aria-label={label}
            tabIndex={scrubbing ? -1 : 0}
          >
            <div
              ref={row}
              className="htrack-row"
              style={{ gap, '--htrack-px': `${padding}px` } as CSSProperties}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </TrackContext.Provider>
  );
}

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  children: ReactNode;
}

/**
 * A card in `HorizontalTrack`. Gets `data-active="true"` while it is the
 * current step, so styles can switch with `data-[active=true]:`.
 */
export function TrackItem({ index, children, ...rest }: ItemProps) {
  const { active } = useContext(TrackContext);
  const on = index === active;
  return (
    <div data-active={on ? 'true' : 'false'} {...rest}>
      {children}
    </div>
  );
}

/** "01" style counter for the current step. Pair with a static total. */
export function TrackCounter({ pad = 2 }: { pad?: number }) {
  const { active } = useContext(TrackContext);
  return <>{String(active + 1).padStart(pad, '0')}</>;
}

/* ---------- Scroll steps ---------- */

const StepsContext = createContext<ActiveContext>({ active: 0, count: 0, scrubbing: false });

interface ScrollStepsProps extends HTMLAttributes<HTMLDivElement> {
  count: number;
  children: ReactNode;
}

/**
 * Highlights one item at a time as the list passes the 60% line of the
 * viewport (Home principles list). Every item is highlighted on small screens
 * and with reduced motion.
 */
export function ScrollSteps({ count, children, ...rest }: ScrollStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  useMotionEffect(
    ref,
    (el) => {
      setScrubbing(true);
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onUpdate: (self) => {
          setActive(Math.min(count - 1, Math.floor(self.progress * count)));
        },
      });
      return () => {
        st.kill();
        setScrubbing(false);
      };
    },
    [count],
    { media: PIN_QUERY },
  );

  return (
    <StepsContext.Provider value={{ active, count, scrubbing }}>
      <div ref={ref} {...rest}>
        {children}
      </div>
    </StepsContext.Provider>
  );
}

/**
 * An item in `ScrollSteps` or `PinnedSteps`, with `data-active` set while it is
 * current and `data-past` once the scroll has moved beyond it.
 */
export function StepItem({ index, children, ...rest }: ItemProps) {
  const { active, scrubbing } = useContext(StepsContext);
  const on = !scrubbing || index === active;
  return (
    <div
      data-active={on ? 'true' : 'false'}
      data-past={scrubbing && index < active ? 'true' : 'false'}
      data-scrubbing={scrubbing ? 'true' : 'false'}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * The current step of the enclosing `ScrollSteps` or `PinnedSteps`, for
 * visuals that follow it. `scrubbing` is false on small screens and with
 * reduced motion, where every step shows at once.
 */
export function useSteps(): ActiveContext {
  return useContext(StepsContext);
}

interface PinnedStepsProps extends HTMLAttributes<HTMLElement> {
  count: number;
  /** Height of the scroll runway, in viewport heights (the board uses 3.2). */
  length?: number;
  /** Classes for the frame that stays pinned while the runway scrolls. */
  frameClassName?: string;
  children: ReactNode;
}

/**
 * A section that pins for a few screens while its steps advance with the
 * scroll (the jewellery money flow). Sticky positioning and a CSS height keep
 * the layout stable before JS runs. On small screens and with reduced motion
 * it is a normal section with every step shown.
 */
export function PinnedSteps({
  count,
  length = 3.2,
  frameClassName,
  className,
  style,
  children,
  ...rest
}: PinnedStepsProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  useMotionEffect(
    ref,
    (el) => {
      setScrubbing(true);
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setActive(Math.min(count - 1, Math.floor(self.progress * (count - 0.001))));
        },
      });
      return () => {
        st.kill();
        setScrubbing(false);
        setActive(0);
      };
    },
    [count],
    { media: PIN_QUERY },
  );

  return (
    <StepsContext.Provider value={{ active, count, scrubbing }}>
      <section
        ref={ref}
        className={cx('psteps relative', className)}
        style={{ ...style, '--psteps-len': length } as CSSProperties}
        {...rest}
      >
        <div className={cx('psteps-frame', frameClassName)}>{children}</div>
      </section>
    </StepsContext.Provider>
  );
}
