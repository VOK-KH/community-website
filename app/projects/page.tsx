'use client'

import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardTitle, VokDevCardDescription } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Paintbrush,
  BarChart3,
  Blocks,
  Smartphone,
  LineChart,
  FlaskConical,
  Cloud,
  FolderOpen,
} from 'lucide-react'

const allProjects: {
  id: number
  title: string
  description: string
  category: string
  tags: string[]
  members: number
  stars: number
  icon: LucideIcon
}[] = [
  {
    id: 1,
    title: 'AI Chat Platform',
    description: 'Real-time collaborative AI chat with context awareness and custom models',
    category: 'AI/ML',
    tags: ['AI', 'Chat', 'Real-time'],
    members: 5,
    stars: 234,
    icon: Bot,
  },
  {
    id: 2,
    title: 'Design System UI Kit',
    description: 'Production-ready component library with 50+ accessible components',
    category: 'Design',
    tags: ['UI', 'Components', 'Design'],
    members: 3,
    stars: 512,
    icon: Paintbrush,
  },
  {
    id: 3,
    title: 'Web Performance Dashboard',
    description: 'Monitor and analyze web performance metrics with real-time analytics',
    category: 'DevTools',
    tags: ['Analytics', 'Dashboard', 'Performance'],
    members: 4,
    stars: 189,
    icon: BarChart3,
  },
  {
    id: 4,
    title: 'Full-Stack Framework',
    description: 'Modern framework combining frontend and backend in one seamless experience',
    category: 'Framework',
    tags: ['Framework', 'Full-stack', 'Backend'],
    members: 8,
    stars: 678,
    icon: Blocks,
  },
  {
    id: 5,
    title: 'Mobile App Builder',
    description: 'Low-code platform for building cross-platform mobile applications',
    category: 'Mobile',
    tags: ['Mobile', 'App', 'Cross-platform'],
    members: 6,
    stars: 445,
    icon: Smartphone,
  },
  {
    id: 6,
    title: 'Data Visualization Library',
    description: 'Beautiful and interactive data visualization components for React',
    category: 'Visualization',
    tags: ['Charts', 'Data', 'Visualization'],
    members: 4,
    stars: 367,
    icon: LineChart,
  },
  {
    id: 7,
    title: 'API Testing Suite',
    description: 'Comprehensive testing framework for REST and GraphQL APIs',
    category: 'Testing',
    tags: ['Testing', 'API', 'QA'],
    members: 5,
    stars: 278,
    icon: FlaskConical,
  },
  {
    id: 8,
    title: 'Cloud Infrastructure Tool',
    description: 'Simplified cloud resource management and deployment automation',
    category: 'DevOps',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
    members: 7,
    stars: 521,
    icon: Cloud,
  },
]

const categories = ['All', 'AI/ML', 'Design', 'DevTools', 'Framework', 'Mobile', 'Visualization', 'Testing', 'DevOps']

