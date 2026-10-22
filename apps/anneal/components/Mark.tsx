import { Pausable } from '@studio/kit/motion';
import { type CSSProperties } from 'react';

interface MarkProps {
  /** Size in px (the mark is 1em square). */
  size: number;
  /** Cycle the cell shapes. Paused while off screen. */
  live?: boolean;
  /** Full cycle length in seconds. Header 6.4s, overlay 3.2s on the boards. */
  cycle?: number;
  className?: string;
  style?: CSSProperties;
}

/** Anneal's four-cell mark. Decorative: pair it with a text label. */
export function Mark({ size, live = false, cycle = 6.4, className, style }: MarkProps) {
  const mark = (
    <span
      className={['mark', className].filter(Boolean).join(' ')}
      data-live={live ? '' : undefined}
      aria-hidden="true"
      style={{ ...style, fontSize: size, '--mark-cycle': `${cycle}s` } as CSSProperties}
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
  return live ? <Pausable className="inline-flex">{mark}</Pausable> : mark;
}
