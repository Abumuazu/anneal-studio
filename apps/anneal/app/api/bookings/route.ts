import { NextResponse } from 'next/server';
import { z } from 'zod';

import { calendar } from '@/lib/integrations/calendar';

const Booking = z.object({
  start: z.iso.datetime(),
  email: z.email().max(254),
  timeZone: z.string().min(1).max(64),
});

/** Books a call (Cal.com POST /v2/bookings, server side). Cal.com sends the invite. */
export async function POST(request: Request) {
  const parsed = Booking.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, invalid: true }, { status: 400 });
  const cal = calendar();
  if (!cal) return NextResponse.json({ ok: false }, { status: 503 });
  const { start, email, timeZone } = parsed.data;
  try {
    // The card only asks for an email; Cal.com needs a name, so the address stands in.
    const booked = await cal.book({ start, email, name: email, timeZone });
    return NextResponse.json({ ok: true, start: booked.start });
  } catch (err) {
    console.error('[bookings]', err);
    return NextResponse.json({ ok: false }, { status: 409 });
  }
}
