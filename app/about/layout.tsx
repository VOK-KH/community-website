import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'About'
const description =
  'Learn VokDev’s mission, values, and story—the open community for developers who ship real projects and learn in public.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/about',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
