'use client';

import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
} from 'react';

import { cx } from '../lib/cx';
import { addTick } from './engine';
import { useReducedMotion } from './hooks';
import { type Body, type Drag, createBodies, isAtRest, layoutRest, step, toss } from './physics';
import { observeViewport } from './viewport';

export interface TileDef {
  /** Size in px. */
  size: number;
  /** CSS border-radius, e.g. "0", "50%", "26%", "50% 0 50% 0". */
  radius: string;
  background: string;
  color: string;
  /** Glyph id from the sprite. */
  glyph: string;
}

interface PhysicsTilesProps {
  tiles: readonly TileDef[];
  /** Accessible name for the playground. Enter or Space throws the tiles. */
  label: string;
  height?: number;
  className?: string;
}

const STEP_MS = 1000 / 60;

/**
 * Tiles you can grab and throw (footer). The simulation only runs while the
 * playground is on screen and sleeps once everything settles. With reduced
 * motion the tiles rest on the floor without gravity but can still be dragged.
 * Keyboard users focus the playground and press Enter or Space to throw them.
 */
export function PhysicsTiles({ tiles, label, height = 380, className }: PhysicsTilesProps) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const api = useRef<{ grab: (i: number, x: number, y: number) => void; toss: () => void } | null>(
    null,
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = box.current;
    const tileEls = els.current;
    if (!el) return;
    let bodies: Body[] | null = null;
    let drag: Drag | null = null;
    let stopTick: (() => void) | null = null;
    let visible = false;
    let acc = 0;
    const size = () => ({ width: el.clientWidth, height: el.clientHeight });

    const paint = () => {
      if (!bodies) return;
      bodies.forEach((b, i) => {
        const t = tileEls[i];
        if (t) {
          t.style.transform = `translate3d(${(b.x - b.s / 2).toFixed(1)}px,${(b.y - b.s / 2).toFixed(1)}px,0) rotate(${b.a.toFixed(1)}deg)`;
        }
      });
    };

    const frame = (dt: number) => {
      if (!bodies) return;
      const { width, height: h } = size();
      acc += dt * STEP_MS;
      let n = 0;
      while (acc >= STEP_MS && n < 4) {
        step(bodies, { width, height: h, gravity: !reduced, drag });
        acc -= STEP_MS;
        n++;
      }
      if (n === 4) acc = 0;
      paint();
      if (!drag && isAtRest(bodies, h)) sleep();
    };

    const wake = () => {
      if (visible) stopTick ??= addTick(frame);
    };
    const sleep = () => {
      stopTick?.();
      stopTick = null;
    };

    const init = () => {
      if (bodies) return;
      const { width, height: h } = size();
      bodies = createBodies(
        tiles.map((t) => t.size),
        width,
      );
      if (reduced) layoutRest(bodies, width, h);
      el.setAttribute('data-ready', '');
      paint();
      wake();
    };

    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const r = el.getBoundingClientRect();
      drag.x = e.clientX - r.left;
      drag.y = e.clientY - r.top;
    };
    const onUp = () => {
      drag = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    api.current = {
      grab: (i, x, y) => {
        init();
        const r = el.getBoundingClientRect();
        drag = { index: i, x: x - r.left, y: y - r.top };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        wake();
      },
      toss: () => {
        init();
        if (!bodies) return;
        if (reduced) {
          // No gravity: shuffle their order along the floor instead. Shuffle a
          // copy so body i still maps to tile element i.
          const { width, height: h } = size();
          const order = [...bodies];
          for (let i = order.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const a = order[i];
            const b = order[j];
            if (a && b) [order[i], order[j]] = [b, a];
          }
          layoutRest(order, width, h);
          paint();
          return;
        }
        toss(bodies);
        wake();
      },
    };

    // Start the drop just before the playground scrolls into view.
    const stopObserve = observeViewport(
      el,
      (e) => {
        visible = e.isIntersecting;
        if (visible) {
          init();
          wake();
        } else sleep();
      },
      '0px 0px 15% 0px',
    );

    const ro = new ResizeObserver(() => {
      if (!bodies) return;
      const { width, height: h } = size();
      for (const b of bodies) {
        b.x = Math.min(Math.max(b.r, b.x), width - b.r);
        b.y = Math.min(b.y, h - b.r);
      }
      paint();
      wake();
    });
    ro.observe(el);

    return () => {
      sleep();
      stopObserve();
      ro.disconnect();
      onUp();
      api.current = null;
      el.removeAttribute('data-ready');
      tileEls.forEach((t) => t?.style.removeProperty('transform'));
    };
  }, [tiles, reduced]);

  const onPointerDown = (i: number) => (e: ReactPointerEvent) => {
    e.preventDefault();
    api.current?.grab(i, e.clientX, e.clientY);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      api.current?.toss();
    }
  };

  return (
    <div
      ref={box}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cx('phys', className)}
      style={{ height }}
    >
      {tiles.map((t, i) => (
        <span
          key={i}
          ref={(node) => {
            els.current[i] = node;
          }}
          className="phys-tile"
          onPointerDown={onPointerDown(i)}
          aria-hidden="true"
          style={{
            width: t.size,
            height: t.size,
            borderRadius: t.radius,
            background: t.background,
            color: t.color,
          }}
        >
          <svg viewBox="0 0 48 48" className="pointer-events-none h-[54%] w-[54%]">
            <use href={`#${t.glyph}`} />
          </svg>
        </span>
      ))}
    </div>
  );
}
