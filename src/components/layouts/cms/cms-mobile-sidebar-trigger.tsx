'use client'

import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { cmsChromeGhostIconClass } from './cms-chrome'
import { useCmsLayoutNav } from './cms-layout-context'

/** Opens the CMS navigation sheet on small screens. */
export function CmsMobileSidebarTrigger({ className }: { className?: string }) {
  const { openMobileNav } = useCmsLayoutNav()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex items-center border-b border-zinc-800/50 bg-zinc-950/90 px-3 py-2 text-zinc-100 backdrop-blur-md supports-backdrop-filter:bg-zinc-950/75 md:hidden',
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cmsChromeGhostIconClass}
        onClick={openMobileNav}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" aria-hidden />
      </Button>
    </header>
  )
}
