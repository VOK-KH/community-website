import type { Metadata } from 'next'

import { CmsWorkspaceShell } from '@/components/layouts/cms/cms-workspace-shell'
import { getCmsSessionDisplay, requireCmsSession, resolveCmsRole } from '@/lib/auth/cms'

export const metadata: Metadata = {
  title: 'CMS',
}

export default async function CmsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await requireCmsSession()
  const role = resolveCmsRole(session)
  const user = getCmsSessionDisplay(session)

  return (
    <CmsWorkspaceShell role={role === 'admin' ? 'admin' : 'member'} user={user}>
      {children}
    </CmsWorkspaceShell>
  )
}
