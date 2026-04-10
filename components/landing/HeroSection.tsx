'use client'

import { AnimatedSection } from '@/components/AnimatedSection'
import { HeroTitle, HeroSubtitle, HeroButton } from '@/components/HeroAnimation'
import { VokDevBadge } from '@/components/VokDevBadge'
import { VokDevButton } from '@/components/VokDevButton'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <AnimatedSection className="mx-auto max-w-7xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-border/60 bg-card/70 px-2 py-1 backdrop-blur">
          <VokDevBadge variant="secondary" size="sm" withGlow={false}>
            VokDev Community Platform
          </VokDevBadge>
        </div>

        <HeroTitle>Build Faster With People Who Ship</HeroTitle>

        <HeroSubtitle>
          Join a modern community where developers, designers, and product teams
          collaborate on real projects, share practical knowledge, and ship work.
        </HeroSubtitle>

        <HeroButton>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <VokDevButton variant="primary" size="lg">
              Explore Projects
            </VokDevButton>
            <VokDevButton variant="secondary" size="lg" withGlow={false}>
              View Community Guide
            </VokDevButton>
          </div>
        </HeroButton>
      </AnimatedSection>
    </section>
  )
}
