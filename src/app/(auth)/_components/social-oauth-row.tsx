'use client'

import { Button } from '@/components/ui/button'

/**
 * Visual row matching common “social login” patterns (Facebook / LinkedIn / X).
 * Wire Better Auth `socialProviders` and enable these when ready.
 */
export function SocialOAuthRow() {
  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-muted-foreground">Quick sign-in (coming soon)</p>
      <div className="grid gap-2 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-11 border-transparent bg-[#1877F2] font-semibold text-white opacity-70 shadow-sm"
          title="Connect Facebook in Better Auth to enable"
        >
          Facebook
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-11 border-transparent bg-[#0A66C2] font-semibold text-white opacity-70 shadow-sm"
          title="Connect LinkedIn in Better Auth to enable"
        >
          LinkedIn
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled
          className="h-11 border border-border bg-background font-semibold text-foreground opacity-70 shadow-sm dark:bg-zinc-950"
          title="Connect X in Better Auth to enable"
        >
          X
        </Button>
      </div>
    </div>
  )
}
