import { NextRequest, NextResponse } from 'next/server';

export function masterMiddleware(request: NextRequest) {

  const check = {
    masterStatus: request.cookies.get('master-status')?.value === "true" ? true : false,
  }

  if(check && check.masterStatus) {
    return NextResponse.next();
  }

  return NextResponse.redirect(request.nextUrl.origin);
}
