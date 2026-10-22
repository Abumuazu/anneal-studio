'use server';

import { BriefSchema, briefSummary } from '@/lib/brief';
import { mailer } from '@/lib/integrations/mail';
import { records } from '@/lib/integrations/records';
import { site } from '@/content/site.config';

export interface BriefResult {
  ok: boolean;
  /** Set when the server rejects the answers themselves. */
  invalid?: boolean;
}

const fields = (data: FormData) =>
  Object.fromEntries(
    [...data.entries()].filter((e): e is [string, string] => typeof e[1] === 'string'),
  );

/**
 * Receives a brief: keeps it in the studio's records and emails it to the
 * inbox. It counts as sent once at least one of the two has it, so a brief is
 * never lost silently; if neither works the form says it failed.
 */
export async function sendBrief(_prev: BriefResult | null, data: FormData): Promise<BriefResult> {
  const parsed = BriefSchema.safeParse(fields(data));
  if (!parsed.success) return { ok: false, invalid: true };
  // The schema rejects a filled honeypot (bots fill every field).
  const { website: _honeypot, ...answers } = parsed.data;
  const brief = { ...answers, at: new Date().toISOString() };

  const store = records();
  const mail = mailer();
  const results = await Promise.allSettled([
    store ? store.addBrief(brief) : Promise.reject(new Error('No store')),
    mail
      ? mail.send({
          to: process.env.MAIL_TO ?? site.email,
          replyTo: brief.email,
          subject: `Brief: ${brief.offer ?? 'Not chosen'} · ${brief.name}`,
          text: briefSummary(brief),
        })
      : Promise.reject(new Error('No mailer')),
  ]);
  for (const r of results) if (r.status === 'rejected') console.error('[brief]', r.reason);
  return { ok: results.some((r) => r.status === 'fulfilled') };
}
