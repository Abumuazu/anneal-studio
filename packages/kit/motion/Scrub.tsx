'use client';

import { type HTMLAttributes, type ReactNode, useRef } from 'react';

import { DESKTOP_QUERY, gsap } from './engine';
import { useMotionEffect } from './hooks';

interface ScrubProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface ParallaxProps extends ScrubProps {
  /** Total vertical travel in px (the boards' `data-par`). Negative reverses it. */
  distance?: number;
  /** Rotation in degrees. In "through" mode it is constant; in "enter" mode it settles to 0. */
  rotate?: number;
  /**
   * "through": moves from +distance/2 to -distance/2 while the parent crosses
   * the viewport (inner pages). "enter": starts offset by `distance` and settles
   * to 0 as the parent's top reaches the top of the viewport (Home case phones,
   * pricing staircase).
   */
  mode?: 'through' | 'enter';
  /** "enter" mode only: starting opacity, settling to 1 (Home ventures). */
  fromOpacity?: number;
}

/** Desktop-only scroll parallax. Static with reduced motion and on small screens. */
export function Parallax({
  distance = 80,
  rotate = 0,
  mode = 'through',
  fromOpacity,
  children,
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(
    ref,
    (el) => {
      const parent = el.parentElement ?? el;
      if (mode === 'through') {
        gsap.fromTo(
          el,
          { y: distance / 2, rotate },
          {
            y: -distance / 2,
            rotate,
            ease: 'none',
            scrollTrigger: { trigger: parent, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      } else {
        const fade = fromOpacity === undefined ? {} : { opacity: fromOpacity };
        const unfade = fromOpacity === undefined ? {} : { opacity: 1 };
        gsap.fromTo(
          el,
          { y: distance, rotate, ...fade },
          {
            y: 0,
            rotate: 0,
            ...unfade,
            ease: 'none',
            scrollTrigger: { trigger: parent, start: 'top bottom', end: 'top top', scrub: true },
          },
        );
      }
    },
    [distance, rotate, mode, fromOpacity],
    { media: DESKTOP_QUERY },
  );
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

interface ClipInProps extends ScrubProps {
  /** Horizontal inset and corner radius at the start, in px. */
  inset?: number;
}

/** A section that opens from an inset, rounded clip to full width as it enters. */
export function ClipIn({ inset = 40, children, ...rest }: ClipInProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(
    ref,
    (el) => {
      gsap.fromTo(
        el,
        { clipPath: `inset(0px ${inset}px 0px ${inset}px round ${inset}px)` },
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 15%', scrub: true },
        },
      );
    },
    [inset],
    { media: DESKTOP_QUERY },
  );
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

interface ZoomProps extends ScrubProps {
  /** Starting scale. Settles to 1 as the parent's top nears the top of the viewport. */
  from?: number;
}

/** Content that eases from a slight zoom to 1 as its parent enters. */
export function Zoom({ from = 1.14, children, ...rest }: ZoomProps) {
  const ref = useRef<HTMLDivElement>(null);
  useMotionEffect(
    ref,
    (el) => {
      gsap.fromTo(
        el,
        { scale: from },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'top 10%',
            scrub: true,
          },
        },
      );
    },
    [from],
    { media: DESKTOP_QUERY },
  );
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
