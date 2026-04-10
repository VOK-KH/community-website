'use client'

import Link from 'next/link'
import { AnimatedCard } from '@/components/AnimatedCard'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import { VokDevBadge } from '@/components/VokDevBadge'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardDescription, VokDevCardTitle } from '@/components/VokDevCard'
import { recentBlog } from './data'

export function BlogSection() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest From Our Blog</h2>
          <p className="text-lg text-muted-foreground">
            Tutorials, workflows, and engineering insights from contributors.
          </p>
        </div>

        <StaggerContainer className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {recentBlog.map((post, index) => (
            <StaggerItem key={post.id}>
              <AnimatedCard index={index}>
                <VokDevCard variant="interactive" className="h-full">
                  <div className="mb-3 flex items-center justify-between">
                    <VokDevBadge variant="tertiary" size="sm" withGlow={false}>
                      {post.category}
                    </VokDevBadge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <VokDevCardTitle className="mb-2">{post.title}</VokDevCardTitle>
                  <VokDevCardDescription className="mb-4">{post.excerpt}</VokDevCardDescription>
                  <p className="border-t border-border/40 pt-4 text-sm text-muted-foreground">
                    by {post.author}
                  </p>
                </VokDevCard>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center">
          <Link href="/blog">
            <VokDevButton variant="ghost" withGlow={false}>
              Read More Articles
            </VokDevButton>
          </Link>
        </div>
      </div>
    </section>
  )
}
