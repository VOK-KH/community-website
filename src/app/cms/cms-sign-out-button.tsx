'use client'

import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'

export function CmsSignOutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await authClient.signOut()
          window.location.assign('/joint')
        })
      }}
    >
      Sign out
    </Button>
  )
}
