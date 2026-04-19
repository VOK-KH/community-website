'use client'

import Link from 'next/link'
import { useTransition } from 'react'
import { LogOut, MoreVertical, Settings, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { signOutFromCms } from '@/components/cms/cms-sign-out-button'
import { cn } from '@/lib/utils'

const accountMenuSurface =
  'z-50 min-w-[12rem] rounded-2xl border border-zinc-700/90 bg-zinc-900 p-1.5 shadow-2xl shadow-black/40'

const accountMenuItem =
  'cursor-pointer rounded-xl px-2.5 py-2 text-sm text-zinc-100 focus:bg-zinc-800 data-[highlighted]:bg-zinc-800'

export function CmsSidebarAccountFooter({
  displayName,
  email,
  initials,
  image,
  collapsed,
}: Readonly<{
  displayName: string
  email: string
  initials: string
  image: string | null
  collapsed?: boolean
}>) {
  const [pending, startTransition] = useTransition()

  const menu = (
    <DropdownMenuContent
      side={collapsed ? 'right' : 'top'}
      align="end"
      sideOffset={8}
      className={accountMenuSurface}
    >
      <DropdownMenuItem asChild>
        <Link href="/cms/profile" className={cn(accountMenuItem, 'flex items-center gap-2')}>
          <User className="size-4 text-zinc-400" aria-hidden />
          Profile
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/cms/settings" className={cn(accountMenuItem, 'flex items-center gap-2')}>
          <Settings className="size-4 text-zinc-400" aria-hidden />
          Settings
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator className="bg-zinc-800" />
      <DropdownMenuItem
        variant="destructive"
        disabled={pending}
        className={cn(accountMenuItem, 'flex items-center gap-2 text-red-400 focus:bg-red-950/50 focus:text-red-300')}
        onSelect={(e) => {
          e.preventDefault()
          startTransition(() => void signOutFromCms())
        }}
      >
        <LogOut className="size-4" aria-hidden />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )

  if (collapsed) {
    return (
      <div className="flex justify-center px-1 pb-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-800/80 text-zinc-100 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/60"
              aria-label="Account menu"
            >
              <Avatar className="size-9 border border-zinc-600/80">
                {image ? <AvatarImage src={image} alt="" className="object-cover" /> : null}
                <AvatarFallback className="bg-linear-to-br from-violet-500 to-fuchsia-600 text-[11px] font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          {menu}
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div className="mx-2 mb-3 rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-2 shadow-inner shadow-black/20">
      <div className="flex items-center gap-2">
        <Avatar className="size-9 shrink-0 border border-zinc-600/80">
          {image ? <AvatarImage src={image} alt="" className="object-cover" /> : null}
          <AvatarFallback className="bg-linear-to-br from-violet-500 to-fuchsia-600 text-[11px] font-semibold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-tight text-zinc-100">{displayName}</p>
          <p className="truncate text-[11px] text-zinc-500">{email}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-xl p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500/50"
              aria-label="Account menu"
            >
              <MoreVertical className="size-4" aria-hidden />
            </button>
          </DropdownMenuTrigger>
          {menu}
        </DropdownMenu>
      </div>
    </div>
  )
}
