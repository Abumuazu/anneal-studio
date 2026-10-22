import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { contrastRatio } from '@studio/kit/lib';

const css = readFileSync(fileURLToPath(new URL('../app/globals.css', import.meta.url)), 'utf8');

function token(name: string): string {
  const m = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6})`).exec(css);
  if (!m?.[1]) throw new Error(`token --${name} not found`);
  return m[1];
}

/** Text and background pairs the boards use, with the WCAG AA minimum for each. */
const PAIRS: [fg: string, bg: string, min: number, use: string][] = [
  ['color-ink', 'color-ground', 4.5, 'body text'],
  ['color-grey-600', 'color-ground', 4.5, 'labels on the ground'],
  ['color-grey-700', 'color-ground', 4.5, 'secondary body text'],
  ['color-grey-600', 'color-panel', 4.5, 'labels on white panels'],
  ['color-grey-400', 'color-ink', 4.5, 'labels on dark sections'],
  ['color-grey-300', 'color-ink', 4.5, 'secondary text on dark'],
  ['color-on-accent', 'color-accent', 4.5, 'call to action text'],
  ['color-grey-550', 'color-ground', 3, 'hero headline middle row (large text)'],
  ['color-grey-500', 'color-ink', 3, 'closing middle row (large text)'],
  ['color-accent', 'color-ground', 3, 'focus ring on the ground'],
  ['color-text-dim', 'color-panel', 4.5, 'unlit words and inactive steps on white'],
];

describe('Anneal tokens meet WCAG AA', () => {
  it.each(PAIRS)('%s on %s ≥ %s (%s)', (fg, bg, min) => {
    expect(contrastRatio(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
  });

  it('documents why on-accent is not the board ink', () => {
    expect(contrastRatio('#0B0B0C', token('color-accent'))).toBeLessThan(4.5);
  });
});
