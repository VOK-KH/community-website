import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** @deprecated Use Better Auth sign-out from the CMS header instead. */
export function POST(request: NextRequest) {
  return NextResponse.redirect(new URL('/joint', request.url))
}
