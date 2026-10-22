'use client';

import {
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cx } from '../lib/cx';
import { addTick } from './engine';
import { useReducedMotion } from './hooks';
import { useFinePointer } from './pointer';

interface HoverPreviewListProps extends HTMLAttributes<HTMLDivElement> {
  /** One preview per row. A row opts in with `data-preview={index}`. */
  previews: readonly ReactNode[];
  /** Classes for the floating card (size, radius, shadow). */
  previewClassName?: string;
  /** Offset of the card from the pointer, in px. */
  offset?: { x: number; y: number };
  children: ReactNode;
}

/**
 * A list whose rows show a preview card that trails the pointer and tilts
 * with its speed (the Work index). Desktop with a fine pointer and full
 * motion only; the card is decorative, so the rows carry all the content.
 */
export function HoverPreviewList({
  previews,
  previewClassName,
  offset = { x: 24, y: -120 },
  className,
  children,
  onPointerOver,
  onPointerLeave,
  ...rest
}: HoverPreviewListProps) {
  const box = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduced;
  const [active, setActive] = useState<number | null>(null);
  // Keep the last card mounted while it fades out.
  const [shown, setShown] = useState(0);
  const pointer = useRef({ x: 0, y: 0 });
  const hovering = active !== null;

  // Runs once per hover of the list, so the card glides between rows.
  useEffect(() => {
    const el = box.current;
    if (!el || !enabled || !hovering) return;
    const pos = { x: pointer.current.x + offset.x, y: pointer.current.y + offset.y, r: 0 };
    let lastX = pointer.current.x;
    const onMove = (e: globalThis.PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    const stop = addTick((dt) => {
      const { x, y } = pointer.current;
      const k = 1 - Math.pow(1 - 0.16, dt);
      const kr = 1 - Math.pow(1 - 0.12, dt);
      pos.x += (x + offset.x - pos.x) * k;
      pos.y += (y + offset.y - pos.y) * k;
      const tilt = Math.max(-12, Math.min(12, ((x - lastX) / dt) * 0.6));
      lastX = x;
      pos.r += (tilt - pos.r) * kr;
      el.style.transform = `translate3d(${pos.x.toFixed(1)}px,${pos.y.toFixed(1)}px,0) rotate(${pos.r.toFixed(2)}deg)`;
    });
    return () => {
      stop();
      document.removeEventListener('pointermove', onMove);
    };
  }, [enabled, hovering, offset.x, offset.y]);

  const over = (e: PointerEvent<HTMLDivElement>) => {
    onPointerOver?.(e);
    if (!enabled || !(e.target instanceof Element)) return;
    const row = e.target.closest('[data-preview]');
    if (!row || !e.currentTarget.contains(row)) return;
    const i = Number(row.getAttribute('data-preview'));
    if (Number.isNaN(i)) return;
    pointer.current = { x: e.clientX, y: e.clientY };
    setActive(i);
    setShown(i);
  };

  return (
    <div
      className={className}
      onPointerOver={over}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setActive(null);
      }}
      {...rest}
    >
      {children}
      <div
        ref={box}
        className={cx('hover-preview', previewClassName)}
        data-on={hovering ? '' : undefined}
        aria-hidden="true"
      >
        {enabled ? previews[shown] : null}
      </div>
    </div>
  );
}
