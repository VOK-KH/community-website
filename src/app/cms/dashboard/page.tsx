import { Badge } from '@/components/ui/badge'

import { CmsDashboardOverview } from '@/components/cms/cms-dashboard-overview'
import { getCmsSessionDisplay, requireCmsSession, resolveCmsRole } from '@/lib/auth/cms'

function greetingForHour(hour: number) {
  if (hour < 5) return 'Welcome back'
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default async function DashboardPage() {
  const session = await requireCmsSession()
  const user = getCmsSessionDisplay(session)
  const role = resolveCmsRole(session)
  const hour = new Date().getHours()
  const greeting = greetingForHour(hour)

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 px-5 py-8 text-zinc-50 shadow-lg shadow-zinc-950/20 sm:px-8 sm:py-10 dark:border-zinc-800">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-88 rounded-full bg-violet-600/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-fuchsia-600/20 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">VokDev CMS</p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {greeting},{' '}
              <span className="bg-linear-to-r from-white to-zinc-300 bg-clip-text text-transparent">{user.displayName}</span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              This workspace keeps your community organized: members, announcements, and events stay in sync here. Use
              the snapshot below to see what is live, what is still in draft, and what is coming up next.
            </p>
            <p className="text-sm text-zinc-500">
              Signed in as <span className="font-medium text-zinc-200">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <Badge
              variant={role === 'admin' ? 'default' : 'secondary'}
              className="border-zinc-700 bg-zinc-900/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-100 hover:bg-zinc-900"
            >
              {role}
            </Badge>
            <Badge
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-200"
            >
              Session active
            </Badge>
          </div>
        </div>
      </section>

      <CmsDashboardOverview role={role} />
    </div>
  )
}
