import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const CMS_SESSION_COOKIE = 'cms_session'
const CMS_ROLE_COOKIE = 'cms_role'

function isCmsPath(pathname: string) {
  return pathname === '/cms' || pathname.startsWith('/cms/')
}

function isCmsPublicPath(pathname: string) {
  return pathname === '/cms/login'
}

function isAdminPath(pathname: string) {
  return pathname.startsWith('/cms/admin')
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  if (!isCmsPath(pathname) || isCmsPublicPath(pathname)) {
    return NextResponse.next()
  }

  const session = req.cookies.get(CMS_SESSION_COOKIE)?.value
  if (!session) {
    const loginUrl = new URL('/cms/login', req.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminPath(pathname)) {
    const role = req.cookies.get(CMS_ROLE_COOKIE)?.value
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/cms/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cms/:path*'],
}

