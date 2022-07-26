import { NextResponse } from 'next/server'

export async function middleware(request) {
  const session = request.cookies.get('next-auth.session-token')

  const pathName = request.nextUrl.pathname

  if (!session && pathName.includes('/cp')) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathName}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cp/:path*'],
}
