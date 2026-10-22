import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { caseCloseMsg, caseLabels, moneyFlowLabels, privacyCopy, startCopy } from './appendix';

const appendix = readFileSync(
  fileURLToPath(new URL('../../../docs/copy-deck-appendix.md', import.meta.url)),
  'utf8',
);

/** Every string value in a nested object or array. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

describe('appendix copy', () => {
  it.each(strings(privacyCopy))('privacy: "%s" appears word for word', (s) => {
    expect(appendix).toContain(s);
  });

  it.each(strings(startCopy))('start: "%s" appears word for word', (s) => {
    expect(appendix).toContain(s);
  });

  it.each(strings([caseLabels, moneyFlowLabels, caseCloseMsg]))(
    'cases: "%s" appears word for word',
    (s) => {
      expect(appendix).toContain(s);
    },
  );
});
