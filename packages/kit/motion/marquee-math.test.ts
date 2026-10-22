import { marqueeStep } from './marquee-math';

describe('marqueeStep', () => {
  it('moves at the idle speed when the page is still', () => {
    expect(marqueeStep(0, 1000, -1, 0.7, 0)).toBeCloseTo(-0.7);
  });

  it('speeds up with scroll velocity, capped at 14', () => {
    expect(marqueeStep(-10, 1000, -1, 0.7, 4)).toBeCloseTo(-10 - 2.7);
    expect(marqueeStep(-10, 1000, -1, 0.7, 400)).toBeCloseTo(-10 - 7.7);
  });

  it('wraps into (-unit, 0] in both directions', () => {
    expect(marqueeStep(-999.8, 1000, -1, 0.7, 0)).toBeCloseTo(-0.5);
    expect(marqueeStep(-0.2, 1000, 1, 0.7, 0)).toBeCloseTo(-999.5);
  });

  it('scales with frame time', () => {
    expect(marqueeStep(0, 1000, -1, 1, 0, 0.5)).toBeCloseTo(-0.5);
  });

  it('holds still until measured', () => {
    expect(marqueeStep(-5, 0, -1, 0.7, 0)).toBe(-5);
  });
});
