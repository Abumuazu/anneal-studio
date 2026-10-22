'use server';

import { type CaptureResult } from '@studio/kit/ui';
import { z } from 'zod';

import { records } from '@/lib/integrations/records';

const Entry = z.object({
  email: z.email().max(254),
  source: z.enum(['products', 'studio']),
});

/** Adds an address to the Anneal tools and ventures waitlist. */
export async function joinWaitlist(
  _prev: CaptureResult | null,
  data: FormData,
): Promise<CaptureResult> {
  const parsed = Entry.safeParse({ email: data.get('email'), source: data.get('source') });
  if (!parsed.success) return { ok: false, invalid: true };
  const store = records();
  if (!store) return { ok: false };
  try {
    await store.addWaitlist({ ...parsed.data, at: new Date().toISOString() });
    return { ok: true };
  } catch (err) {
    console.error('[waitlist]', err);
    return { ok: false };
  }
}
