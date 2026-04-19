'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LayoutDashboard, LogIn, LogOut, User, UserRound } from 'lucide-react'

import { authClient } from '@/lib/auth/client'
import { authUserDisplay } from '@/lib/auth/user-display'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const menuSurface =
  'z-[200] min-w-[14rem] rounded-2xl border border-zinc-700/90 bg-zinc-950 p-1.5 text-zinc-100 shadow-2xl shadow-black/50'

const menuItem =
  'relative flex w-full cursor-pointer select-none items-center gap-2 rounded-xl px-2.5 py-2 text-sm outline-none focus:bg-zinc-800 data-[highlighted]:bg-zinc-800 data-[highlighted]:text-zinc-50'

function authNextQuery(pathname: string) {
  const next = pathname.startsWith('/cms') ? pathname : '/cms/dashboard'
  return `?next=${encodeURIComponent(next)}`
}

async function signOutToHome() {
  await authClient.signOut()
  window.location.assign('/')
}

export function NavUserMenu({
  variant = 'navbar',
  className,
}: Readonly<{ variant?: 'navbar' | 'island' | 'expanded'; className?: string }>) {
  const pathname = usePathname() ?? '/'
  const { data, isPending } = authClient.useSession()

  const user = data?.user
  const signedIn = !!user?.email
  const display = user?.email ? authUserDisplay(user) : null

  const triggerAvatar = (
    <Avatar
      className={cn(
        'shrink-0 border border-white/15 bg-zinc-800',
        variant === 'expanded' ? 'size-10' : 'size-8',
      )}
    >
      {display?.image ? <AvatarImage src={display.image} alt="" className="object-cover" /> : null}
      <AvatarFallback
        className={cn(
          'text-[11px] font-semibold text-white',
          signedIn
            ? 'bg-linear-to-br from-violet-500 to-fuchsia-600'
            : 'bg-zinc-700 text-zinc-200',
        )}
      >
        {signedIn ? (display?.initials ?? '?') : <UserRound className="size-4 opacity-90" aria-hidden />}
      </AvatarFallback>
    </Avatar>
  )

  if (isPending) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5',
          variant === 'expanded' ? 'size-10' : 'size-8',
          className,
        )}
        aria-hidden
      >
        <span className="size-4 animate-pulse rounded-full bg-white/20" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full transition-[box-shadow,transform] hover:ring-2 hover:ring-cyan-400/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50',
            variant === 'expanded' &&
              'w-full gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 hover:ring-0 justify-between',
            variant !== 'expanded' && 'rounded-full',
            className,
          )}
          aria-label={signedIn ? 'Account menu' : 'Sign in menu'}
        >
          {variant === 'expanded' ? (
            <>
              <span className="flex min-w-0 flex-1 items-center gap-3">
                {triggerAvatar}
                <span className="min-w-0 text-left">
                  <span className="block truncate text-sm font-medium text-(--nb-fg)">
                    {signedIn ? display?.displayName : 'Guest'}
                  </span>
                  <span className="block truncate text-xs text-(--nb-fg-muted)">
                    {signedIn ? display?.email : 'Sign in to use the CMS'}
                  </span>
                </span>
              </span>
              <ChevronDown className="size-4 shrink-0 text-(--nb-fg-muted)" aria-hidden />
            </>
          ) : (
            triggerAvatar
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" sideOffset={8} className={menuSurface}>
        {signedIn && display ? (
          <>
            <div className="rounded-xl bg-zinc-900/80 px-2.5 py-2">
              <p className="truncate text-sm font-semibold text-zinc-50">{display.displayName}</p>
              <p className="truncate text-xs text-zinc-500">{display.email}</p>
            </div>
            <DropdownMenuSeparator className="my-1.5 bg-zinc-800" />
            <DropdownMenuItem asChild>
              <Link href="/cms/dashboard" className={menuItem}>
                <LayoutDashboard className="size-4 text-zinc-400" aria-hidden />
                CMS dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/cms/profile" className={menuItem}>
                <User className="size-4 text-zinc-400" aria-hidden />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5 bg-zinc-800" />
            <DropdownMenuItem
              className={cn(menuItem, 'text-red-300 focus:bg-red-950/40 focus:text-red-200')}
              onSelect={(e) => {
                e.preventDefault()
                void signOutToHome()
              }}
            >
              <LogOut className="size-4" aria-hidden />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href={`/login${authNextQuery(pathname)}`} className={menuItem}>
                <LogIn className="size-4 text-zinc-400" aria-hidden />
                Sign in
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/joint${authNextQuery(pathname)}`} className={menuItem}>
                <User className="size-4 text-zinc-400" aria-hidden />
                Join
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
