'use client';

import { useEffect, useState } from 'react';

export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/** True on devices with a precise, hovering pointer (a mouse or trackpad). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return fine;
}
