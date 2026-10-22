import { existsSync } from 'node:fs';
import { cp, readFile, readdir, rename, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TEMPLATE = fileURLToPath(new URL('../template', import.meta.url));

const NAME = /^[a-z][a-z0-9-]{1,38}[a-z0-9]$/;
const HEX = /^#[0-9a-f]{6}$/i;

/** Default theme: neutral, so a new site looks finished before it is themed. */
export const DEFAULT_THEME = {
  ground: '#e9e7e3',
  ink: '#151515',
  panel: '#ffffff',
  accent: '#2f5bff',
};

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two hex colours. */
export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Text colour for the accent: whichever of ink and white reads better on it. */
export function onAccent(accent, ink) {
  return contrast(accent, ink) >= contrast(accent, '#ffffff') ? ink : '#ffffff';
}

/** Checks the options and fills in defaults. Throws with a message a person can act on. */
export function resolveOptions({ name, title, theme = {} }) {
  if (!name || !NAME.test(name)) {
    throw new Error(
      `Site name "${name ?? ''}" must be 3 to 40 lowercase letters, digits or dashes, starting with a letter.`,
    );
  }
  const colours = { ...DEFAULT_THEME, ...theme };
  for (const [key, value] of Object.entries(colours)) {
    if (!HEX.test(value))
      throw new Error(`--${key} must be a hex colour like #1a2b3c, not "${value}".`);
  }
  if (contrast(colours.ink, colours.ground) < 4.5) {
    throw new Error(
      '--ink on --ground is under 4.5:1 (WCAG AA). Pick a darker ink or a lighter ground.',
    );
  }
  const words = name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return { name, title: title || words.join(' '), colours };
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    const path = join(dir, entry);
    if ((await stat(path)).isDirectory()) out.push(...(await walk(path)));
    else out.push(path);
  }
  return out;
}

/**
 * Copies the template into `<appsDir>/<name>` and fills in the name, title and
 * theme. Refuses to touch an existing folder. Returns the new folder.
 */
export async function generate(options, appsDir) {
  const { name, title, colours } = resolveOptions(options);
  const target = join(appsDir, name);
  if (existsSync(target))
    throw new Error(`${target} already exists. Pick another name or remove it.`);
  await cp(TEMPLATE, target, { recursive: true });
  const values = {
    __NAME__: name,
    __TITLE__: title,
    __GROUND__: colours.ground,
    __INK__: colours.ink,
    __PANEL__: colours.panel,
    __ACCENT__: colours.accent,
    __ON_ACCENT__: onAccent(colours.accent, colours.ink),
  };
  for (const file of await walk(target)) {
    const text = await readFile(file, 'utf8');
    const filled = Object.entries(values).reduce((t, [k, v]) => t.replaceAll(k, v), text);
    if (filled !== text) await writeFile(file, filled);
    if (file.endsWith('.tpl')) await rename(file, file.slice(0, -'.tpl'.length));
  }
  return target;
}
