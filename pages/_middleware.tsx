import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const hasToken = req.cookies['token'];

  const isBypassPath = ['login', 'register'].some(path => req.nextUrl.href.includes(path));
  if (isBypassPath && !hasToken) return NextResponse.next();

  const isGuestOnly = isBypassPath && hasToken;
  if (isGuestOnly) return NextResponse.redirect('/');

  return hasToken ? NextResponse.next() : NextResponse.redirect('/login');
}
