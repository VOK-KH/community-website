'use client'

import Link from 'next/link'
import { Check, ChevronDown, Globe, LayoutDashboard } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const menuSurface =
  'z-50 min-w-[15.5rem] rounded-2xl border border-zinc-700/90 bg-zinc-900 p-1.5 shadow-2xl shadow-black/40'

const menuItem =
  'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-2 text-sm text-zinc-100 outline-none focus:bg-zinc-800 data-[highlighted]:bg-zinc-800 data-[highlighted]:text-zinc-50'

export function CmsWorkspaceMenu({
  user,
  role,
  compact,
}: Readonly<{
  user: { displayName: string; email: string; initials: string }
  role: 'admin' | 'member'
  compact?: boolean
}>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'group flex w-full items-center gap-2.5 rounded-2xl border border-zinc-700/60 bg-zinc-800/80 px-2.5 py-2 text-left transition-colors',
            'hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60',
            compact && 'size-11 justify-center rounded-full px-0 py-0',
          )}
          aria-label={compact ? 'Workspace menu' : 'Open workspace menu'}
        >
          <Avatar className={cn('size-8 shrink-0 border border-zinc-600/80', compact && 'size-9')}>
            <AvatarFallback className="bg-linear-to-br from-violet-500 to-fuchsia-600 text-[11px] font-semibold text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          {!compact ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold tracking-tight text-zinc-50">VokDev CMS</p>
                <p className="truncate text-[11px] text-zinc-500">{user.displayName}</p>
              </div>
              <ChevronDown
                className="size-4 shrink-0 text-zinc-500 transition-transform group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </>
          ) : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" sideOffset={8} className={menuSurface}>
        <div className="rounded-xl bg-zinc-800/50 px-2.5 py-2">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Current workspace</p>
          <div className="mt-2 flex items-center gap-2">
            <Avatar className="size-8 border border-zinc-600/80">
              <AvatarFallback className="bg-linear-to-br from-violet-500 to-fuchsia-600 text-[11px] font-semibold text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-50">VokDev CMS</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">{role}</p>
            </div>
            <Check className="size-4 shrink-0 text-emerald-400" aria-hidden />
          </div>
        </div>
        <DropdownMenuSeparator className="my-1.5 bg-zinc-800" />
        <DropdownMenuItem asChild>
          <Link href="/cms/dashboard" className={menuItem}>
            <LayoutDashboard className="size-4 shrink-0 text-zinc-400" aria-hidden />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/" className={menuItem}>
            <Globe className="size-4 shrink-0 text-zinc-400" aria-hidden />
            View community site
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
