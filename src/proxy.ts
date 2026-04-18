import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { adminEmailAllowlist } from '@/lib/auth/admin-allowlist'
import { auth } from '@/lib/auth/server'

function isCmsPath(pathname: string) {
  return pathname === '/cms' || pathname.startsWith('/cms/')
}

function isAdminPath(pathname: string) {
  return pathname.startsWith('/cms/admin')
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (!isCmsPath(pathname)) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) {
    const loginUrl = new URL('/joint', req.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminPath(pathname)) {
    const email = session.user.email.toLowerCase()
    const allow = adminEmailAllowlist()
    const isAdmin = session.user.role === 'admin' || allow.has(email)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/cms/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cms', '/cms/:path*'],
}
