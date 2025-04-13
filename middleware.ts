import { NextResponse, type NextRequest } from 'next/server';
import { authMiddleware } from './middleware/authMiddleware';
import { guestMiddleware } from './middleware/guestMiddleware';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const { pathname } = url;

  if (pathname.startsWith('/auth') || pathname.startsWith('/verify')) {
    return guestMiddleware(request);
  } else if(pathname.startsWith('/dashboard')) {
    const auth = await authMiddleware(request);
    return auth;
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/:path*']
}