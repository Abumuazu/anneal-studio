import { NextResponse } from 'next/server';

import { calendar } from '@/lib/integrations/calendar';

export const dynamic = 'force-dynamic';

/** The days shown on the booking card. */
const DAYS = 10;

/** Open call slots for the next ten weekdays (Cal.com GET /v2/slots, server side). */
export async function GET() {
  const cal = calendar();
  if (!cal) return NextResponse.json({ ok: false }, { status: 503 });
  try {
    const days = await cal.slots(new Date(), DAYS);
    return NextResponse.json({ ok: true, days }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) {
    console.error('[slots]', err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
