import { NextResponse, type NextRequest } from 'next/server';
import { authMiddleware } from './middleware/authMiddleware';
import { guestMiddleware } from './middleware/guestMiddleware';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const { pathname } = url;

  if (pathname.startsWith('/auth') || pathname.startsWith('/verify')) {
    return guestMiddleware(request);
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/auth/:path*', '/verify/:path*']
}