import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthFlowSurface } from '@/app/(auth)/_components/auth-flow-surface'
import { auth } from '@/lib/auth/server'

import { RegisterForm } from './register-form'

export const metadata = {
  title: 'Create account',
}

export default async function CmsRegisterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  if (process.env.CMS_DISABLE_SIGNUP === 'true') {
    redirect('/joint')
  }

  const session = await auth.api.getSession({ headers: await headers() })
  const sp = await searchParams
  const nextRaw =
    typeof sp.next === 'string' ? sp.next : Array.isArray(sp.next) ? sp.next[0] : '/cms/dashboard'
  const nextPath = nextRaw.startsWith('/cms') ? nextRaw : '/cms/dashboard'

  if (session) {
    redirect(nextPath)
  }

  return (
    <AuthFlowSurface variant="register">
      <RegisterForm nextPath={nextPath} />
    </AuthFlowSurface>
  )
}
