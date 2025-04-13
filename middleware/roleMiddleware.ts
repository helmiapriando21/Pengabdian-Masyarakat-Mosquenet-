import { NextRequest, NextResponse } from 'next/server';

export function roleMiddleware(request: NextRequest, role: string) {

  const check = {
    isLogin: request.cookies.get('user-id') ? true : false,
    adminRole: request.cookies.get('admin-role')?.value,
    adminStatus: request.cookies.get('admin-status')?.value === "true" ? true : false
  }

  if(check && role === '' && check.isLogin) {
    return NextResponse.next();
  } 
  
  if (!check?.isLogin || check?.adminRole !== role || !check?.adminStatus) {
    const homeUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}
