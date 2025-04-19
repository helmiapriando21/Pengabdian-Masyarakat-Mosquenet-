import { NextRequest, NextResponse } from 'next/server';
import { roleMiddleware } from './roleMiddleware';

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const userId = request.cookies.get('user-id');
  if (!userId) {
    const homeUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  if(pathname.startsWith('/dashboard')) {
    if(pathname.startsWith('/dashboard/account')) {
      return roleMiddleware(request, 'Ketua');
    } else if(pathname.startsWith('/dashboard/keuangan')) {
      return roleMiddleware(request, 'Bendahara');
    } else if(pathname.startsWith('/dashboard/archive')) {
      return roleMiddleware(request, 'Sekretaris');
    } else {
      return roleMiddleware(request, 'Pengurus');
    }
  }
  return NextResponse.next();
}
