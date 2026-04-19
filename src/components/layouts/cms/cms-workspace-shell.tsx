'use client'

import * as React from 'react'

import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { AuthUserDisplay } from '@/lib/auth/user-display'

import { CmsFooter } from './cms-footer'
import { CmsLayoutProvider } from './cms-layout-context'
import { CmsMobileSidebarTrigger } from './cms-mobile-sidebar-trigger'
import { CmsDesktopSidebar, CmsMobileNavPanel } from './cms-sidebar'

const COLLAPSED_KEY = 'cms-sidebar-collapsed'

export function CmsWorkspaceShell({
  role,
  user,
  children,
}: Readonly<{
  role: 'admin' | 'member'
  user: AuthUserDisplay
  children: React.ReactNode
}>) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COLLAPSED_KEY)
      if (stored === '1') setCollapsed(true)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0')
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const openMobileNav = React.useCallback(() => setMobileOpen(true), [])

  return (
    <CmsLayoutProvider value={{ openMobileNav }}>
      <div className="min-h-svh bg-background text-foreground">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-[min(100%,20rem)] border-r border-zinc-800 bg-zinc-950 p-0 text-zinc-100 sm:max-w-xs"
            showCloseButton
            closeButtonClassName="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
          >
            <SheetTitle className="sr-only">CMS navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Workspace links, admin tools when applicable, and account actions.
            </SheetDescription>
            <CmsMobileNavPanel role={role} user={user} onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex h-svh min-h-0 w-full">
          <CmsDesktopSidebar
            role={role}
            user={user}
            collapsed={collapsed}
            onToggleCollapsed={toggleCollapsed}
          />
          <main className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden shadow-sm">
            <div className="flex h-full min-h-0 flex-1 flex-col">
              <CmsMobileSidebarTrigger className="shrink-0" />
              <ScrollArea className="h-full min-h-0 flex-1">
                <div className="mx-auto w-full px-4 max-w-7xl py-6 md:px-6 md:py-8">{children}</div>
                <CmsFooter />
              </ScrollArea>
            </div>
          </main>
        </div>
      </div>
    </CmsLayoutProvider>
  )
}
