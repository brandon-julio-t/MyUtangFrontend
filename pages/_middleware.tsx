import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const isGoingToLogin = req.nextUrl.href.includes('login');
  const hasToken = req.cookies['token'];
  if (isGoingToLogin) return NextResponse.next();
  if (isGoingToLogin && hasToken) return NextResponse.redirect('/');
  return hasToken ? NextResponse.next() : NextResponse.redirect('/login');
}
