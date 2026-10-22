/** 24-hour "HH:MM" in a given IANA time zone. Returns "--:--" if the zone is unknown. */
export function formatClock(timeZone: string, at: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone,
    }).format(at);
  } catch {
    return '--:--';
  }
}

/** Short zone name such as "CET" or "CEST". Falls back to `fallback`. */
export function zoneAbbreviation(
  timeZone: string,
  fallback: string,
  at: Date = new Date(),
): string {
  try {
    const part = new Intl.DateTimeFormat('en-GB', { timeZone, timeZoneName: 'short' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName');
    // Some runtimes return "GMT+2" instead of an abbreviation. Keep the fallback then.
    if (part && !part.value.startsWith('GMT')) return part.value;
    return fallback;
  } catch {
    return fallback;
  }
}
