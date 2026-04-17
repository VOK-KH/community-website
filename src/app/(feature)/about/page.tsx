'use client'

import Footer from '@/components/Footer'
import {
  AboutHero,
  AboutMission,
  AboutValues,
  AboutImpact,
  AboutStory,
  AboutTeam,
  AboutCta,
} from '@/components/about'

export default function AboutPage() {
  return (
    <div className="pg">
      <main className="flex-1">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutImpact />
        <AboutStory />
        <AboutTeam />
        <AboutCta />
      </main>
      <Footer />
    </div>
  )
}
