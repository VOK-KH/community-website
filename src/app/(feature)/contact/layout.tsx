import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Contact'
const description =
  'Get in touch with VokDev—questions, feedback, partnerships, and ways to collaborate with the community.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/contact',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
