'use client';

import { useEffect, useState } from 'react';

import { cx } from '../lib/cx';
import { subscribeScroll } from '../motion/engine';

export interface SpyItem {
  /** Id of the section the link points to. */
  id: string;
  label: string;
}

interface ScrollSpyNavProps {
  items: readonly SpyItem[];
  /** Accessible name for the nav and its visible heading, e.g. "On this page". */
  label: string;
  className?: string;
}

/**
 * A table of contents that marks the section in view (Privacy). The current
 * link gets aria-current="location"; the last section whose top has passed
 * 40% of the viewport counts as current.
 */
export function ScrollSpyNav({ items, label, className }: ScrollSpyNavProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.4;
      let next = 0;
      items.forEach((item, i) => {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top < line) next = i;
      });
      setActive(next);
    };
    update();
    return subscribeScroll(update);
  }, [items]);

  return (
    <nav aria-label={label} className={cx('flex flex-col gap-1', className)}>
      <div className="type-label mb-3.5 ml-[18px] text-grey-600" aria-hidden="true">
        {label}
      </div>
      {items.map((item, i) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={i === active ? 'location' : undefined}
          className="spy-link"
        >
          <span className="type-label">{String(i + 1).padStart(2, '0')}</span>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