function starBarPercent(stars: number) {
  return Math.min(100, (stars / 700) * 100)
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory)

  const featuredProjects = useMemo(
    () => [...allProjects].sort((a, b) => b.stars - a.stars).slice(0, 2),
    []
  )

  return (
    <div className="pg">
      <main>
        <header className="pg-hero">
          <div className="pg-hero-inner">
            <p className="pg-hero-chip">
              <span className="chip-dot" aria-hidden />
              Projects
            </p>
            <h1>
              Explore <span className="gradient-text">Projects</span>
            </h1>
            <p className="hero-sub">
              Browse community-built work—from experiments to production systems—and find teams, ideas, and
              momentum for what you want to ship next.
            </p>
          </div>
        </header>

        <section className="pg-sec pg-sec-alt" aria-labelledby="featured-heading">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <h2 id="featured-heading" className="mb-0">
                  Featured
                </h2>
                <VokDevBadge variant="secondary" size="sm" withGlow={false}>
                  By stars
                </VokDevBadge>
              </div>
              <p>Standout repos by community traction—ideal starting points for inspiration or collaboration.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {featuredProjects.map(project => {
                const Icon = project.icon
                return (
                  <article key={project.id} className="pg-card pg-card-accent flex min-h-[280px] flex-col md:min-h-[320px]">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="pg-icon pg-icon-lg shrink-0" aria-hidden>
                        <Icon className="h-7 w-7" strokeWidth={1.75} />
                      </div>
                      <span className="pg-tag shrink-0">{project.category}</span>
                    </div>
                    <VokDevCardTitle className="mb-3 text-2xl md:text-[1.65rem]">{project.title}</VokDevCardTitle>
                    <VokDevCardDescription className="mb-5 grow text-base leading-relaxed">
                      {project.description}
                    </VokDevCardDescription>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="pg-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap gap-10 border-t border-border/40 pt-6">
                      <div>
                        <p className="pg-stat-num">{project.members}</p>
                        <p className="pg-stat-label">Members</p>
                      </div>
                      <div>
                        <p className="pg-stat-num">⭐ {project.stars}</p>
                        <p className="pg-stat-label">Stars</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="browse-heading">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd">
              <h2 id="browse-heading">Browse by category</h2>
              <p>
                Showing <strong className="font-semibold text-foreground">{filteredProjects.length}</strong> of{' '}
                <strong className="font-semibold text-foreground">{allProjects.length}</strong> projects
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`pg-pill ${selectedCategory === category ? 'pg-pill-active' : ''}`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec pt-0" aria-labelledby="grid-heading">
          <div className="pg-sec-inner">
            <h2 id="grid-heading" className="sr-only">
              Project listings
            </h2>

            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center">
                <div className="pg-icon pg-icon-lg mb-6 text-muted-foreground" aria-hidden>
                  <FolderOpen className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-lg font-semibold text-foreground">No projects in this category</p>
                <p className="mb-8 max-w-md text-muted-foreground">
                  Try another filter or reset to see the full catalog.
                </p>
                <VokDevButton variant="ghost" size="md" onClick={() => setSelectedCategory('All')}>
                  View all projects
                </VokDevButton>
              </div>
            ) : (
              <ul className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map(project => {
                  const Icon = project.icon
                  const barPct = starBarPercent(project.stars)
                  return (
                    <li key={project.id}>
                      <VokDevCard
                        variant="interactive"
                        hasGlow
                        isHoverable
                        className="pg-card flex h-full flex-col bg-card p-7! shadow-none ring-0 backdrop-blur-none"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="pg-icon shrink-0" aria-hidden>
                            <Icon className="h-6 w-6" strokeWidth={1.75} />
                          </div>
                          <span className="pg-tag shrink-0">{project.category}</span>
                        </div>
                        <VokDevCardTitle className="mb-2">{project.title}</VokDevCardTitle>
                        <VokDevCardDescription className="mb-4 grow">{project.description}</VokDevCardDescription>
                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="pg-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div
                          className="pg-progress mb-4"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(barPct)}
                          aria-label={`Relative traction: ${Math.round(barPct)} percent`}
                        >
                          <div className="pg-progress-bar" style={{ width: `${barPct}%` }} />
                        </div>
                        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4 text-sm text-muted-foreground">
                          <span>{project.members} members</span>
                          <span aria-label={`${project.stars} stars`}>
                            ⭐ {project.stars}
                          </span>
                        </div>
                      </VokDevCard>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        <section className="pg-cta" aria-labelledby="cta-heading">
          <div className="pg-cta-inner">
            <h2 id="cta-heading">Have a Project to Share?</h2>
            <p>
              Submit your work to the community and get visibility, feedback, and collaborators who care about
              shipping quality software.
            </p>
            <VokDevButton variant="primary" size="lg" withGlow>
              Submit your project
            </VokDevButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
