import { localDays, zoneName } from './slots';

const SLOTS = ['2026-10-22T09:00:00.000Z', '2026-10-22T15:30:00.000Z', '2026-10-23T09:00:00.000Z'];

describe('localDays', () => {
  it('groups slots by the visitor’s own date and time', () => {
    const days = localDays(SLOTS, 'Africa/Lagos');
    expect(days.map((d) => d.label)).toEqual(['Thu 22 Oct', 'Fri 23 Oct']);
    expect(days[0]?.slots.map((s) => s.time)).toEqual(['10:00', '16:30']);
  });

  it('moves a late slot to the next day for a visitor further east', () => {
    const days = localDays(SLOTS, 'Asia/Tokyo');
    expect(days.map((d) => d.label)).toEqual(['Thu 22 Oct', 'Fri 23 Oct']);
    expect(days[1]?.slots.map((s) => s.time)).toEqual(['00:30', '18:00']);
  });

  it('keeps only the first days', () => {
    expect(localDays(SLOTS, 'UTC', 1)).toHaveLength(1);
  });
});

describe('zoneName', () => {
  it('prefers a known name over a GMT offset', () => {
    expect(zoneName('Africa/Lagos', { 'Africa/Lagos': 'WAT' })).toBe('WAT');
    expect(zoneName('Not/AZone', {})).toBe('Not/AZone');
  });
});
