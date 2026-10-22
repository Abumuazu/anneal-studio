import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { boardCopy, copy } from './copy';

const deckPath = fileURLToPath(new URL('../../../docs/copy-deck-v3.md', import.meta.url));

function parseDeck(): Map<string, string> {
  const md = readFileSync(deckPath, 'utf8');
  const block = /```\n([\s\S]*?)```/.exec(md)?.[1] ?? '';
  const map = new Map<string, string>();
  for (const line of block.split('\n')) {
    const m = /^([a-zA-Z0-9.]+): (.*)$/.exec(line);
    if (m?.[1] && m[2] !== undefined) map.set(m[1], m[2]);
  }
  return map;
}

const DASH = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);

describe('copy', () => {
  const deck = parseDeck();

  it('parses the deck', () => {
    expect(deck.size).toBeGreaterThan(100);
  });

  it('has every deck key (regenerate with node scripts/gen-copy.mjs)', () => {
    expect(Object.keys(copy).sort()).toEqual([...deck.keys()].sort());
  });

  it.each(Object.entries(copy))('%s matches the deck word for word', (key, value) => {
    expect(deck.has(key)).toBe(true);
    expect(value).toBe(deck.get(key));
  });

  it('has no em or en dashes, in deck or board strings', () => {
    const all = [...Object.values(copy), ...JSON.stringify(boardCopy).split('"')];
    for (const s of all) expect(s).not.toMatch(DASH);
  });
});

describe('lines', () => {
  it('splits a deck line at word positions without changing it', async () => {
    const { lines: split } = await import('./copy');
    expect(split('What opens next.', [2])).toEqual(['What opens', 'next.']);
    expect(split('Not sure which one fits?', [3]).join(' ')).toBe('Not sure which one fits?');
  });
});
