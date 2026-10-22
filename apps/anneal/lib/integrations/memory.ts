import 'server-only';

import type { Brief } from '@/lib/brief';

/**
 * In-memory stand-ins for the studio's services, used when
 * INTEGRATIONS=memory (tests and local runs). Nothing persists. The state
 * hangs off globalThis so route handlers and Server Actions, which Next may
 * bundle separately, see the same lists.
 */
export interface Outbox {
  bookings: { start: string; email: string; timeZone: string }[];
  briefs: Brief[];
  waitlist: { email: string; source: string; at: string }[];
  mail: { to: string; subject: string; text: string; replyTo?: string }[];
}

const KEY = Symbol.for('anneal.outbox');

export function outbox(): Outbox {
  const g = globalThis as typeof globalThis & { [KEY]?: Outbox };
  g[KEY] ??= { bookings: [], briefs: [], waitlist: [], mail: [] };
  return g[KEY];
}

export const isMemory = () => process.env.INTEGRATIONS === 'memory';
