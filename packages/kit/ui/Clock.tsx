'use client';

import { useEffect, useState } from 'react';

import { formatClock, zoneAbbreviation } from '../lib/clock';

/**
 * The current time, refreshed at the start of every minute. `null` on the
 * server and on the first client render, so markup always hydrates cleanly.
 */
function useMinuteNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    let timer = 0;
    const tick = () => {
      const d = new Date();
      setNow(d);
      timer = window.setTimeout(tick, (60 - d.getSeconds()) * 1000 - d.getMilliseconds() + 50);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);
  return now;
}

interface LiveClockProps {
  timeZone: string;
  className?: string;
}

/** Local time in a city, "HH:MM". Shows "--:--" until hydrated. */
export function LiveClock({ timeZone, className = 'tabular' }: LiveClockProps) {
  const now = useMinuteNow();
  return (
    <span className={className} data-clock="">
      {now ? formatClock(timeZone, now) : '--:--'}
    </span>
  );
}

interface ZoneNameProps {
  timeZone: string;
  /** Shown before hydration and if the runtime has no abbreviation. */
  fallback: string;
}

/** The zone's current abbreviation, e.g. "CET" or "CEST". */
export function ZoneName({ timeZone, fallback }: ZoneNameProps) {
  const now = useMinuteNow();
  return <span data-clock="">{now ? zoneAbbreviation(timeZone, fallback, now) : fallback}</span>;
}
