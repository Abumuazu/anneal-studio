'use client';

import { type CSSProperties, type HTMLAttributes, type ReactNode, useRef } from 'react';

import { cx } from '../lib/cx';
import { PIN_QUERY, gsap } from './engine';
import { useMotionEffect } from './hooks';

interface StackCardsProps extends HTMLAttributes<HTMLDivElement> {
  /** Sticky offset from the top of the viewport, in px. */
  top?: number;
  /** Scale a card settles to once the next card covers it. */
  scaleTo?: number;
  /** Opacity of the dark shade over a covered card. */
  shadeTo?: number;
  children: ReactNode;
}

/**
 * Sticky cards that stack: as each card arrives, the one beneath it scales
 * down and darkens (Home case stack, inner-page question cards). Cards are
 * plain siblings in normal flow on small screens and with reduced motion.
 */
export function StackCards({
  top = 24,
  scaleTo = 0.93,
  shadeTo = 0.55,
  className,
  style,
  children,
  ...rest
}: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(
    ref,
    (el) => {
      const cards = Array.from(el.querySelectorAll<HTMLElement>(':scope > .stack-card'));
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const inner = card.querySelector<HTMLElement>(':scope > .stack-inner');
        const shade = card.querySelector<HTMLElement>(':scope > .stack-inner > .stack-shade');
        // Cards can set their own sticky offset; settle when the next one reaches its own.
        const scrollTrigger = {
          trigger: next,
          start: 'top bottom',
          end: () => `top ${parseFloat(getComputedStyle(next).top) || top}px`,
          scrub: true,
          invalidateOnRefresh: true,
        };
        if (inner) {
          gsap.fromTo(
            inner,
            { scale: 1 },
            { scale: scaleTo, ease: 'none', scrollTrigger: { ...scrollTrigger } },
          );
        }
        if (shade) {
          gsap.fromTo(
            shade,
            { opacity: 0 },
            { opacity: shadeTo, ease: 'none', scrollTrigger: { ...scrollTrigger } },
          );
        }
      });
    },
    [top, scaleTo, shadeTo],
    { media: PIN_QUERY },
  );
  return (
    <div
      ref={ref}
      className={cx('flex flex-col', className)}
      style={{ ...style, '--stack-top': `${top}px` } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}

interface StackCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** This card's sticky offset in px, when cards stop at staggered heights. */
  offset?: number;
  /** Classes for the inner panel that scales (background, radius, padding). */
  innerClassName?: string;
}

/** One card inside `StackCards`. */
export function StackCard({
  className,
  innerClassName,
  offset,
  style,
  children,
  ...rest
}: StackCardProps) {
  const vars =
    offset === undefined ? style : ({ ...style, '--stack-top': `${offset}px` } as CSSProperties);
  return (
    <div className={cx('stack-card top-[var(--stack-top)]', className)} style={vars} {...rest}>
      <div className={cx('stack-inner', innerClassName)}>
        {children}
        <div className="stack-shade" aria-hidden="true" />
      </div>
    </div>
  );
}
