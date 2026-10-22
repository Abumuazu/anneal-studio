import { type TileDef } from '@studio/kit/motion';
import { type RestTile } from '@studio/kit/sections';

/** Footer physics tiles, from the HomeV6 board. */
export const footerTiles: readonly TileDef[] = [
  {
    size: 92,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-spark',
  },
  {
    size: 74,
    radius: '50%',
    background: 'var(--color-accent)',
    color: 'var(--color-on-accent)',
    glyph: 'g-arrow',
  },
  {
    size: 100,
    radius: '26%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-web',
  },
  {
    size: 66,
    radius: '50% 0 50% 0',
    background: '#3a3a3a',
    color: 'var(--color-panel)',
    glyph: 'g-dots',
  },
  {
    size: 84,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-app',
  },
  {
    size: 72,
    radius: '50%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-cursor',
  },
  {
    size: 96,
    radius: '50% 0 50% 0',
    background: 'var(--color-accent)',
    color: 'var(--color-on-accent)',
    glyph: 'g-stack',
  },
  { size: 62, radius: '26%', background: '#3a3a3a', color: 'var(--color-panel)', glyph: 'g-spark' },
  {
    size: 80,
    radius: '50%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-dots',
  },
  {
    size: 88,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-arrow',
  },
];

/**
 * The same tiles resting in a cluster on phones (HomeMobileV6): spark, dots,
 * the desktop icon, the phone icon, an arrow and a cursor.
 */
export const footerRestTiles: readonly RestTile[] = [
  {
    size: 70,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-spark',
    left: 1.7,
    bottom: 0,
    rotate: -8,
  },
  {
    size: 58,
    radius: '50%',
    background: '#3a3a3a',
    color: 'var(--color-panel)',
    glyph: 'g-dots',
    left: 23.4,
    bottom: 0,
  },
  {
    size: 64,
    radius: '26%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-web',
    left: 12.6,
    bottom: 66,
    rotate: 14,
  },
  {
    size: 80,
    radius: '50% 0 50% 0',
    background: 'var(--color-accent)',
    color: 'var(--color-on-accent)',
    glyph: 'g-app',
    left: 43.4,
    bottom: 0,
  },
  {
    size: 62,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-arrow',
    left: 69.7,
    bottom: 0,
    rotate: 6,
  },
  {
    size: 52,
    radius: '50%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-cursor',
    left: 78.3,
    bottom: 62,
  },
];
