import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

  return (
    <Card className="border-0 shadow-xl ring-1 ring-border/60 sm:rounded-2xl">
      <CardHeader className="space-y-1 pb-2 text-center sm:text-left">
        <CardTitle className="text-2xl font-bold tracking-tight">Join {process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'}</CardTitle>
        <CardDescription className="text-base">
          New here? Create an account. Already a member? Sign in to open the CMS.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 pt-2">
        {signUpEnabled ? (
          <Button asChild size="lg" className="h-12 text-base font-semibold shadow-md">
            <Link href={`/register${q}`}>Create new account</Link>
          </Button>
        ) : null}
        <Button asChild variant="outline" size="lg" className="h-12 text-base font-semibold bg-background">
          <Link href={`/login${q}`}>Log in to existing account</Link>
        </Button>
        <p className="pt-2 text-center text-xs text-muted-foreground sm:text-left">
          By continuing you agree to use a strong password and keep your workspace secure.
        </p>
        <div className="flex justify-center gap-4 pt-2 text-xs text-muted-foreground sm:justify-start">
          <Link href="/" className="underline-offset-4 hover:underline">
            ← Back to site
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
