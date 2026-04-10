'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { FeaturedProjectsSection } from '@/components/landing/FeaturedProjectsSection'
import { MarqueeStrip } from '@/components/landing/MarqueeStrip'
import { CommunitySection } from '@/components/landing/CommunitySection'
import { BlogSection } from '@/components/landing/BlogSection'
import { CTASection } from '@/components/landing/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <MarqueeStrip />
        <StatsSection />
        <FeaturedProjectsSection />
        <CommunitySection />
        <BlogSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
