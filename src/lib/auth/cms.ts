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
