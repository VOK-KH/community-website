import { cookies } from 'next/headers'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

async function getCmsIdentity() {
  const cookieStore = await cookies()
  const email = cookieStore.get('cms_email')?.value ?? 'unknown'
  const role = cookieStore.get('cms_role')?.value ?? 'member'
  return { email, role }
}

export default async function DashboardPage() {
  const { email, role } = await getCmsIdentity()
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Dashboard</div>
          <div className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium">{email}</span>
          </div>
        </div>
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>{role}</Badge>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Members</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Manage roles, status, and onboarding in <span className="font-medium">Members</span>.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Announcements</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Draft and publish community updates in <span className="font-medium">Announcements</span>.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Events</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Plan meetups, build nights, and workshops in <span className="font-medium">Events</span>.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}