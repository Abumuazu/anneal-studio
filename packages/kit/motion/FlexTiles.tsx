'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const TilesContext = createContext<{ active: number; setActive: (i: number) => void } | null>(null);

interface FlexTilesProps extends HTMLAttributes<HTMLDivElement> {
  defaultActive?: number;
  children: ReactNode;
}

/**
 * A row of tiles where the active one widens (Home ventures). Hover or
 * keyboard focus inside a tile makes it active. On small screens the row
 * stacks and every tile keeps its height.
 */
export function FlexTiles({ defaultActive = 0, children, ...rest }: FlexTilesProps) {
  const [active, setActive] = useState(defaultActive);
  return (
    <TilesContext.Provider value={{ active, setActive }}>
      <div {...rest}>{children}</div>
    </TilesContext.Provider>
  );
}

interface FlexTileProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  children: ReactNode;
}

/**
 * A tile in `FlexTiles`, with `data-active` while it is the wide one. The tile
 * is not interactive itself: it listens for the pointer and for focus moving
 * onto a link or button inside it.
 */
export function FlexTile({ index, children, ...rest }: FlexTileProps) {
  const ctx = useContext(TilesContext);
  const ref = useRef<HTMLDivElement>(null);
  const on = ctx?.active === index;
  const setActive = ctx?.setActive;

  useEffect(() => {
    const el = ref.current;
    if (!el || !setActive) return;
    const activate = () => setActive(index);
    el.addEventListener('pointerenter', activate);
    el.addEventListener('focusin', activate);
    return () => {
      el.removeEventListener('pointerenter', activate);
      el.removeEventListener('focusin', activate);
    };
  }, [index, setActive]);

  return (
    <div ref={ref} data-active={on ? 'true' : 'false'} {...rest}>
      {children}
    </div>
  );
}
