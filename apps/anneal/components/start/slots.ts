/** A bookable day in the visitor's own time zone. */
export interface LocalDay {
  key: string;
  /** "Thu" and "23", for the day tile. */
  weekday: string;
  day: string;
  /** "Thu 23 Oct", for the confirm button and the booked state. */
  label: string;
  slots: { start: string; time: string }[];
}

const part = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) =>
  parts.find((p) => p.type === type)?.value ?? '';

/**
 * Groups open slots (UTC instants) by the visitor's local date, so a visitor
 * in another zone sees their own day and time. Keeps the first `limit` days.
 */
export function localDays(starts: readonly string[], timeZone: string, limit = 10): LocalDay[] {
  const dateFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const timeFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const days = new Map<string, LocalDay>();
  for (const start of [...starts].sort()) {
    const at = new Date(start);
    const p = dateFmt.formatToParts(at);
    const key = `${part(p, 'year')}-${part(p, 'month')}-${part(p, 'day').padStart(2, '0')}`;
    let day = days.get(key);
    if (!day) {
      if (days.size >= limit) break;
      day = {
        key,
        weekday: part(p, 'weekday'),
        day: part(p, 'day'),
        label: `${part(p, 'weekday')} ${part(p, 'day')} ${part(p, 'month')}`,
        slots: [],
      };
      days.set(key, day);
    }
    day.slots.push({ start, time: timeFmt.format(at) });
  }
  return [...days.values()];
}

/**
 * The visitor's zone for "Times shown in ...": an abbreviation where the
 * runtime has one, else a name from `known` (runtimes often print "GMT+1" for
 * Lagos), else "GMT+9" style.
 */
export function zoneName(
  timeZone: string,
  known: Readonly<Record<string, string>> = {},
  at = new Date(),
): string {
  try {
    const p = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' }).formatToParts(
      at,
    );
    const name = part(p, 'timeZoneName');
    if (name.startsWith('GMT') && known[timeZone]) return known[timeZone];
    return name || timeZone;
  } catch {
    return known[timeZone] ?? timeZone;
  }
}
