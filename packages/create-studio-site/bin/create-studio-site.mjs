#!/usr/bin/env node
// Generates a studio site in apps/<name> from the kit's template.
//   pnpm create-site <name> [--title "Studio Name"] [--accent #hex] [--ink #hex] [--ground #hex] [--panel #hex]
import { relative } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

import { generate } from '../lib/generate.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    accent: { type: 'string' },
    ink: { type: 'string' },
    ground: { type: 'string' },
    panel: { type: 'string' },
    apps: { type: 'string' },
  },
});

const theme = Object.fromEntries(
  ['accent', 'ink', 'ground', 'panel'].filter((k) => values[k]).map((k) => [k, values[k]]),
);

try {
  const target = await generate(
    { name: positionals[0], title: values.title, theme },
    values.apps ?? `${root}apps`,
  );
  const name = positionals[0];
  console.log(`Created ${relative(root, target)}.

Next:
  pnpm install
  pnpm --filter @sites/${name} dev

Then replace the placeholder copy in content/site.ts and content/cases/.`);
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
