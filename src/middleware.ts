import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const tempAuth = request.cookies.get('auth-key')
 
  const isAuthenticated = tempAuth?.value === process.env.ADMIN_KEY

  if (!isAuthenticated) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const response = NextResponse.next()
  // response.cookies.set({
  //   name:'auth-key', 
  //   value:"from-server-limited",
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: 'strict',
  //   path: '/',
  // })
  return response;
}
 
export const config = {
  matcher: ['/api/reset', '/api/save-config']
}