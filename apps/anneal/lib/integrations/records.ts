import 'server-only';

import { type Brief, briefSummary } from '@/lib/brief';

import { isMemory, outbox } from './memory';

export interface WaitlistEntry {
  email: string;
  source: string;
  at: string;
}

/** Where briefs and waitlist addresses are kept (Notion, per the Privacy page). */
export interface Records {
  addBrief(brief: Brief): Promise<void>;
  addWaitlist(entry: WaitlistEntry): Promise<void>;
}

const memoryRecords: Records = {
  addBrief(brief) {
    outbox().briefs.push(brief);
    return Promise.resolve();
  },
  addWaitlist(entry) {
    outbox().waitlist.push(entry);
    return Promise.resolve();
  },
};

const text = (value: string | undefined) => ({
  rich_text: value ? [{ text: { content: value.slice(0, 2000) } }] : [],
});
const select = (value: string | undefined) => ({ select: value ? { name: value } : null });

/**
 * Notion property values for a brief. The database needs these properties:
 * Name (title), Email (email), Offer, Stage, Timing, Heard, Currency (select),
 * Budget, Company, Message, Campaign (text) and Received (date).
 */
export function briefProperties(b: Brief) {
  const campaign = [b.utm_source, b.utm_medium, b.utm_campaign, b.utm_term, b.utm_content]
    .filter(Boolean)
    .join(' / ');
  return {
    Name: { title: [{ text: { content: b.name } }] },
    Email: { email: b.email },
    Offer: select(b.offer),
    Stage: select(b.stage),
    Timing: select(b.timing),
    Heard: select(b.heard),
    Currency: select(b.currency),
    Budget: text(b.budget),
    Company: text(b.company),
    Message: text(b.message),
    Campaign: text([campaign, b.referrer, b.landing].filter(Boolean).join(' · ')),
    Received: { date: { start: b.at } },
  };
}

/** Notion's REST API: one page per brief or address, in two databases. */
export function notion(
  token: string,
  db: { briefs: string; waitlist: string },
  fetcher: typeof fetch = fetch,
): Records {
  const create = async (database: string, properties: object, children?: object[]) => {
    const res = await fetcher('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent: { database_id: database }, properties, children }),
    });
    if (!res.ok) throw new Error(`Notion: ${String(res.status)}`);
  };
  return {
    addBrief: (b) =>
      create(db.briefs, briefProperties(b), [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: { rich_text: [{ text: { content: briefSummary(b).slice(0, 2000) } }] },
        },
      ]),
    addWaitlist: (e) =>
      create(db.waitlist, {
        Email: { title: [{ text: { content: e.email } }] },
        Source: select(e.source),
        Joined: { date: { start: e.at } },
      }),
  };
}

/** The configured store, or null when it is not set up (forms then report failure). */
export function records(): Records | null {
  if (isMemory()) return memoryRecords;
  const token = process.env.NOTION_TOKEN;
  const briefs = process.env.NOTION_BRIEFS_DB;
  const waitlist = process.env.NOTION_WAITLIST_DB;
  if (token && briefs && waitlist) return notion(token, { briefs, waitlist });
  return null;
}
