'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { cx } from '../lib/cx';

/** Shows every item. Any other value shows the items in that group. */
export const FILTER_ALL = 'all';

interface FilterValue {
  current: string;
  set: (id: string) => void;
}

const FilterContext = createContext<FilterValue>({ current: FILTER_ALL, set: () => undefined });

/** Shares the chosen filter between `FilterChips` and the `FilterItem`s it controls. */
export function FilterGroup({
  initial = FILTER_ALL,
  children,
}: {
  initial?: string;
  children: ReactNode;
}) {
  const [current, set] = useState(initial);
  const value = useMemo(() => ({ current, set }), [current]);
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export interface FilterOption {
  id: string;
  label: string;
  /** Shown after the label, e.g. "06". */
  count?: string;
}

interface FilterChipsProps {
  options: readonly FilterOption[];
  /** Accessible name for the group of chips, or the id of a visible heading that names it. */
  label?: string;
  labelledBy?: string;
  className?: string;
  /** Colours for the chosen chip and the others. */
  on?: { bg: string; fg: string };
  off?: { bg: string; fg: string };
}

/** Toggle buttons that pick which `FilterItem`s show. */
export function FilterChips({ options, label, labelledBy, className, on, off }: FilterChipsProps) {
  const { current, set } = useContext(FilterContext);
  return (
    <div
      role="group"
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cx('flex flex-wrap gap-2', className)}
    >
      {options.map((o) => {
        const pressed = o.id === current;
        const colors = pressed ? on : off;
        return (
          <button
            key={o.id}
            type="button"
            className="chip"
            aria-pressed={pressed}
            onClick={() => set(o.id)}
            style={{ '--chip-bg': colors?.bg, '--chip-fg': colors?.fg } as CSSProperties}
          >
            {o.label}
            {o.count ? <span className="chip-count">{o.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

interface FilterItemProps extends HTMLAttributes<HTMLDivElement> {
  group: string;
  children: ReactNode;
}

/** Hidden unless the current filter is "all" or its own group. */
export function FilterItem({ group, children, ...rest }: FilterItemProps) {
  const { current } = useContext(FilterContext);
  const visible = current === FILTER_ALL || current === group;
  return (
    <div hidden={!visible} {...rest}>
      {children}
    </div>
  );
}
