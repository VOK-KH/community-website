import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { AuthParticles } from './auth-particles'

import './auth-layout.css'

export const metadata: Metadata = {
  title: {
    template: `%s · ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'}`,
    default: `Account · ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'}`,
  },
  description: 'Sign in or create an account for the VokDev community and CMS.',
}

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'

export default function AuthGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="auth-landing min-h-svh">
      <div className="auth-noise" aria-hidden />
      <div className="auth-bg-layer" aria-hidden>
        <div className="auth-bg-grid" />
      </div>
      <AuthParticles />

      <div className="relative z-10 flex min-h-svh flex-col lg:flex-row">
        <aside className="auth-brand-panel relative flex flex-col justify-between overflow-hidden border-b px-8 py-10 lg:w-[min(42vw,480px)] lg:max-w-md lg:border-b-0 lg:border-r lg:py-14">
          <div className="relative z-[1] space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[var(--vok-text)] transition-opacity hover:opacity-90"
            >
              <span className="auth-accent-ring relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[var(--vok-surface2)] ring-1 ring-white/10">
                <Image src="/icon.svg" alt="" width={44} height={44} className="h-9 w-9 object-contain" priority />
              </span>
              <span className="font-semibold">{siteName}</span>
            </Link>
            <div className="space-y-4">
              <h1 className="text-balance text-2xl font-semibold tracking-tight text-[var(--vok-text)] sm:text-3xl">
                Community tools,{' '}
                <span className="bg-gradient-to-r from-[var(--vok-accent)] to-[var(--vok-violet)] bg-clip-text text-transparent">
                  one secure sign-in.
                </span>
              </h1>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-[var(--vok-text2)]">
                Same look as the landing hero: grid, noise, and particles—then Better Auth sessions and rate limits
                behind the scenes.
              </p>
            </div>
          </div>

          <div className="relative z-[1] mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs lg:mt-0">
            <Link href="/" className="auth-link-muted transition-colors">
              Home
            </Link>
            <Link href="/community" className="auth-link-muted transition-colors">
              Community
            </Link>
            <Link href="/joint" className="auth-link-muted transition-colors">
              Join or sign in
            </Link>
          </div>
        </aside>

        <main className="auth-main-panel relative flex flex-1 flex-col justify-center px-4 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
