import { type TileDef } from '@studio/kit/motion';

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
    glyph: 'g-code',
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
