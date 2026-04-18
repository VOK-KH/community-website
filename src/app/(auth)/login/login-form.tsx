'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

import { AuthEmailDivider } from '@/app/(auth)/_components/auth-email-divider'
import { SocialOAuthRow } from '@/app/(auth)/_components/social-oauth-row'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth/client'

type Props = {
  nextPath: string
  signUpEnabled: boolean
}

export function LoginForm({ nextPath, signUpEnabled }: Props) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const site = process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'

  return (
    <Card className="border border-white/10 bg-card/90 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-2xl">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Log in</CardTitle>
        <CardDescription className="text-base">Sign in to {site} CMS with your email.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <SocialOAuthRow />
        <AuthEmailDivider />

        <form
          className="space-y-4 pt-1"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            const fd = new FormData(e.currentTarget)
            const email = String(fd.get('email') ?? '').trim()
            const password = String(fd.get('password') ?? '')
            const next = String(fd.get('next') ?? nextPath)
            startTransition(async () => {
              const { error: signError } = await authClient.signIn.email({
                email,
                password,
                callbackURL: next.startsWith('/cms') ? next : '/cms/dashboard',
              })
              if (signError) {
                setError(signError.message ?? 'Sign in failed')
                return
              }
              router.push(next.startsWith('/cms') ? next : '/cms/dashboard')
              router.refresh()
            })
          }}
        >
          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              required
              autoComplete="email"
              className="h-11 rounded-lg bg-background"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <span className="text-xs text-muted-foreground">10+ characters</span>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={10}
              autoComplete="current-password"
              className="h-11 rounded-lg bg-background"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Button className="h-11 w-full rounded-lg text-base font-semibold shadow-sm" type="submit" disabled={pending}>
            {pending ? 'Signing in…' : 'Log in'}
          </Button>
        </form>

        <div className="flex flex-col gap-3 pt-4 text-center text-sm text-muted-foreground sm:text-left">
          {signUpEnabled ? (
            <p>
              New to {site}?{' '}
              <Link
                className="font-semibold text-primary underline-offset-4 hover:underline"
                href={`/register?next=${encodeURIComponent(nextPath)}`}
              >
                Create an account
              </Link>
            </p>
          ) : null}
          <p>
            <Link className="underline-offset-4 hover:underline" href={`/joint?next=${encodeURIComponent(nextPath)}`}>
              Join options
            </Link>
            {' · '}
            <Link className="underline-offset-4 hover:underline" href="/">
              Home
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
