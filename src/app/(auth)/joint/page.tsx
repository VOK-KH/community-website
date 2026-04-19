import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { LogIn, UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border border-white/8 bg-(--vok-surface)/92 py-0 text-(--vok-text) shadow-2xl shadow-black/45 ring-1 ring-white/6 backdrop-blur-xl">
      <CardHeader className="space-y-2 px-6 pb-1 pt-6 text-center sm:text-left">
        <CardTitle className="text-balance text-2xl font-semibold tracking-tight text-(--vok-text) sm:text-[1.65rem]">
          Join {siteName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 px-6 pb-2 pt-4">
        {signUpEnabled ? (
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-xl border-0 bg-linear-to-br from-(--vok-accent) to-cyan-600 text-(--vok-bg) shadow-lg shadow-cyan-500/20 transition-[transform,box-shadow] "
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
            className="h-12 w-full rounded-xl border-white/15 bg-(--vok-surface2)/60 text-(--vok-text) shadow-sm hover:bg-white/[0.07] hover:text-(--vok-text) dark:border-white/15 dark:hover:bg-white/[0.07]"
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
            className="h-12 w-full rounded-xl border-0 bg-linear-to-br from-(--vok-accent) to-cyan-600 text-(--vok-bg) shadow-lg shadow-cyan-500/20 transition-[transform,box-shadow] hover:scale-[1.01] hover:shadow-cyan-500/30 focus-visible:ring-cyan-400/50"
          >
            <Link href={`/login${q}`} className="gap-2.5 font-semibold">
              <LogIn className="size-5 shrink-0 opacity-95" aria-hidden />
              Log in to existing account
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
