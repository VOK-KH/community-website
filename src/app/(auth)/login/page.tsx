import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { AuthFlowSurface } from '@/app/(auth)/_components/auth-flow-surface'
import { auth } from '@/lib/auth/server'

import { LoginForm } from './login-form'

export const metadata = {
  title: 'Sign in',
}

export default async function CmsLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const sp = await searchParams
  const nextRaw =
    typeof sp.next === 'string' ? sp.next : Array.isArray(sp.next) ? sp.next[0] : '/cms/dashboard'
  const nextPath = nextRaw.startsWith('/cms') ? nextRaw : '/cms/dashboard'

  if (session) {
    redirect(nextPath)
  }

  const signUpEnabled = process.env.CMS_DISABLE_SIGNUP !== 'true'

  return (
    <AuthFlowSurface variant="login">
      <LoginForm nextPath={nextPath} signUpEnabled={signUpEnabled} />
    </AuthFlowSurface>
  )
}
