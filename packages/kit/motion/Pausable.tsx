'use client';

import { type CSSProperties, type HTMLAttributes, type ReactNode, useRef } from 'react';

import { cx } from '../lib/cx';
import { useInViewport } from './viewport';

interface PausableProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

/** Pauses every CSS animation inside it while it is off screen. */
export function Pausable({ children, ...rest }: PausableProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useInViewport(ref, (visible) => {
    if (visible) ref.current?.removeAttribute('data-paused');
    else ref.current?.setAttribute('data-paused', '');
  });
  return (
    <span ref={ref} {...rest}>
      {children}
    </span>
  );
}

interface MorphTileProps {
  /** Glyph ids from the sprite, shown in turn. Up to four. */
  glyphs: readonly string[];
  /** Offsets the cycle by 0.8s per step so neighbouring tiles fall out of sync. */
  phase?: number;
  background: string;
  color: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A tile that cycles square, circle, rounded and leaf corners while its glyph
 * changes (hero headline tiles). Shows the first glyph, square, when still.
 */
export function MorphTile({
  glyphs,
  phase = 0,
  background,
  color,
  className,
  style,
}: MorphTileProps) {
  const base = phase * 0.8;
  return (
    <Pausable
      className={cx('morph-tile', className)}
      style={{ ...style, background, color, '--tile-delay': `-${base}s` } as CSSProperties}
      aria-hidden="true"
    >
      {glyphs.slice(0, 4).map((g, i) => (
        <svg
          key={g + String(i)}
          className={glyphs.length > 1 ? 'morph-glyph' : 'morph-glyph morph-glyph-solo'}
          viewBox="0 0 48 48"
          style={
            { '--glyph-delay': `-${(((4 - i) % 4) * 2.4 + base).toFixed(1)}s` } as CSSProperties
          }
        >
          <use href={`#${g}`} />
        </svg>
      ))}
    </Pausable>
  );
}
