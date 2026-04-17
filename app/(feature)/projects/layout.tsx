import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const title = 'Projects'
const description =
  'Explore featured work and project ideas from the VokDev community—real builds, experiments, and open collaboration.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/projects',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children
}
