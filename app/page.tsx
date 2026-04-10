'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, VokDevCardContent, VokDevCardFooter } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { AnimatedSection } from '@/components/AnimatedSection'
import { AnimatedCard } from '@/components/AnimatedCard'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import { HeroTitle, HeroSubtitle, HeroButton } from '@/components/HeroAnimation'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: 'AI Chat Platform',
    description: 'Real-time collaborative AI chat with context awareness and custom models',
    category: 'AI/ML',
    members: 5,
    stars: 234,
    image: '🤖',
  },
  {
    id: 2,
    title: 'Design System UI Kit',
    description: 'Production-ready component library with 50+ accessible components',
    category: 'Design',
    members: 3,
    stars: 512,
    image: '🎨',
  },
  {
    id: 3,
    title: 'Web Performance Dashboard',
    description: 'Monitor and analyze web performance metrics with real-time analytics',
    category: 'DevTools',
    members: 4,
    stars: 189,
    image: '📊',
  },
  {
    id: 4,
    title: 'Full-Stack Framework',
    description: 'Modern framework combining frontend and backend in one seamless experience',
    category: 'Framework',
    members: 8,
    stars: 678,
    image: '⚙️',
  },
]

const communityStats = [
  { label: 'Active Members', value: '2,450+' },
  { label: 'Projects', value: '180+' },
  { label: 'Collaborations', value: '320+' },
  { label: 'Events', value: '45+' },
]

const recentBlog = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    excerpt: 'Learn the best practices and patterns for scaling your React applications to production.',
    date: 'March 15, 2024',
    author: 'Sarah Chen',
    category: 'React',
  },
  {
    id: 2,
    title: 'The Future of Web Design',
    excerpt: 'Exploring emerging trends and technologies that will shape web design in 2024.',
    date: 'March 10, 2024',
    author: 'Alex Rodriguez',
    category: 'Design',
  },
  {
    id: 3,
    title: 'DevOps Best Practices',
    excerpt: 'A comprehensive guide to modern DevOps practices and tools for your team.',
    date: 'March 5, 2024',
    author: 'Jordan Lee',
    category: 'DevOps',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-glow opacity-50" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow opacity-50 animation-delay-2000" />
          </div>

          <AnimatedSection className="max-w-7xl mx-auto text-center space-y-6">
            <div className="mb-6 inline-block">
              <VokDevBadge variant="secondary" size="lg">
                Welcome to VokDev Community
              </VokDevBadge>
            </div>

            <HeroTitle>
              Where Tech Meets Creativity
            </HeroTitle>

            <HeroSubtitle>
              Collaborate with designers, developers, and innovators. Build amazing projects, share knowledge, and grow together in the VokDev community.
            </HeroSubtitle>

            <HeroButton>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <VokDevButton variant="primary" size="lg">
                  Start Exploring
                </VokDevButton>
                <VokDevButton variant="secondary" size="lg">
                  Watch Demo
                </VokDevButton>
              </div>
            </HeroButton>
          </AnimatedSection>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 bg-card/50 border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground text-lg">
                Discover amazing projects built by our community members
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProjects.map((project, index) => (
                <StaggerItem key={project.id}>
                  <AnimatedCard index={index}>
                    <VokDevCard
                      variant="interactive"
                      className="hover-lift h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{project.image}</div>
                        <VokDevBadge variant="secondary" size="sm">
                          {project.category}
                        </VokDevBadge>
                      </div>
                      <VokDevCard.Title>{project.title}</VokDevCard.Title>
                      <VokDevCard.Description className="mb-4">
                        {project.description}
                      </VokDevCard.Description>
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border/40 pt-4">
                        <span>{project.members} members</span>
                        <span>⭐ {project.stars}</span>
                      </div>
                    </VokDevCard>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center mt-12">
              <Link href="/projects">
                <VokDevButton variant="ghost">
                  View All Projects →
                </VokDevButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-transparent to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground text-lg">
                Connect with 2,450+ tech professionals collaborating on innovative projects
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: '👥', title: 'Networking', desc: 'Connect with like-minded professionals' },
                { icon: '🚀', title: 'Build Together', desc: 'Collaborate on exciting projects' },
                { icon: '📚', title: 'Learn & Grow', desc: 'Share knowledge and expertise' },
                { icon: '🎯', title: 'Showcase Work', desc: 'Display your projects to the world' },
              ].map((item, i) => (
                <StaggerItem key={item.title}>
                  <AnimatedCard index={i}>
                    <VokDevCard variant="featured">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    </VokDevCard>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Recent Blog Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest from Our Blog</h2>
              <p className="text-muted-foreground text-lg">
                Stay updated with insights, tutorials, and industry trends
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {recentBlog.map((post, index) => (
                <StaggerItem key={post.id}>
                  <AnimatedCard index={index}>
                    <VokDevCard variant="interactive">
                      <div className="flex items-center justify-between mb-3">
                        <VokDevBadge variant="tertiary" size="sm">
                          {post.category}
                        </VokDevBadge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <VokDevCard.Title className="mb-2">{post.title}</VokDevCard.Title>
                      <VokDevCard.Description className="mb-4">
                        {post.excerpt}
                      </VokDevCard.Description>
                      <p className="text-sm text-muted-foreground border-t border-border/40 pt-4">
                        by {post.author}
                      </p>
                    </VokDevCard>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="text-center">
              <Link href="/blog">
                <VokDevButton variant="ghost">
                  Read More Articles →
                </VokDevButton>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border-y border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Start collaborating with thousands of tech professionals today. It only takes a minute to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VokDevButton variant="primary" size="lg">
                Create Account
              </VokDevButton>
              <VokDevButton variant="secondary" size="lg">
                Learn More
              </VokDevButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
