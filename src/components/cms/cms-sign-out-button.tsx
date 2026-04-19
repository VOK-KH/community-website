'use client'

import { LogOut } from 'lucide-react'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { authClient } from '@/lib/auth/client'
import { cn } from '@/lib/utils'

export async function signOutFromCms() {
  await authClient.signOut()
  window.location.assign('/joint')
}

export function CmsSignOutButton({
  compact = false,
  className,
}: Readonly<{ compact?: boolean; className?: string }>) {
  const [pending, startTransition] = useTransition()

  const button = (
    <Button
      variant={compact ? 'ghost' : 'outline'}
      size={compact ? 'icon' : 'sm'}
      type="button"
      className={cn(
        !compact && 'gap-2 border-border/80 bg-background/50 shadow-sm',
        compact && 'size-8 text-muted-foreground hover:text-foreground',
        className,
      )}
      disabled={pending}
      onClick={() => {
        startTransition(() => void signOutFromCms())
      }}
    >
      <LogOut className={cn('opacity-70', compact ? 'size-4' : 'size-3.5')} aria-hidden />
      {!compact ? 'Sign out' : <span className="sr-only">Sign out</span>}
    </Button>
  )

  if (!compact) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">Sign out</TooltipContent>
    </Tooltip>
  )
}
