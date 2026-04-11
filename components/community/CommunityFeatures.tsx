import { VokDevCard } from '@/components/VokDevCard'
import { communityFeatures } from './data'

export function CommunityFeatures() {
  return (
    <section className="pg-sec" aria-labelledby="community-features-heading">
      <div className="pg-sec-inner">
        <div className="pg-sec-hd">
          <h2 id="community-features-heading">Why join VokDev</h2>
          <p>
            Everything you need to grow your skills, find collaborators, and stay connected to what
            is happening across the ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityFeatures.map((feature) => (
            <VokDevCard
              key={feature.title}
              variant="default"
              isHoverable={false}
              hasGlow={false}
              className="pg-card pg-card-accent flex h-full flex-col !shadow-none"
            >
              <div className="pg-icon mb-4">
                <feature.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </VokDevCard>
          ))}
        </div>
      </div>
    </section>
  )
}
