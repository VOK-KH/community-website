'use client'

import Link from 'next/link'
import { AnimatedCard } from '@/components/AnimatedCard'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import { VokDevBadge } from '@/components/VokDevBadge'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardDescription, VokDevCardTitle } from '@/components/VokDevCard'
import { featuredProjects } from './data'

export function FeaturedProjectsSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Discover community-built products and open collaborations.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.id}>
              <AnimatedCard index={index}>
                <VokDevCard variant="interactive" className="h-full border-border/60 bg-card/70 backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Case {String(index + 1).padStart(2, '0')}
                    </span>
                    <VokDevBadge variant="secondary" size="sm" withGlow={false}>
                      {project.category}
                    </VokDevBadge>
                  </div>

                  <VokDevCardTitle className="mb-3">{project.title}</VokDevCardTitle>
                  <VokDevCardDescription className="mb-5">{project.description}</VokDevCardDescription>

                  <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4 text-sm text-muted-foreground">
                    <span>{project.members} members</span>
                    <span>{project.stars} stars</span>
                  </div>
                </VokDevCard>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <VokDevButton variant="ghost" withGlow={false}>
              View All Projects
            </VokDevButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
