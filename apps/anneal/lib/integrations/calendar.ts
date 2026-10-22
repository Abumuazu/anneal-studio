import 'server-only';

import { isMemory, outbox } from './memory';

/** One day with its open start times (ISO, UTC). `date` is the studio's local date. */
export interface SlotDay {
  date: string;
  slots: string[];
}

export interface Booking {
  start: string;
  email: string;
  name: string;
  timeZone: string;
}

export interface Calendar {
  /** Open slots from `from` (exclusive of today) for the next `days` calendar days. */
  slots(from: Date, days: number): Promise<SlotDay[]>;
  book(booking: Booking): Promise<{ start: string }>;
}

/** The studio's zone. WAT is UTC+1 all year (no daylight saving). */
const STUDIO_OFFSET_H = 1;
/** Call times in the studio's zone (StartV6). */
const TIMES = ['10:00', '11:30', '14:00', '16:30'] as const;

/** The studio's local calendar date for an instant, as "YYYY-MM-DD". */
export function studioDate(at: Date): string {
  return new Date(at.getTime() + STUDIO_OFFSET_H * 3_600_000).toISOString().slice(0, 10);
}

/** The next `count` weekdays after `from` (studio dates), as "YYYY-MM-DD". */
export function nextWeekdays(from: Date, count: number): string[] {
  const out: string[] = [];
  const [y, m, d] = studioDate(from).split('-').map(Number) as [number, number, number];
  for (let i = 1; out.length < count && i < count * 3; i++) {
    const day = new Date(Date.UTC(y, m - 1, d + i));
    const wd = day.getUTCDay();
    if (wd !== 0 && wd !== 6) out.push(day.toISOString().slice(0, 10));
  }
  return out;
}

/** The board's four call times on a studio date, as UTC instants. */
export function studioSlots(date: string): string[] {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number];
  return TIMES.map((t) => {
    const [h, min] = t.split(':').map(Number) as [number, number];
    return new Date(Date.UTC(y, m - 1, d, h - STUDIO_OFFSET_H, min)).toISOString();
  });
}

/** Every weekday has the four board times; a booked time disappears. */
const memoryCalendar: Calendar = {
  slots(from, days) {
    const taken = new Set(outbox().bookings.map((b) => b.start));
    return Promise.resolve(
      nextWeekdays(from, days).map((date) => ({
        date,
        slots: studioSlots(date).filter((s) => !taken.has(s)),
      })),
    );
  },
  book(b) {
    const open = studioSlots(studioDate(new Date(b.start)));
    const taken = outbox().bookings.some((x) => x.start === b.start);
    if (!open.includes(b.start) || taken) return Promise.reject(new Error('Slot not available'));
    outbox().bookings.push({ start: b.start, email: b.email, timeZone: b.timeZone });
    return Promise.resolve({ start: b.start });
  },
};

const CAL = 'https://api.cal.com/v2';

/** Cal.com API v2: GET /slots and POST /bookings for one event type. */
export function calCom(
  apiKey: string,
  eventTypeId: number,
  fetcher: typeof fetch = fetch,
): Calendar {
  const headers = (version: string) => ({
    Authorization: `Bearer ${apiKey}`,
    'cal-api-version': version,
    'Content-Type': 'application/json',
  });
  return {
    async slots(from, days) {
      const dates = nextWeekdays(from, days);
      const first = dates[0];
      const last = dates[dates.length - 1];
      if (!first || !last) return [];
      const url = new URL(`${CAL}/slots`);
      url.search = new URLSearchParams({
        eventTypeId: String(eventTypeId),
        start: first,
        end: last,
        timeZone: 'Africa/Lagos',
      }).toString();
      const res = await fetcher(url, { headers: headers('2024-09-04'), cache: 'no-store' });
      if (!res.ok) throw new Error(`Cal.com slots: ${String(res.status)}`);
      const body = (await res.json()) as { data?: Record<string, { start: string }[]> };
      return dates.map((date) => ({
        date,
        slots: (body.data?.[date] ?? []).map((s) => new Date(s.start).toISOString()),
      }));
    },
    async book(b) {
      const res = await fetcher(`${CAL}/bookings`, {
        method: 'POST',
        headers: headers('2024-08-13'),
        body: JSON.stringify({
          start: b.start,
          eventTypeId,
          attendee: { name: b.name, email: b.email, timeZone: b.timeZone, language: 'en' },
        }),
      });
      if (!res.ok) throw new Error(`Cal.com booking: ${String(res.status)}`);
      const body = (await res.json()) as { data?: { start?: string } };
      return { start: body.data?.start ?? b.start };
    },
  };
}

/** The configured calendar, or null when booking is not set up (the card then reports failure). */
export function calendar(): Calendar | null {
  if (isMemory()) return memoryCalendar;
  const key = process.env.CAL_API_KEY;
  const id = Number(process.env.CAL_EVENT_TYPE_ID);
  if (key && Number.isInteger(id) && id > 0) return calCom(key, id);
  return null;
}
