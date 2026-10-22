import { formatClock, zoneAbbreviation } from './clock';

describe('formatClock', () => {
  const at = new Date('2026-10-20T12:05:00Z');

  it('formats 24-hour time in the given zone', () => {
    expect(formatClock('Africa/Lagos', at)).toBe('13:05');
    expect(formatClock('Europe/Madrid', at)).toBe('14:05');
  });

  it('falls back for an unknown zone', () => {
    expect(formatClock('Mars/Olympus', at)).toBe('--:--');
  });
});

describe('zoneAbbreviation', () => {
  it('returns an abbreviation or the fallback, never a GMT offset', () => {
    const winter = zoneAbbreviation('Europe/Madrid', 'CET', new Date('2026-01-15T12:00:00Z'));
    expect(winter.startsWith('GMT')).toBe(false);
    expect(['CET', 'CEST']).toContain(winter);
  });

  it('uses the fallback for an unknown zone', () => {
    expect(zoneAbbreviation('Mars/Olympus', 'CET')).toBe('CET');
  });
});
