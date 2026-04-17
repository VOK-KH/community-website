import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/cms/login', req.url))

  // Clear cookies
  res.cookies.set('cms_session', '', { path: '/', maxAge: 0 })
  res.cookies.set('cms_role', '', { path: '/', maxAge: 0 })
  res.cookies.set('cms_email', '', { path: '/', maxAge: 0 })

  return res
}

