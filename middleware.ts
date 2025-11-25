import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // HTML 요청일 때만 붙임
  if (req.nextUrl.pathname === '/') {
    res.headers.set('Cache-Control', 'public, max-age=86400');
  }

  return res;
}
