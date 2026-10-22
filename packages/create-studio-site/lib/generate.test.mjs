import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { contrast, generate, onAccent, resolveOptions } from './generate.mjs';

let apps = '';
beforeEach(async () => {
  apps = await mkdtemp(join(tmpdir(), 'studio-apps-'));
});
afterEach(async () => {
  await rm(apps, { recursive: true, force: true });
});

describe('resolveOptions', () => {
  it('derives a title from the name', () => {
    expect(resolveOptions({ name: 'north-light' }).title).toBe('North Light');
  });

  it('rejects names that cannot be a folder and a package', () => {
    for (const name of ['', 'A', 'Studio', 'my studio', '-x', 'x-', '1abc']) {
      expect(() => resolveOptions({ name })).toThrow(/Site name/);
    }
  });

  it('rejects colours that are not hex, and unreadable text', () => {
    expect(() => resolveOptions({ name: 'demo', theme: { accent: 'blue' } })).toThrow(/--accent/);
    expect(() =>
      resolveOptions({ name: 'demo', theme: { ink: '#999999', ground: '#aaaaaa' } }),
    ).toThrow(/4\.5:1/);
  });
});

describe('onAccent', () => {
  it('picks whichever text colour reads better', () => {
    expect(onAccent('#ffd400', '#111111')).toBe('#111111');
    expect(onAccent('#1d3cff', '#111111')).toBe('#ffffff');
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });
});

describe('generate', () => {
  it('copies the template and fills in the name, title and theme', async () => {
    const target = await generate(
      { name: 'north-light', title: 'North Light', theme: { accent: '#e4572e' } },
      apps,
    );
    expect(target).toBe(join(apps, 'north-light'));
    const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'));
    expect(pkg.name).toBe('@sites/north-light');
    expect(existsSync(join(target, 'package.json.tpl'))).toBe(false);
    const css = await readFile(join(target, 'app/globals.css'), 'utf8');
    expect(css).toContain('--color-accent: #e4572e;');
    expect(css).toContain('--color-on-accent: #151515;');
    const content = await readFile(join(target, 'content/site.ts'), 'utf8');
    expect(content).toContain("name: 'North Light'");
    expect(content).toContain("motion: 'north-light-motion'");
    expect(existsSync(join(target, 'content/cases/example.mdx'))).toBe(true);
  });

  it('leaves no placeholder behind', async () => {
    const target = await generate({ name: 'clean-site' }, apps);
    const files = ['app/globals.css', 'content/site.ts', 'package.json', 'README.md'];
    for (const f of files)
      expect(await readFile(join(target, f), 'utf8')).not.toMatch(/__[A-Z_]+__/);
  });

  it('never overwrites an existing site', async () => {
    await generate({ name: 'twice' }, apps);
    await expect(generate({ name: 'twice' }, apps)).rejects.toThrow(/already exists/);
  });
});
