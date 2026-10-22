'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useId,
  useState,
} from 'react';

import { cx } from '../lib/cx';

interface GroupState {
  open: number | null;
  setOpen: (i: number | null) => void;
  hoverOpens: boolean;
  baseId: string;
}

const GroupContext = createContext<GroupState | null>(null);
const ItemContext = createContext<{ index: number; open: boolean } | null>(null);

function useGroup(): GroupState {
  const g = useContext(GroupContext);
  if (!g) throw new Error('Expand parts must sit inside <ExpandGroup>.');
  return g;
}

function useItem(): { index: number; open: boolean } {
  const i = useContext(ItemContext);
  if (!i) throw new Error('ExpandTrigger and ExpandPanel must sit inside <ExpandItem>.');
  return i;
}

interface ExpandGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Index open on first render, or null for none. */
  defaultOpen?: number | null;
  /** Opening on pointer hover, as on the Home "Four things we build" blocks. */
  hoverOpens?: boolean;
  children: ReactNode;
}

/**
 * A set of expandable items where at most one is open. Triggers are real
 * buttons with aria-expanded; panels animate their height with CSS grid rows.
 */
export function ExpandGroup({
  defaultOpen = 0,
  hoverOpens = false,
  children,
  ...rest
}: ExpandGroupProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  return (
    <GroupContext.Provider value={{ open, setOpen, hoverOpens, baseId }}>
      <div {...rest}>{children}</div>
    </GroupContext.Provider>
  );
}

interface ExpandItemProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  children: ReactNode;
}

/** One item. Carries `data-open` so styles can react to it. */
export function ExpandItem({ index, onPointerEnter, children, ...rest }: ExpandItemProps) {
  const g = useGroup();
  const open = g.open === index;
  return (
    <ItemContext.Provider value={{ index, open }}>
      <div
        data-open={open ? 'true' : 'false'}
        onPointerEnter={(e) => {
          onPointerEnter?.(e);
          if (g.hoverOpens && e.pointerType === 'mouse' && !open) g.setOpen(index);
        }}
        {...rest}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

interface TriggerProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: ReactNode;
}

/** Toggles its item. */
export function ExpandTrigger({ className, children, ...rest }: TriggerProps) {
  const g = useGroup();
  const item = useItem();
  return (
    <button
      type="button"
      aria-expanded={item.open}
      aria-controls={`${g.baseId}-panel-${item.index}`}
      onClick={() => g.setOpen(item.open ? null : item.index)}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Collapsible content. Hidden from assistive tech and the tab order while closed. */
export function ExpandPanel({ className, children, ...rest }: PanelProps) {
  const g = useGroup();
  const item = useItem();
  return (
    <div
      id={`${g.baseId}-panel-${item.index}`}
      className="expand-panel"
      data-open={item.open ? 'true' : 'false'}
      inert={!item.open}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cx('expand-content', className)} {...rest}>
          {children}
        </div>
      </div>
    </div>
  );
}
