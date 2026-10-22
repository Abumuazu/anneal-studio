'use client';

import { type RefObject, useEffect, useRef } from 'react';

/**
 * One IntersectionObserver per rootMargin, shared by every element that uses
 * that margin. Callbacks receive the latest entry for their element.
 */
type Callback = (entry: IntersectionObserverEntry) => void;

const observers = new Map<string, { io: IntersectionObserver; cbs: Map<Element, Callback> }>();

export function observeViewport(el: Element, cb: Callback, rootMargin = '0px'): () => void {
  let group = observers.get(rootMargin);
  if (!group) {
    const cbs = new Map<Element, Callback>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) cbs.get(e.target)?.(e);
      },
      { rootMargin },
    );
    group = { io, cbs };
    observers.set(rootMargin, group);
  }
  const g = group;
  g.cbs.set(el, cb);
  g.io.observe(el);
  return () => {
    g.io.unobserve(el);
    g.cbs.delete(el);
  };
}

/**
 * Calls `onChange(true|false)` as the element enters or leaves the viewport
 * (expanded by `rootMargin`). Used to pause anything off screen.
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  onChange: (visible: boolean) => void,
  rootMargin = '0px',
): void {
  const latest = useRef(onChange);
  useEffect(() => {
    latest.current = onChange;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeViewport(el, (e) => latest.current(e.isIntersecting), rootMargin);
  }, [ref, rootMargin]);
}
