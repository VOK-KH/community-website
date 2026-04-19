import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { adminEmailAllowlist } from './admin-allowlist'
import { auth } from './server'

export type CmsSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

export { adminEmailAllowlist }

/** Effective CMS role: DB `admin`, or email listed in `CMS_ADMIN_EMAILS`. */
export function resolveCmsRole(session: CmsSession): 'admin' | 'member' {
  const email = session.user.email.toLowerCase()
  if (session.user.role === 'admin' || adminEmailAllowlist().has(email)) return 'admin'
  return 'member'
}

export async function requireCmsSession(): Promise<CmsSession> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect('/joint?next=/cms/dashboard')
  return session
}

/** Sidebar / account row: friendly name, email, and two-letter initials. */
export function getCmsSessionDisplay(session: CmsSession): {
  email: string
  displayName: string
  initials: string
} {
  const email = session.user.email
  const name = session.user.name?.trim() ?? ''
  const displayName = name || email.split('@')[0] || email

  if (name.includes(' ')) {
    const parts = name.split(/\s+/).filter(Boolean)
    const a = parts[0]?.[0]
    const b = parts[parts.length - 1]?.[0]
    if (a && b) return { email, displayName, initials: (a + b).toUpperCase() }
  }

  const source = (name || email).replace(/\s+/g, '')
  const initials =
    source.length >= 2 ? source.slice(0, 2).toUpperCase() : source.toUpperCase() || '?'

  return { email, displayName, initials }
}
