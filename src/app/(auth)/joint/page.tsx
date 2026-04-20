import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react'

import { AuthFlowSurface } from '@/app/(auth)/_components/auth-flow-surface'
import { AuthPasskeySignIn } from '@/app/(auth)/_components/auth-passkey-sign-in'
import { AuthSectionDivider } from '@/app/(auth)/_components/auth-section-divider'
import { JointOAuthButtons } from '@/app/(auth)/_components/joint-oauth-buttons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getEnabledOAuthProviders } from '@/lib/auth/oauth-config'
import { auth } from '@/lib/auth/server'

export const metadata = {
  title: 'Join',
}

function nextFromSearch(sp: Record<string, string | string[] | undefined>): string {
  const nextRaw =
    typeof sp.next === 'string' ? sp.next : Array.isArray(sp.next) ? sp.next[0] : '/cms/dashboard'
  return nextRaw.startsWith('/cms') ? nextRaw : '/cms/dashboard'
}

export default async function JointPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  const sp = await searchParams
  const nextPath = nextFromSearch(sp)

  if (session) {
    redirect(nextPath)
  }

  const signUpEnabled = process.env.CMS_DISABLE_SIGNUP !== 'true'
  const q = `?next=${encodeURIComponent(nextPath)}`
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'
  const oauthProviders = getEnabledOAuthProviders()
  const oauthHint =
    oauthProviders.length === 0
      ? null
      : oauthProviders.length === 2
        ? 'Use Google or GitHub if connected, or continue with email below.'
        : oauthProviders[0] === 'google'
          ? 'Use Google if connected, or continue with email below.'
          : 'Use GitHub if connected, or continue with email below.'

  return (
    <AuthFlowSurface variant="joint">
      <Card className="auth-card-surface gap-0 overflow-hidden rounded-2xl border py-0 text-[var(--vok-text)]">
        <CardHeader className="space-y-2 px-6 pb-1 pt-7 text-center sm:text-left">
          <CardTitle className="text-balance text-2xl font-semibold tracking-tight sm:text-[1.65rem]">
            Join {siteName}
          </CardTitle>
          {oauthHint ? (
            <CardDescription className="text-pretty pt-0.5 text-sm leading-relaxed text-[var(--vok-text2)]">
              {oauthHint}
            </CardDescription>
          ) : (
            <CardDescription className="text-pretty pt-0.5 text-sm leading-relaxed text-[var(--vok-text2)]">
              Create an account or sign in with email—OAuth appears here when your admin enables it.
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="grid gap-3 pb-6 px-6 pt-4">
          <AuthPasskeySignIn nextPath={nextPath} />
          <JointOAuthButtons providers={oauthProviders} callbackURL={nextPath} />
          <AuthSectionDivider label="Or continue with email" />

          {signUpEnabled ? (
            <Button
              asChild
              size="lg"
              className="auth-submit-btn inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl font-semibold shadow-lg transition-[transform,box-shadow]"
            >
              <Link href={`/register${q}`} className="gap-2.5 font-semibold">
                <UserPlus className="size-5 shrink-0 opacity-95" aria-hidden />
                Create new account
              </Link>
            </Button>
          ) : null}

          {signUpEnabled ? (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="auth-outline-btn inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl font-semibold shadow-sm"
            >
              <Link href={`/login${q}`} className="gap-2.5 font-semibold">
                <LogIn className="size-5 shrink-0 opacity-95" aria-hidden />
                Log in to existing account
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="auth-submit-btn inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl font-semibold shadow-lg transition-[transform,box-shadow]"
            >
              <Link href={`/login${q}`} className="gap-2.5 font-semibold">
                <LogIn className="size-5 shrink-0 opacity-95" aria-hidden />
                Log in to existing account
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </AuthFlowSurface>
  )
}
