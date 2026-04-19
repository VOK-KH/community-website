'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { AuthEmailDivider } from '@/app/(auth)/_components/auth-email-divider'
import { SocialOAuthRow } from '@/app/(auth)/_components/social-oauth-row'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth/client'
import { validateAuthEmailPassword } from '@/lib/auth/form-validation'

type Props = { nextPath: string }

export function RegisterForm({ nextPath }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const site = process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'

  return (
    <Card className="border border-white/10 bg-card/90 shadow-2xl shadow-black/30 backdrop-blur-xl sm:rounded-2xl">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl font-bold tracking-tight">Create account</CardTitle>
        <CardDescription className="text-base">It&apos;s quick—we only need a name, email, and a strong password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <SocialOAuthRow />
        <AuthEmailDivider label="or sign up with email" />

        <form
          className="space-y-4 pt-1"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const name = String(fd.get('name') ?? '').trim()
            const email = String(fd.get('email') ?? '').trim()
            const password = String(fd.get('password') ?? '')
            const next = String(fd.get('next') ?? nextPath)
            const validationError = validateAuthEmailPassword(email, password)
            if (validationError) {
              toast.error(validationError)
              return
            }
            startTransition(async () => {
              const { error: signError } = await authClient.signUp.email({
                name: name || email.split('@')[0] || 'Member',
                email,
                password,
                callbackURL: next.startsWith('/cms') ? next : '/cms/dashboard',
              })
              if (signError) {
                toast.error(signError.message ?? 'Sign up failed')
                return
              }
              router.push(next.startsWith('/cms') ? next : '/cms/dashboard')
              router.refresh()
            })
          }}
        >
          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Display name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="How we should greet you"
              autoComplete="name"
              className="h-11 rounded-lg bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              placeholder="name@company.com"
              autoComplete="email"
              className="h-11 rounded-lg bg-background"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <span className="text-xs text-muted-foreground">min. 10 characters</span>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="h-11 rounded-lg bg-background"
            />
          </div>

          <Button className="h-11 w-full rounded-lg text-base font-semibold shadow-sm" type="submit" disabled={pending}>
            {pending ? 'Creating account…' : 'Sign up'}
          </Button>
        </form>

        <p className="pt-4 text-center text-sm text-muted-foreground sm:text-left">
          Already on {site}?{' '}
          <Link
            className="font-semibold text-primary underline-offset-4 hover:underline"
            href={`/login?next=${encodeURIComponent(nextPath)}`}
          >
            Log in
          </Link>
          {' · '}
          <Link className="underline-offset-4 hover:underline" href={`/joint?next=${encodeURIComponent(nextPath)}`}>
            Join hub
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
