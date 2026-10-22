'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cx } from '../lib/cx';
import { addTick, subscribeScroll } from './engine';
import { useReducedMotion } from './hooks';
import { useFinePointer } from './pointer';
import { observeViewport } from './viewport';

interface FollowRegionProps extends HTMLAttributes<HTMLElement> {
  /** The element that trails the pointer (a link or button). */
  follower: ReactNode;
  /** Where the follower rests, in px from the top of the region. */
  restY?: number;
  /** Lerp factor per 60fps frame. */
  ease?: number;
  as?: 'section' | 'div';
  children?: ReactNode;
}

/**
 * A region where one element trails the pointer and rests in the centre when
 * the pointer leaves (Home closing pill). On touch screens and with reduced
 * motion the follower simply sits at its rest point.
 */
export function FollowRegion({
  follower,
  restY = 300,
  ease = 0.14,
  as: Tag = 'section',
  className,
  style,
  children,
  ...rest
}: FollowRegionProps) {
  const region = useRef<HTMLElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const el = region.current;
    const t = target.current;
    if (!el || !t || reduced || !fine) return;
    el.setAttribute('data-follow-ready', '');
    const pos = { x: el.clientWidth / 2 - t.offsetWidth / 2, y: restY - t.offsetHeight / 2 };
    const pointer = { x: 0, y: 0, inside: false };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    let stopTick: (() => void) | null = null;
    const frame = (dt: number) => {
      const w = t.offsetWidth;
      const h = t.offsetHeight;
      const tx = pointer.inside ? pointer.x - w / 2 : el.clientWidth / 2 - w / 2;
      const ty = pointer.inside ? pointer.y - h / 2 : restY - h / 2;
      const k = 1 - Math.pow(1 - ease, dt);
      pos.x += (tx - pos.x) * k;
      pos.y += (ty - pos.y) * k;
      t.style.transform = `translate3d(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px,0)`;
    };
    const stopObserve = observeViewport(el, (e) => {
      if (e.isIntersecting) stopTick ??= addTick(frame);
      else {
        stopTick?.();
        stopTick = null;
      }
    });
    return () => {
      stopTick?.();
      stopObserve();
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeAttribute('data-follow-ready');
      t.style.transform = '';
    };
  }, [reduced, fine, restY, ease]);

  return (
    <Tag
      ref={region as RefObject<HTMLDivElement>}
      className={cx('relative', className)}
      style={{ ...style, '--follow-rest-y': `${restY}px` } as CSSProperties}
      {...rest}
    >
      {children}
      <div ref={target} className="follow-target z-[5]">
        {follower}
      </div>
    </Tag>
  );
}

interface CursorLabelProps {
  className?: string;
}

/**
 * A glass disc that follows the pointer and shows the `data-cursor` text of
 * whatever is under it (the "View case" label on case cards). Mount once.
 * Fine pointers and full motion only.
 */
export function CursorLabel({ className }: CursorLabelProps) {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const node = el.current;
    if (!node || reduced || !fine) return;
    const size = node.offsetWidth || 116;
    const pointer = { x: -999, y: -999 };
    const pos = { x: -999, y: -999 };
    let current: string | null = null;
    let stopTick: (() => void) | null = null;
    const update = (target: Element | null) => {
      const hit = target?.closest('[data-cursor]') ?? null;
      const next = hit?.getAttribute('data-cursor') ?? null;
      if (next !== current) {
        current = next;
        setLabel(next);
        if (next) {
          if (pos.x < -500) Object.assign(pos, pointer);
          stopTick ??= addTick((dt) => {
            const k = 1 - Math.pow(1 - 0.2, dt);
            pos.x += (pointer.x - pos.x) * k;
            pos.y += (pointer.y - pos.y) * k;
            node.style.transform = `translate3d(${(pos.x - size / 2).toFixed(1)}px,${(pos.y - size / 2).toFixed(1)}px,0)`;
          });
        } else {
          stopTick?.();
          stopTick = null;
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      update(e.target instanceof Element ? e.target : null);
    };
    // Content moves under a still pointer while scrolling, so test again.
    const stopScroll = subscribeScroll(() => {
      if (pointer.x > -500) update(document.elementFromPoint(pointer.x, pointer.y));
    });
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      stopScroll();
      document.removeEventListener('pointermove', onMove);
      stopTick?.();
      setLabel(null);
    };
  }, [reduced, fine]);

  return (
    <div
      ref={el}
      className={cx('cursor-label', className)}
      data-on={label ? '' : undefined}
      aria-hidden="true"
    >
      <span className="type-label" style={{ fontSize: 11 }}>
        {label}
      </span>
    </div>
  );
}
