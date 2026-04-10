'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, VokDevCardContent, VokDevCardFooter } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { useState } from 'react'

const allProjects = [
  {
    id: 1,
    title: 'AI Chat Platform',
    description: 'Real-time collaborative AI chat with context awareness and custom models',
    category: 'AI/ML',
    tags: ['AI', 'Chat', 'Real-time'],
    members: 5,
    stars: 234,
    image: '🤖',
  },
  {
    id: 2,
    title: 'Design System UI Kit',
    description: 'Production-ready component library with 50+ accessible components',
    category: 'Design',
    tags: ['UI', 'Components', 'Design'],
    members: 3,
    stars: 512,
    image: '🎨',
  },
  {
    id: 3,
    title: 'Web Performance Dashboard',
    description: 'Monitor and analyze web performance metrics with real-time analytics',
    category: 'DevTools',
    tags: ['Analytics', 'Dashboard', 'Performance'],
    members: 4,
    stars: 189,
    image: '📊',
  },
  {
    id: 4,
    title: 'Full-Stack Framework',
    description: 'Modern framework combining frontend and backend in one seamless experience',
    category: 'Framework',
    tags: ['Framework', 'Full-stack', 'Backend'],
    members: 8,
    stars: 678,
    image: '⚙️',
  },
  {
    id: 5,
    title: 'Mobile App Builder',
    description: 'Low-code platform for building cross-platform mobile applications',
    category: 'Mobile',
    tags: ['Mobile', 'App', 'Cross-platform'],
    members: 6,
    stars: 445,
    image: '📱',
  },
  {
    id: 6,
    title: 'Data Visualization Library',
    description: 'Beautiful and interactive data visualization components for React',
    category: 'Visualization',
    tags: ['Charts', 'Data', 'Visualization'],
    members: 4,
    stars: 367,
    image: '📈',
  },
  {
    id: 7,
    title: 'API Testing Suite',
    description: 'Comprehensive testing framework for REST and GraphQL APIs',
    category: 'Testing',
    tags: ['Testing', 'API', 'QA'],
    members: 5,
    stars: 278,
    image: '🧪',
  },
  {
    id: 8,
    title: 'Cloud Infrastructure Tool',
    description: 'Simplified cloud resource management and deployment automation',
    category: 'DevOps',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
    members: 7,
    stars: 521,
    image: '☁️',
  },
]

const categories = ['All', 'AI/ML', 'Design', 'DevTools', 'Framework', 'Mobile', 'Visualization', 'Testing', 'DevOps']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24 border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Projects</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover innovative projects built by our community members. Find inspiration, collaborate, or contribute.
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="px-4 py-12 bg-card/50 border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {allProjects.length} projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <VokDevCard
                  key={project.id}
                  variant="interactive"
                  className="hover-lift flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{project.image}</div>
                    <VokDevBadge variant="secondary" size="sm">
                      {project.category}
                    </VokDevBadge>
                  </div>
                  <VokDevCard.Title className="mb-2">{project.title}</VokDevCard.Title>
                  <VokDevCard.Description className="mb-4 flex-grow">
                    {project.description}
                  </VokDevCard.Description>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="border-t border-border/40 pt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{project.members} members</span>
                    <span>⭐ {project.stars}</span>
                  </div>
                </VokDevCard>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No projects found in this category.
                </p>
                <VokDevButton variant="ghost" onClick={() => setSelectedCategory('All')}>
                  View All Projects
                </VokDevButton>
              </div>
            )}
          </div>
        </section>

        {/* Submit Project CTA */}
        <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border-y border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Project to Share?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Submit your project to our community and get feedback from thousands of developers.
            </p>
            <VokDevButton variant="primary" size="lg">
              Submit Your Project
            </VokDevButton>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
