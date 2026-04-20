'use client'

import { Fingerprint } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'

type Props = {
  nextPath: string
}

function redirectTarget(nextPath: string) {
  return nextPath.startsWith('/cms') ? nextPath : '/cms/dashboard'
}

export function AuthPasskeySignIn({ nextPath }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (typeof window === 'undefined' || typeof PublicKeyCredential === 'undefined') return
    if (!PublicKeyCredential.isConditionalMediationAvailable?.()) return
    void authClient.signIn.passkey({ autoFill: true }).catch(() => {
      /* no-op: no passkey or user cancelled preload */
    })
  }, [])

  function signInWithPasskey() {
    startTransition(async () => {
      const dest = redirectTarget(nextPath)
      const { error } = await authClient.signIn.passkey({
        autoFill: false,
        fetchOptions: {
          onSuccess: () => {
            router.push(dest)
            router.refresh()
          },
        },
      })
      if (error) {
        toast.error(error.message ?? 'Passkey sign-in failed')
      }
    })
  }

  return (
    <div className="relative space-y-2">
      <label htmlFor="auth-passkey-webauthn-slot" className="sr-only">
        Passkey
      </label>
      <input
        id="auth-passkey-webauthn-slot"
        type="text"
        autoComplete="webauthn"
        tabIndex={-1}
        readOnly
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
      />
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={signInWithPasskey}
        className="auth-oauth-outline inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg font-semibold"
      >
        <Fingerprint className="size-5 shrink-0 opacity-90" aria-hidden />
        {pending ? 'Waiting for device…' : 'Continue with passkey'}
      </Button>
    </div>
  )
}
