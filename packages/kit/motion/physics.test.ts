import { createBodies, isAtRest, layoutRest, step, toss } from './physics';

const seeded = () => {
  let s = 42;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

describe('physics', () => {
  const W = 1200;
  const H = 380;

  it('starts bodies above the playground', () => {
    const bodies = createBodies([92, 74, 100], W, seeded());
    expect(bodies).toHaveLength(3);
    for (const b of bodies) expect(b.y).toBeLessThan(0);
  });

  it('settles every body inside the box under gravity', () => {
    const bodies = createBodies([92, 74, 100, 66, 84, 72, 96, 62, 80, 88], W, seeded());
    for (let i = 0; i < 60 * 20; i++)
      step(bodies, { width: W, height: H, gravity: true, drag: null });
    for (const b of bodies) {
      expect(b.x).toBeGreaterThanOrEqual(b.r - 0.5);
      expect(b.x).toBeLessThanOrEqual(W - b.r + 0.5);
      expect(b.y).toBeLessThanOrEqual(H - b.r + 0.5);
    }
  });

  it('keeps bodies from overlapping much once settled', () => {
    const bodies = createBodies([80, 80, 80, 80], 400, seeded());
    for (let i = 0; i < 60 * 20; i++)
      step(bodies, { width: 400, height: H, gravity: true, drag: null });
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const p = bodies[i];
        const q = bodies[j];
        if (!p || !q) continue;
        expect(Math.hypot(q.x - p.x, q.y - p.y)).toBeGreaterThan((p.r + q.r) * 0.85);
      }
    }
  });

  it('pulls a dragged body toward the pointer', () => {
    const bodies = createBodies([80], W, seeded());
    layoutRest(bodies, W, H);
    const before = bodies[0]?.x ?? 0;
    for (let i = 0; i < 30; i++) {
      step(bodies, { width: W, height: H, gravity: true, drag: { index: 0, x: 600, y: 100 } });
    }
    expect(bodies[0]?.x).toBeGreaterThan(before + 400);
    expect(bodies[0]?.y).toBeLessThan(150);
  });

  it('lays bodies out at rest on the floor', () => {
    const bodies = createBodies([92, 74], W, seeded());
    layoutRest(bodies, W, H);
    expect(isAtRest(bodies, H)).toBe(true);
    toss(bodies, seeded());
    expect(isAtRest(bodies, H)).toBe(false);
  });

  it('does not fall without gravity', () => {
    const bodies = createBodies([80], W, seeded());
    layoutRest(bodies, W, H);
    const y = bodies[0]?.y;
    for (let i = 0; i < 60; i++) step(bodies, { width: W, height: H, gravity: false, drag: null });
    expect(bodies[0]?.y).toBe(y);
  });
});
