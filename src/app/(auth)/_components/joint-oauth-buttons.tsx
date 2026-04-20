'use client'

import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'
import type { OAuthProviderId } from '@/lib/auth/oauth-config'

function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

function GitHubGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12 2C6.48 2 2 6.58 2 12.06c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0112 6.82c.85.004 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.58.69.48A10.01 10.01 0 0022 12.06C22 6.58 17.52 2 12 2z" />
    </svg>
  )
}

type Props = {
  providers: OAuthProviderId[]
  callbackURL: string
}

export function JointOAuthButtons({ providers, callbackURL }: Props) {
  const [pending, startTransition] = useTransition()

  if (providers.length === 0) return null

  function run(provider: OAuthProviderId) {
    startTransition(async () => {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
      })
      if (error) {
        toast.error(error.message ?? 'Could not start sign-in')
      }
    })
  }

  return (
    <div className="grid gap-2.5">
      {providers.includes('google') ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={pending}
          onClick={() => run('google')}
          className="auth-oauth-outline inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-white/[0.04] font-semibold shadow-sm backdrop-blur-sm"
        >
          <GoogleGlyph className="size-5 shrink-0" />
          Continue with Google
        </Button>
      ) : null}
      {providers.includes('github') ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={pending}
          onClick={() => run('github')}
          className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border-white/18 bg-[#24292f]/85 font-semibold text-white shadow-sm hover:bg-[#24292f] hover:text-white"
        >
          <GitHubGlyph className="size-5 shrink-0 opacity-95" />
          Continue with GitHub
        </Button>
      ) : null}
    </div>
  )
}
