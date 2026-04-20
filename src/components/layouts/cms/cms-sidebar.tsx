'use client'

import Image from 'next/image'
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

import { cmsChromeGhostIconClass } from './cms-chrome'
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

const navTooltipContentClass =
  'border border-zinc-700 bg-zinc-900 font-medium text-zinc-100 shadow-xl'

type CmsNavDensity = 'desktop' | 'sheet'

/** Same wordmark as `Navbar` (`.nb-logo` / `.nb-v`); CMS sets nav tokens locally — they only exist on `.nb` in inner-pages.css. */
function CmsNavBrandLink({
  className,
  onClick,
}: Readonly<{ className?: string; onClick?: () => void }>) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        'nb-logo justify-start! items-center gap-2 rounded-xl px-2 py-1.5 transition-colors',
        '[--nb-fg:rgb(244_244_245)] [--nb-accent:rgb(0_229_255)]',
        'hover:bg-white/6',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
        className,
      )}
    >
      <Image
        src="/icon.svg"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 object-contain"
        priority
      />
      <span className="nb-v">Vok</span>Dev
    </Link>
  )
}

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

  const link = (
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

  const body = collapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10} className={navTooltipContentClass}>
        {label}
      </TooltipContent>
    </Tooltip>
  ) : (
    link
  )

  return <div className="px-1">{body}</div>
}

function NavSection({
  title,
  collapsed,
  contentClassName,
  children,
}: Readonly<{
  title: string
  collapsed: boolean
  /** Horizontal padding for section block (e.g. sheet uses wider inset). */
  contentClassName?: string
  children: React.ReactNode
}>) {
  if (collapsed) {
    return <div className="flex flex-col gap-0.5 py-1">{children}</div>
  }
  return (
    <div className={cn('px-3 py-2', contentClassName)}>
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
    <div className="flex items-center justify-between gap-2 border-b border-zinc-800/50 px-3 pb-2.5 pt-3.5">
      <CmsNavBrandLink className="min-w-0 shrink" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('shrink-0', cmsChromeGhostIconClass)}
        onClick={onToggleCollapsed}
        aria-label="Collapse sidebar"
      >
        <PanelLeftClose className="size-[18px]" aria-hidden />
      </Button>
    </div>
  )
}

function CmsMobileHeaderActions({ onNavigate }: Readonly<{ onNavigate?: () => void }>) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <Button type="button" variant="ghost" size="icon" className={cmsChromeGhostIconClass} asChild>
        <Link href="/cms/posts" onClick={onNavigate} aria-label="Search announcements">
          <Search className="size-[18px]" aria-hidden />
        </Link>
      </Button>
      <Button type="button" variant="ghost" size="icon" className={cmsChromeGhostIconClass} asChild>
        <Link href="/cms/dashboard" onClick={onNavigate} aria-label="Activity">
          <Bell className="size-[18px]" aria-hidden />
        </Link>
      </Button>
    </div>
  )
}

function CmsSidebarNavGroups({
  role,
  collapsed,
  onNavigate,
  density = 'desktop',
}: Readonly<{
  role: 'admin' | 'member'
  collapsed: boolean
  onNavigate?: () => void
  density?: CmsNavDensity
}>) {
  const sectionPad = density === 'sheet' ? 'px-4' : undefined
  const adminRule = density === 'sheet' ? 'mx-4 my-2 h-px bg-zinc-800/90' : 'mx-3 my-2 h-px bg-zinc-800/90'

  return (
    <>
      <NavSection title="Overview" collapsed={collapsed} contentClassName={sectionPad}>
        {overviewNav.map((item) => (
          <NavLinkButton key={item.href} {...item} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </NavSection>

      <NavSection title="Community" collapsed={collapsed} contentClassName={sectionPad}>
        {communityNav.map((item) => (
          <NavLinkButton key={item.href} {...item} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </NavSection>

      <NavSection title="Account" collapsed={collapsed} contentClassName={sectionPad}>
        {accountNav.map((item) => (
          <NavLinkButton key={item.href} {...item} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </NavSection>

      {role === 'admin' ? (
        <>
          <div className={adminRule} />
          <NavSection title="Admin" collapsed={collapsed} contentClassName={sectionPad}>
            {adminNav.map((item) => (
              <NavLinkButton key={item.href} {...item} collapsed={collapsed} onNavigate={onNavigate} />
            ))}
          </NavSection>
        </>
      ) : null}
    </>
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

      <div className={cn('shrink-0 px-3', collapsed ? 'pt-3' : 'pb-3 pt-2')}>
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 pt-1">
            <CmsWorkspaceMenu user={user} role={role} compact />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cmsChromeGhostIconClass}
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
        <CmsSidebarNavGroups role={role} collapsed={collapsed} />
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
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800/50 px-4 pb-2.5 pt-3.5">
        <CmsNavBrandLink onClick={onNavigate} className="min-w-0 shrink" />
        <CmsMobileHeaderActions onNavigate={onNavigate} />
      </div>

      <div className="shrink-0 px-4 pb-3 pt-2">
        <CmsWorkspaceMenu user={user} role={role} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain pb-2">
        <CmsSidebarNavGroups role={role} collapsed={false} onNavigate={onNavigate} density="sheet" />
      </div>

      <div className="shrink-0 border-t border-zinc-800/80">
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
