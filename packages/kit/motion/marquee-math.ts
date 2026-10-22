/**
 * Advances a marquee offset by one frame and wraps it into (-unit, 0].
 * Board: speed = base + min(14, |velocity|) * 0.5, in px per 60fps frame.
 */
export function marqueeStep(
  x: number,
  unit: number,
  direction: -1 | 1,
  base: number,
  velocity: number,
  dt = 1,
): number {
  if (!unit) return x;
  const speed = (base + Math.min(14, Math.abs(velocity)) * 0.5) * dt;
  let next = x + direction * speed;
  while (next <= -unit) next += unit;
  while (next > 0) next -= unit;
  return next;
}
