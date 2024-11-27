import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const cookieAuth = request.cookies.get('auth-key')
  const headerAuth = request.headers.get('x-auth-key')

  if (!cookieAuth && !headerAuth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let authKey = ""
  if (cookieAuth) {
    authKey = cookieAuth.value
  } else if (headerAuth) {  
    authKey = headerAuth
  }
  
  // consolidate headerAuth and cookieAuth
  const response = NextResponse.next()
  response.headers.set('x-auth-key', authKey)
  return response;
}
 
export const config = {
  matcher: ['/api/reset', '/api/save-config', '/api/initialize']
}