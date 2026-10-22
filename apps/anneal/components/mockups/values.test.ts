import { exchangeValues, rateHold, recordingTime, replyCountdown, wispFlow } from './values';

describe('mockup values', () => {
  it('starts the exchange at the board figures', () => {
    const v = exchangeValues(0);
    expect(v.tipX).toBe('368');
    expect(v.pfMain.startsWith('₦18,4')).toBe(true);
    expect(v.pfDec).toMatch(/^\d{2}$/);
    expect(v.sxNgn).toBe('₦352,000');
  });

  it('keeps the live tip inside the chart', () => {
    for (let t = 0; t < 500; t++) {
      const y = Number(exchangeValues(t).tipY);
      expect(y).toBeGreaterThanOrEqual(14);
      expect(y).toBeLessThanOrEqual(196);
    }
  });

  it('counts the rate hold down from 30 and wraps', () => {
    expect(rateHold(0)).toEqual({ lockS: '30', lockW: '100%' });
    expect(rateHold(30)).toEqual({ lockS: '00', lockW: '0%' });
    expect(rateHold(31).lockS).toBe('30');
  });

  it('formats the recording timer and the reply countdown', () => {
    expect(recordingTime(0)).toBe('18:39');
    expect(recordingTime(21)).toBe('19:00');
    expect(replyCountdown(0)).toBe('23h 39m 59s');
    expect(replyCountdown(1)).toBe('23h 39m 58s');
  });

  it('shows exactly one Wisp flow layer per stage', () => {
    const layers = ['L0', 'L1', 'L2', 'L3', 'L5', 'L6'] as const;
    const shown = [0, 1, 2, 3, 4, 5, 6].map((stage) => {
      const v = wispFlow(stage, 0);
      const on = layers.filter((l) => v[`${l}op`] === '1');
      expect(on).toHaveLength(1);
      return on[0];
    });
    expect(shown).toEqual(['L0', 'L1', 'L2', 'L3', 'L3', 'L5', 'L6']);
  });

  it('morphs the island: compact on stage 3, expanded on the long press', () => {
    expect([wispFlow(2, 0).iW, wispFlow(3, 0).iW, wispFlow(4, 0).iW]).toEqual([
      '126px',
      '236px',
      '370px',
    ]);
    expect(wispFlow(4, 0)).toMatchObject({ iH: '112px', iE: '1', iC: '0', gPress: 'on' });
    expect(wispFlow(0, 0)).toMatchObject({ gTap: 'on', gPress: '' });
  });

  it('runs the recording clock from 18:39', () => {
    expect(wispFlow(1, 0).gTime).toBe('18:39');
    expect(wispFlow(3, 81).gTime).toBe('20:00');
  });
});
