import { cubicBezier, easeMorph, easeReveal } from './bezier';

describe('cubicBezier', () => {
  it('pins the end points', () => {
    for (const f of [easeReveal, easeMorph]) {
      expect(f(0)).toBe(0);
      expect(f(1)).toBe(1);
    }
  });

  it('is linear for the identity curve', () => {
    const linear = cubicBezier(0, 0, 1, 1);
    for (const x of [0.1, 0.25, 0.5, 0.9]) expect(linear(x)).toBeCloseTo(x, 5);
  });

  it('matches known values of the CSS "ease" curve', () => {
    const ease = cubicBezier(0.25, 0.1, 0.25, 1);
    expect(ease(0.5)).toBeCloseTo(0.8024, 3);
    expect(ease(0.25)).toBeCloseTo(0.4085, 3);
  });

  it('gives the spec curves their shape', () => {
    // Reveal front-loads the motion; morph starts slowly.
    expect(easeReveal(0.25)).toBeGreaterThan(0.6);
    expect(easeMorph(0.25)).toBeLessThan(0.2);
    expect(easeMorph(0.75)).toBeGreaterThan(0.9);
  });

  it('is monotonic', () => {
    let prev = 0;
    for (let x = 0; x <= 1.0001; x += 0.01) {
      const y = easeMorph(Math.min(1, x));
      expect(y).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = y;
    }
  });
});
