'use client'

import { AnimatedCard } from '@/components/AnimatedCard'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import { VokDevCard } from '@/components/VokDevCard'
import { communityBenefits } from './data'

export function CommunitySection() {
  return (
    <section className="bg-muted/30 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Join Our Community</h2>
          <p className="text-lg text-muted-foreground">
            Collaborate with professionals focused on practical product delivery.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {communityBenefits.map((item, index) => (
            <StaggerItem key={item.title}>
              <AnimatedCard index={index}>
                <VokDevCard variant="featured" className="h-full">
                  <div className="mb-4 h-1.5 w-16 rounded-full bg-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </VokDevCard>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
