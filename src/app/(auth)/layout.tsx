import Link from 'next/link'
import type { Metadata } from 'next'

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
    <div className="min-h-svh bg-background">
      <div className="flex min-h-svh flex-col lg:flex-row">
        <aside className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-8 py-10 text-white lg:w-[min(42vw,480px)] lg:max-w-md lg:border-b-0 lg:border-r lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(14,165,233,0.2),transparent_50%)]" />

          <div className="relative z-[1] space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sm font-bold ring-1 ring-white/15">
                V
              </span>
              {siteName}
            </Link>
            <div className="space-y-3">
              <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Community tools, one secure sign-in.
              </h1>
              <p className="max-w-sm text-pretty text-sm leading-relaxed text-white/75">
                Manage members, events, and announcements from the CMS—protected with Better Auth sessions and
                rate limits.
              </p>
            </div>
          </div>

          <div className="relative z-[1] mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55 lg:mt-0">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/community" className="transition-colors hover:text-white">
              Community
            </Link>
            <Link href="/joint" className="transition-colors hover:text-white">
              Join or sign in
            </Link>
          </div>
        </aside>

        <main className="relative flex flex-1 flex-col justify-center bg-muted/25 px-4 py-10 sm:px-8 lg:py-14">
          <div className="mx-auto w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
