import Image from 'next/image'
import Link from 'next/link'

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'

export function AuthBrandAside() {
  return (
    <aside className="auth-brand-panel relative hidden w-full flex-col justify-between overflow-hidden border-b px-8 py-10 lg:flex lg:w-[min(42vw,480px)] lg:max-w-md lg:border-b-0 lg:border-r lg:py-14">
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
            Same look as the landing hero: grid, noise, and particles—then Better Auth sessions and rate limits behind
            the scenes.
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
  )
}
