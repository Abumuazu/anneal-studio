'use client';

import { cx } from '../lib/cx';
import { useReducedMotion } from '../motion/hooks';
import { setMotionOverride } from '../motion/preference';

interface MotionToggleProps {
  /** Visible label, e.g. "Reduced motion". */
  label: string;
  className?: string;
}

/**
 * A switch that forces reduced motion on or off for this browser session,
 * overriding the OS setting. Every primitive listens and swaps paths live.
 */
export function MotionToggle({ label, className }: MotionToggleProps) {
  const reduced = useReducedMotion();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={reduced}
      onClick={() => setMotionOverride(reduced ? 'full' : 'reduce')}
      className={cx(
        'inline-flex items-center gap-3 rounded-full bg-panel py-2 pl-2 pr-4 type-label text-ink',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'relative inline-block h-6 w-10 rounded-full transition-colors duration-300',
          reduced ? 'bg-ink' : 'bg-grey-200',
        )}
      >
        <span
          className={cx(
            'absolute top-1 left-1 h-4 w-4 rounded-full bg-panel transition-transform duration-300',
            reduced && 'translate-x-4',
          )}
        />
      </span>
      {label}
    </button>
  );
}
