'use client'

import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useCmsLayoutNav } from './cms-layout-context'

/** Opens the CMS navigation sheet on small screens. */
export function CmsMobileSidebarTrigger({ className }: { className?: string }) {
  const { openMobileNav } = useCmsLayoutNav()

  return (
    <div
      className={cn(
        'sticky top-0 z-20 flex border-b border-zinc-800/90 bg-zinc-950/95 px-2 py-2 text-zinc-100 backdrop-blur-md md:hidden',
        className,
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        onClick={openMobileNav}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" aria-hidden />
      </Button>
    </div>
  )
}
