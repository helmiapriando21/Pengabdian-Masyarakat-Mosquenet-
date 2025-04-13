import { NextRequest, NextResponse } from 'next/server';

export function guestMiddleware(request: NextRequest) {
  const userId = request.cookies.get('user-id');
  if (userId) {
    const homeUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}
