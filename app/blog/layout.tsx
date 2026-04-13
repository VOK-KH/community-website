import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Blog'
const description =
  'Articles and guides from the VokDev community—React, design, backend, and shipping projects in the open.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/blog',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children
}
