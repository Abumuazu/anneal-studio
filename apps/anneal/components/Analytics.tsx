'use client';

import { track } from '@studio/kit/lib';
import { CAPTURE_EVENT, CURRENCY_EVENT } from '@studio/kit/ui';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { captureAttribution } from './start/attribution';

/**
 * Site-wide analytics events (build-handoff, section 4), from one place:
 * - clicks on a link or button inside `[data-event]`, with `data-event-*` as props
 * - `currency_changed` and `waitlist_joined` from the kit's DOM events
 * - `case_opened` on every case page view
 * It also keeps the landing link's campaign tags for the brief form.
 * The brief and booking events fire from their own components.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const control = e.target.closest('a, button');
      const host = control?.closest<HTMLElement>('[data-event]');
      if (!host?.dataset.event) return;
      const props = Object.fromEntries(
        Object.entries(host.dataset)
          .filter(([k, v]) => k.startsWith('event') && k !== 'event' && v !== undefined)
          .map(([k, v]) => [k.slice(5).toLowerCase(), v ?? '']),
      );
      track(host.dataset.event, props);
    };
    const onCurrency = (e: Event) => {
      if (e instanceof CustomEvent && typeof e.detail === 'string') {
        track('currency_changed', { currency: e.detail });
      }
    };
    const onCapture = (e: Event) => {
      const source: unknown =
        e instanceof CustomEvent ? (e.detail as { source?: unknown }).source : '';
      track('waitlist_joined', { source: typeof source === 'string' ? source : '' });
    };
    document.addEventListener('click', onClick);
    window.addEventListener(CURRENCY_EVENT, onCurrency);
    window.addEventListener(CAPTURE_EVENT, onCapture);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener(CURRENCY_EVENT, onCurrency);
      window.removeEventListener(CAPTURE_EVENT, onCapture);
    };
  }, []);

  useEffect(() => {
    const m = /^\/work\/([^/]+)$/.exec(pathname);
    if (m?.[1]) track('case_opened', { case: m[1] });
  }, [pathname]);

  return null;
}
