import { type NextRequest, NextResponse } from 'next/server';

import { CURRENCY_COOKIE, currencyForCountry, isCurrency } from './content/currency';

/**
 * First visit: pick a default currency from the visitor's country (Vercel sets
 * x-vercel-ip-country) and remember it in a cookie. The boot script reads the
 * cookie before first paint, so pages stay static.
 */
export function middleware(request: NextRequest) {
  const existing = request.cookies.get(CURRENCY_COOKIE)?.value;
  if (isCurrency(existing)) return NextResponse.next();
  const currency = currencyForCountry(request.headers.get('x-vercel-ip-country'));
  const response = NextResponse.next();
  response.cookies.set(CURRENCY_COOKIE, currency, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  // Pages only: skip Next internals, files with an extension and API routes.
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
