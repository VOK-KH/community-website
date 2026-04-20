import type { Metadata } from 'next'

import { AuthBrandAside } from './_components/auth-brand-aside'
import { AuthCyberBackdrop } from './_components/auth-cyber-backdrop'
import './_components/auth-layout.css'
import { AuthParticles } from './_components/auth-particles'

export const metadata: Metadata = {
  title: {
    template: `%s · ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'}`,
    default: `Account · ${process.env.NEXT_PUBLIC_SITE_NAME ?? 'VokDev'}`,
  },
  description: 'Sign in or create an account for the VokDev community and CMS.',
}

export default function AuthGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="auth-landing min-h-svh">
      <AuthParticles />
      <div className="relative z-10 flex min-h-svh flex-col lg:flex-row">
        <AuthBrandAside />
        <main className="auth-main-panel relative flex min-h-svh flex-1 flex-col justify-center px-4 py-8 sm:px-8 sm:py-10 lg:min-h-0 lg:py-14">
          <div className="mx-auto w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
