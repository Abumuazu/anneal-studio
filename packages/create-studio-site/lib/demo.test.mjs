import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { generate, TEMPLATE } from './generate.mjs';
import { readdir, stat } from 'node:fs/promises';

const DEMO = fileURLToPath(new URL('../../../apps/demo', import.meta.url));
/** The options apps/demo was generated with (README, M7). */
const OPTIONS = {
  name: 'demo',
  title: 'North Light',
  theme: { accent: '#e4572e', ink: '#1b1a17', ground: '#f1ede4', panel: '#fffdf8' },
};

async function files(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    if ((await stat(path)).isDirectory()) out.push(...(await files(path)));
    else out.push(path);
  }
  return out;
}

describe('apps/demo', () => {
  it('is exactly what the template generates, so the template stays built and tested', async () => {
    const apps = await mkdtemp(join(tmpdir(), 'studio-demo-'));
    try {
      const fresh = await generate(OPTIONS, apps);
      const generated = (await files(fresh)).map((f) => relative(fresh, f)).sort();
      expect(generated.length).toBeGreaterThan(10);
      expect(TEMPLATE).toBeTruthy();
      for (const file of generated) {
        const want = await readFile(join(fresh, file), 'utf8');
        const have = await readFile(join(DEMO, file), 'utf8').catch(() => '(missing)');
        expect(have, `${file} differs: regenerate apps/demo (see its README)`).toBe(want);
      }
    } finally {
      await rm(apps, { recursive: true, force: true });
    }
  });
});
