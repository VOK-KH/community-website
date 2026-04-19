'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import {
  Bell,
  Cctv,
  CalendarDays,
  LayoutDashboard,
  Megaphone,
  PanelLeft,
  PanelLeftClose,
  Search,
  Settings,
  User,
  Users,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { AuthUserDisplay } from '@/lib/auth/user-display'
import { cn } from '@/lib/utils'

import { CmsSidebarAccountFooter } from './cms-sidebar-account-footer'
import { CmsWorkspaceMenu } from './cms-workspace-menu'

const overviewNav = [
  { href: '/cms/dashboard', label: 'Dashboard', icon: LayoutDashboard },
] as const

const communityNav = [
  { href: '/cms/members', label: 'Members', icon: Users },
  { href: '/cms/posts', label: 'Announcements', icon: Megaphone },
  { href: '/cms/events', label: 'Events', icon: CalendarDays },
] as const

const accountNav = [
  { href: '/cms/profile', label: 'Profile', icon: User },
  { href: '/cms/settings', label: 'Settings', icon: Settings },
] as const

const adminNav = [{ href: '/cms/admin/audit', label: 'Audit log', icon: Cctv }] as const

function NavLinkButton({
  href,
  label,
  icon: Icon,
  collapsed,
  onNavigate,
}: Readonly<{
  href: string
  label: string
  icon: LucideIcon
  collapsed: boolean
  onNavigate?: () => void
}>) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(`${href}/`)

  const inner = (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] font-medium tracking-tight transition-colors',
        'text-zinc-300 hover:bg-white/6 hover:text-zinc-50',
        !active && 'hover:[&_svg]:text-zinc-300',
        active && 'bg-white/10 text-white shadow-sm shadow-black/10',
        collapsed && 'justify-center px-0',
      )}
    >
      <Icon
        className={cn(
          'size-[18px] shrink-0 transition-colors',
          active ? 'text-zinc-100' : 'text-zinc-500',
        )}
        aria-hidden
      />
      {!collapsed ? <span className="truncate">{label}</span> : <span className="sr-only">{label}</span>}
    </Link>
  )

  if (!collapsed) return <div className="px-1">{inner}</div>

  return (
    <div className="px-1">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          className="border border-zinc-700 bg-zinc-900 font-medium text-zinc-100 shadow-xl"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

function NavSection({
  title,
  collapsed,
  children,
}: Readonly<{ title: string; collapsed: boolean; children: React.ReactNode }>) {
  if (collapsed) {
    return <div className="flex flex-col gap-0.5 py-1">{children}</div>
  }
  return (
    <div className="px-3 py-2">
      <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">{title}</p>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  )
}

function CmsSidebarHeaderChrome({
  collapsed,
  onToggleCollapsed,
}: Readonly<{ collapsed: boolean; onToggleCollapsed: () => void }>) {
  if (collapsed) return null

  return (
    <div className="flex items-center justify-between gap-2 px-3 pt-4 pb-1">
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-tight text-zinc-100 transition-colors hover:text-white"
      >
        VokDev
      </Link>
      <div className="flex items-center gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          asChild
        >
          <Link href="/cms/posts" aria-label="Search announcements">
            <Search className="size-[18px]" aria-hidden />
          </Link>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          asChild
        >
          <Link href="/cms/dashboard" aria-label="Activity">
            <Bell className="size-[18px]" aria-hidden />
          </Link>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          onClick={onToggleCollapsed}
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="size-[18px]" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

export function CmsDesktopSidebar({
  role,
  user,
  collapsed,
  onToggleCollapsed,
}: Readonly<{
  role: 'admin' | 'member'
  user: AuthUserDisplay
  collapsed: boolean
  onToggleCollapsed: () => void
}>) {
  return (
    <aside
      className={cn(
        'relative z-10 hidden h-svh shrink-0 flex-col border-r border-zinc-800/90 bg-zinc-950 text-zinc-100 transition-[width] duration-200 ease-out md:flex',
        collapsed ? 'w-18' : 'w-64',
      )}
    >
      <CmsSidebarHeaderChrome collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} />

      <div className={cn('shrink-0 px-3', collapsed ? 'pt-3' : 'pb-3 pt-1')}>
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 pt-1">
            <CmsWorkspaceMenu user={user} role={role} compact />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              onClick={onToggleCollapsed}
              aria-label="Expand sidebar"
            >
              <PanelLeft className="size-4" aria-hidden />
            </Button>
          </div>
        ) : (
          <CmsWorkspaceMenu user={user} role={role} />
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain pb-2">
        <NavSection title="Overview" collapsed={collapsed}>
          {overviewNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={collapsed} />
          ))}
        </NavSection>

        <NavSection title="Community" collapsed={collapsed}>
          {communityNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={collapsed} />
          ))}
        </NavSection>

        <NavSection title="Account" collapsed={collapsed}>
          {accountNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={collapsed} />
          ))}
        </NavSection>

        {role === 'admin' ? (
          <>
            <div className="mx-3 my-2 h-px bg-zinc-800/90" />
            <NavSection title="Admin" collapsed={collapsed}>
              {adminNav.map((item) => (
                <NavLinkButton key={item.href} {...item} collapsed={collapsed} />
              ))}
            </NavSection>
          </>
        ) : null}
      </div>

      <div className="mt-auto shrink-0 border-t border-zinc-800/80 pt-1">
        <CmsSidebarAccountFooter
          displayName={user.displayName}
          email={user.email}
          initials={user.initials}
          image={user.image}
          collapsed={collapsed}
        />
      </div>
    </aside>
  )
}

/** Full-width nav for the mobile sheet (labels always visible). */
export function CmsMobileNavPanel({
  role,
  user,
  onNavigate,
}: Readonly<{
  role: 'admin' | 'member'
  user: AuthUserDisplay
  onNavigate?: () => void
}>) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-zinc-950 text-zinc-100">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800/90 px-4 pt-4 pb-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="text-[15px] font-semibold tracking-tight text-zinc-100"
        >
          VokDev
        </Link>
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            asChild
          >
            <Link href="/cms/posts" onClick={onNavigate} aria-label="Search announcements">
              <Search className="size-[18px]" aria-hidden />
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
            asChild
          >
            <Link href="/cms/dashboard" onClick={onNavigate} aria-label="Activity">
              <Bell className="size-[18px]" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>

      <div className="shrink-0 px-4 pb-3 pt-2">
        <CmsWorkspaceMenu user={user} role={role} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-2">
        <NavSection title="Overview" collapsed={false}>
          {overviewNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={false} onNavigate={onNavigate} />
          ))}
        </NavSection>
        <NavSection title="Community" collapsed={false}>
          {communityNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={false} onNavigate={onNavigate} />
          ))}
        </NavSection>
        <NavSection title="Account" collapsed={false}>
          {accountNav.map((item) => (
            <NavLinkButton key={item.href} {...item} collapsed={false} onNavigate={onNavigate} />
          ))}
        </NavSection>
        {role === 'admin' ? (
          <>
            <div className="mx-3 my-2 h-px bg-zinc-800/90" />
            <NavSection title="Admin" collapsed={false}>
              {adminNav.map((item) => (
                <NavLinkButton key={item.href} {...item} collapsed={false} onNavigate={onNavigate} />
              ))}
            </NavSection>
          </>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-zinc-800/90">
        <CmsSidebarAccountFooter
          displayName={user.displayName}
          email={user.email}
          initials={user.initials}
          image={user.image}
          collapsed={false}
        />
      </div>
    </div>
  )
}
