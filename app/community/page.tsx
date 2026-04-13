import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import {
  CommunityHero,
  CommunityStats,
  CommunityFeatures,
  CommunityMemberSpotlights,
  CommunityCta,
} from '@/components/community'

const title = 'Community'
const description =
  'Join developers who ship real projects, learn in public, and grow together—events, spotlights, and ways to get involved.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/community' },
  openGraph: {
    title: `${title} | VokDev`,
    description,
    url: '/community',
  },
  twitter: {
    title: `${title} | VokDev`,
    description,
  },
}

export default function CommunityPage() {
  return (
    <div className="pg">
      <main className="flex-1">
        <CommunityHero />
        <CommunityStats />
        <CommunityFeatures />
        <CommunityMemberSpotlights />
        <CommunityCta />
      </main>
      <Footer />
    </div>
  )
}
