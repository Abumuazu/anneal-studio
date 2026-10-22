import { z } from 'zod';

import { startCopy } from '@/content/appendix';
import { CURRENCIES } from '@/content/prices';

import { ATTRIBUTION_KEYS, OFFERS } from './brief-fields';

export { ATTRIBUTION_KEYS, OFFERS };

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === '' ? undefined : v));

const oneOf = (values: readonly string[]) =>
  z
    .string()
    .optional()
    .transform((v) => (v === '' ? undefined : v))
    .refine((v) => v === undefined || values.includes(v));

export const BriefSchema = z.object({
  offer: oneOf(OFFERS),
  stage: oneOf(startCopy.brief.stages),
  timing: oneOf(startCopy.brief.timings),
  budget: optional(500),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(254),
  company: optional(200),
  message: optional(5000),
  heard: oneOf(startCopy.brief.sources),
  currency: oneOf(CURRENCIES),
  utm_source: optional(500),
  utm_medium: optional(500),
  utm_campaign: optional(500),
  utm_term: optional(500),
  utm_content: optional(500),
  referrer: optional(500),
  landing: optional(500),
  /** Honeypot: people never see it, so anything in it means a bot. */
  website: z.string().max(0).optional(),
});

type Answers = z.infer<typeof BriefSchema>;

/** A received brief. Only the name and email are always there. */
export type Brief = Partial<Omit<Answers, 'website' | 'name' | 'email'>> &
  Pick<Answers, 'name' | 'email'> & { at: string };

/** Plain-text summary for the studio inbox and the brief record. */
export function briefSummary(b: Brief): string {
  const rows: [string, string | undefined][] = [
    ['Offer', b.offer],
    ['Stage', b.stage],
    ['Timing', b.timing],
    ['Budget', b.budget],
    ['Name', b.name],
    ['Email', b.email],
    ['Company', b.company],
    ['Heard about us', b.heard],
    ['Currency', b.currency],
    ...ATTRIBUTION_KEYS.map((k): [string, string | undefined] => [k, b[k]]),
    ['Received', b.at],
  ];
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v ?? ''}`);
  return b.message ? `${lines.join('\n')}\n\n${b.message}` : lines.join('\n');
}
