import { NextResponse } from 'next/server';

import { isMemory, outbox } from '@/lib/integrations/memory';

export const dynamic = 'force-dynamic';

/** What the in-memory services received. Only answers with INTEGRATIONS=memory (tests). */
export function GET() {
  if (!isMemory()) return new NextResponse(null, { status: 404 });
  return NextResponse.json(outbox());
}
