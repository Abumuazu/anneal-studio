#!/usr/bin/env node
// Fails when an em dash (U+2014) or en dash (U+2013) appears in source we ship.
// CLAUDE.md bans both everywhere, including comments that could reach the UI.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const scan = ['apps', 'packages', 'scripts', '.github', 'README.md', 'CLAUDE.md'];
const skipDirs = new Set([
  'node_modules',
  '.next',
  '.turbo',
  'playwright-report',
  'test-results',
  '.lighthouseci',
  '__snapshots__',
]);
const exts = /\.(ts|tsx|js|mjs|cjs|css|json|md|mdx|yml|yaml|html)$/;
const dash = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);

const hits = [];

function walk(path) {
  const st = statSync(path, { throwIfNoEntry: false });
  if (!st) return;
  if (st.isDirectory()) {
    for (const name of readdirSync(path)) {
      if (!skipDirs.has(name)) walk(join(path, name));
    }
    return;
  }
  if (!exts.test(path)) return;
  const lines = readFileSync(path, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (dash.test(line)) hits.push(`${relative(root, path)}:${i + 1}: ${line.trim()}`);
  });
}

for (const entry of scan) walk(join(root, entry));

if (hits.length) {
  console.error('Em or en dashes found. Use a comma, a colon, "to" or a plain hyphen instead:\n');
  for (const h of hits) console.error('  ' + h);
  process.exit(1);
}
console.log('check-dashes: no em or en dashes found.');
