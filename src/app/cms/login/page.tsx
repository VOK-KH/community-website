import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

async function loginAction(formData: FormData) {
  'use server'

  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const role = String(formData.get('role') ?? 'member')
  const next = String(formData.get('next') ?? '/cms/dashboard')

  // Minimal demo auth:
  // - any email logs in
  // - role can be member/admin (admin should be used by trusted users)
  if (!email) {
    redirect('/cms/login')
  }

  const cookieStore = await cookies()
  cookieStore.set('cms_session', 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  cookieStore.set('cms_role', role === 'admin' ? 'admin' : 'member', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  cookieStore.set('cms_email', email, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  redirect(next.startsWith('/cms') ? next : '/cms/dashboard')
}

export default async function CmsLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const next =
    typeof sp.next === 'string' ? sp.next : Array.isArray(sp.next) ? sp.next[0] : '/cms/dashboard'

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md items-center px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in to CMS</CardTitle>
          <CardDescription>Member-only area for community management.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-4">
            <input type="hidden" name="next" value={next} />

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@vokdev.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" placeholder="member (or admin)" defaultValue="member" />
              <div className="text-xs text-muted-foreground">
                Tip: enter <span className="font-medium">admin</span> to see admin pages.
              </div>
            </div>

            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>

          <div className="mt-4 text-xs text-muted-foreground">
            Back to site: <Link className="underline" href="/">Home</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

