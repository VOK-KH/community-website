'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Cctv,
  Megaphone,
  Settings,
  Sparkles,
  User,
  Users,
} from 'lucide-react'

import { cmsStorage, type CmsEvent, type CmsPost } from '@/lib/cms/storage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function formatEventWhen(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function pickNextEvent(events: CmsEvent[], nowMs: number): CmsEvent | null {
  const upcoming = events
    .filter((e) => e.published && new Date(e.startsAt).getTime() >= nowMs)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
  return upcoming[0] ?? null
}

function recentPosts(posts: CmsPost[], limit: number) {
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, limit)
}

type DashboardSnapshot = {
  counts: {
    membersTotal: number
    membersActive: number
    postsTotal: number
    postsPublished: number
    postsDraft: number
    eventsTotal: number
    eventsPublished: number
    eventsUpcoming: number
  }
  nextEvent: CmsEvent | null
  latestPosts: CmsPost[]
}

function buildDashboardSnapshot(nowMs: number): DashboardSnapshot {
  const members = cmsStorage.members.list()
  const posts = cmsStorage.posts.list()
  const events = cmsStorage.events.list()

  const activeMembers = members.filter((m) => m.status === 'active').length
  const publishedPosts = posts.filter((p) => p.published).length
  const draftPosts = posts.length - publishedPosts
  const publishedEvents = events.filter((e) => e.published).length
  const upcomingEvents = events.filter(
    (e) => e.published && new Date(e.startsAt).getTime() >= nowMs,
  ).length

  return {
    counts: {
      membersTotal: members.length,
      membersActive: activeMembers,
      postsTotal: posts.length,
      postsPublished: publishedPosts,
      postsDraft: draftPosts,
      eventsTotal: events.length,
      eventsPublished: publishedEvents,
      eventsUpcoming: upcomingEvents,
    },
    nextEvent: pickNextEvent(events, nowMs),
    latestPosts: recentPosts(posts, 3),
  }
}

export function CmsDashboardOverview({ role }: Readonly<{ role: 'admin' | 'member' }>) {
  const [tick, setTick] = React.useState(0)
  const [snapshot, setSnapshot] = React.useState<DashboardSnapshot | null>(null)

  const refresh = React.useCallback(() => setTick((t) => t + 1), [])

  React.useEffect(() => {
    setSnapshot(buildDashboardSnapshot(Date.now()))
  }, [tick])

  React.useEffect(() => {
    const onFocus = () => refresh()
    const onVis = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [refresh])

  const counts = snapshot?.counts
  const nextEvent = snapshot?.nextEvent ?? null
  const latestPosts = snapshot?.latestPosts ?? []

  const quickLinks = [
    { href: '/cms/members', label: 'Members', description: 'Roles, status, onboarding', icon: Users },
    { href: '/cms/posts', label: 'Announcements', description: 'Draft and publish updates', icon: Megaphone },
    { href: '/cms/events', label: 'Events', description: 'Meetups and workshops', icon: CalendarDays },
    { href: '/cms/profile', label: 'Profile', description: 'Your public-facing details', icon: User },
    { href: '/cms/settings', label: 'Settings', description: 'Preferences for this workspace', icon: Settings },
    ...(role === 'admin'
      ? ([{ href: '/cms/admin/audit', label: 'Audit log', description: 'Review sensitive actions', icon: Cctv }] as const)
      : []),
  ]

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Workspace snapshot</h2>
            <p className="text-sm text-muted-foreground">
              Live counts from your browser workspace (same data as Members, Announcements, and Events).
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={refresh}>
            Refresh
          </Button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardDescription>Members</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{counts?.membersTotal ?? '—'}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{counts?.membersActive ?? '—'}</span> active
            </CardContent>
          </Card>
          <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardDescription>Announcements</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{counts?.postsTotal ?? '—'}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{counts?.postsPublished ?? '—'}</span> published ·{' '}
              <span className="font-medium text-foreground">{counts?.postsDraft ?? '—'}</span> drafts
            </CardContent>
          </Card>
          <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardDescription>Events</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{counts?.eventsTotal ?? '—'}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{counts?.eventsPublished ?? '—'}</span> published ·{' '}
              <span className="font-medium text-foreground">{counts?.eventsUpcoming ?? '—'}</span> upcoming
            </CardContent>
          </Card>
          <Card className="border-zinc-200/80 bg-linear-to-br from-violet-500/10 via-background to-fuchsia-500/10 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-violet-600 dark:text-violet-300" aria-hidden />
                Next on the calendar
              </CardDescription>
              <CardTitle className="text-base font-semibold leading-snug">
                {nextEvent ? nextEvent.title : 'No upcoming events'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {nextEvent ? (
                <>
                  {formatEventWhen(nextEvent.startsAt)}
                  {nextEvent.location ? (
                    <>
                      {' '}
                      · <span className="text-foreground/80">{nextEvent.location}</span>
                    </>
                  ) : null}
                </>
              ) : (
                'Publish an event with a future start time to see it here.'
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-zinc-200/80 shadow-sm lg:col-span-2 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base">Shortcuts</CardTitle>
            <CardDescription>Jump to the tools you use most.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-colors',
                  'hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-800 dark:hover:bg-zinc-950/40',
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                  <item.icon className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-semibold tracking-tight">
                    {item.label}
                    <ArrowRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-base">Latest announcements</CardTitle>
            <CardDescription>Newest first from your workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestPosts.length ? (
              latestPosts.map((p) => (
                <div key={p.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800/80">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{p.title}</p>
                    <Badge variant={p.published ? 'default' : 'secondary'} className="shrink-0 text-[10px]">
                      {p.published ? 'Live' : 'Draft'}
                    </Badge>
                  </div>
                  {p.tags.length ? (
                    <p className="mt-1.5 text-[11px] text-muted-foreground">{p.tags.slice(0, 4).join(' · ')}</p>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No announcements yet.</p>
            )}
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/cms/posts">Open announcements</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
