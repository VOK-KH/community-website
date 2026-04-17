import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Design system'
const description =
  'VokDev UI foundations—components, tokens, and patterns for consistent, accessible community experiences.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/design-system' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/design-system',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function DesignSystemLayout({ children }: { children: ReactNode }) {
  return children
}
