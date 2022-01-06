import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.url.endsWith('login')) return NextResponse.next();
  return req.headers.get('Authorization') ? NextResponse.next() : NextResponse.redirect('login');
}
