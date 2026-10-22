/**
 * Throwable tiles: circles with gravity, floor and wall bounces, pairwise
 * collisions and spin. A direct port of the board's per-frame integrator,
 * meant to be stepped at a fixed 60Hz.
 */
export interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Angle in degrees and angular velocity per step. */
  a: number;
  va: number;
  /** Collision radius and rendered size. */
  r: number;
  s: number;
}

export interface Drag {
  index: number;
  /** Pointer position in playground coordinates. */
  x: number;
  y: number;
}

export interface StepOptions {
  width: number;
  height: number;
  gravity: boolean;
  drag: Drag | null;
}

export type Random = () => number;

/** Bodies start above the playground, staggered, ready to drop in. */
export function createBodies(
  sizes: readonly number[],
  width: number,
  random: Random = Math.random,
): Body[] {
  const span = Math.max(200, width - 240);
  return sizes.map((s, i) => ({
    x: 120 + ((i * 137) % span),
    y: -120 - i * 110,
    vx: (random() - 0.5) * 3,
    vy: 0,
    a: random() * 40 - 20,
    va: 0,
    r: s / 2,
    s,
  }));
}

/** Lines the bodies up on the floor, left to right, at rest. */
export function layoutRest(bodies: Body[], width: number, height: number): void {
  let x = 60;
  for (const b of bodies) {
    b.x = Math.min(width - b.r, x + b.r);
    b.y = height - b.r;
    b.vx = 0;
    b.vy = 0;
    b.va = 0;
    x += b.s + 16;
  }
}

/** Throws every body upward with a random sideways kick (keyboard toss). */
export function toss(bodies: Body[], random: Random = Math.random): void {
  for (const b of bodies) {
    b.vx += (random() - 0.5) * 18;
    b.vy -= 10 + random() * 8;
    b.va += (random() - 0.5) * 12;
  }
}

/** Advances the simulation by one 60Hz step. */
export function step(bodies: Body[], { width: W, height: H, gravity, drag }: StepOptions): void {
  const dragged = drag?.index ?? -1;
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (!b) continue;
    if (drag && i === dragged) {
      b.vx = (drag.x - b.x) * 0.35;
      b.vy = (drag.y - b.y) * 0.35;
      b.x += b.vx;
      b.y += b.vy;
      b.va = b.vx * 0.6;
    } else if (gravity) {
      b.vy += 0.55;
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.995;
      b.va *= 0.97;
    }
    b.a += b.va;
    if (b.y + b.r > H) {
      b.y = H - b.r;
      b.vy *= -0.32;
      b.vx *= 0.9;
      b.va = b.vx * 1.4;
      if (Math.abs(b.vy) < 0.6) b.vy = 0;
    }
    if (b.x - b.r < 0) {
      b.x = b.r;
      b.vx *= -0.5;
    }
    if (b.x + b.r > W) {
      b.x = W - b.r;
      b.vx *= -0.5;
    }
  }
  for (let it = 0; it < 2; it++) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const p = bodies[i];
        const q = bodies[j];
        if (!p || !q) continue;
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const m = p.r + q.r;
        if (d >= m) continue;
        const nx = dx / d;
        const ny = dy / d;
        const o = m - d;
        const wp = i === dragged ? 0 : j === dragged ? 1 : 0.5;
        const wq = 1 - wp;
        p.x -= nx * o * wp;
        p.y -= ny * o * wp;
        q.x += nx * o * wq;
        q.y += ny * o * wq;
        const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
        if (rv < 0) {
          const jv = (-1.3 * rv) / 2;
          p.vx -= jv * nx;
          p.vy -= jv * ny;
          q.vx += jv * nx;
          q.vy += jv * ny;
          p.va -= jv * 0.8;
          q.va += jv * 0.8;
        }
      }
    }
  }
}

/** True once nothing is moving enough to be worth another frame. */
export function isAtRest(bodies: readonly Body[], height: number): boolean {
  return bodies.every(
    (b) =>
      Math.abs(b.vx) < 0.05 &&
      Math.abs(b.vy) < 0.05 &&
      Math.abs(b.va) < 0.05 &&
      b.y + b.r >= height - 1,
  );
}
