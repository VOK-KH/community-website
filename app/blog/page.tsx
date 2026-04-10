'use client'

import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardTitle, VokDevCardDescription } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Code2, Palette, Server, Brain, FileCode2, Accessibility, Cloud, Shield } from 'lucide-react'

const blogPosts: {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  avatar: LucideIcon
  category: string
  readTime: number
  featured: boolean
}[] = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    excerpt: 'Learn the best practices and patterns for scaling your React applications to production. Discover performance optimization techniques and state management strategies.',
    date: 'March 15, 2024',
    author: 'Sarah Chen',
    avatar: Code2,
    category: 'React',
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Web Design',
    excerpt: 'Exploring emerging trends and technologies that will shape web design in 2024. From AI-assisted design to immersive experiences, discover what\'s next.',
    date: 'March 10, 2024',
    author: 'Alex Rodriguez',
    avatar: Palette,
    category: 'Design',
    readTime: 6,
    featured: true,
  },
  {
    id: 3,
    title: 'DevOps Best Practices',
    excerpt: 'A comprehensive guide to modern DevOps practices and tools for your team. Master CI/CD pipelines, containerization, and infrastructure as code.',
    date: 'March 5, 2024',
    author: 'Jordan Lee',
    avatar: Server,
    category: 'DevOps',
    readTime: 10,
    featured: false,
  },
  {
    id: 4,
    title: 'Machine Learning for Web Developers',
    excerpt: 'An introduction to ML concepts for developers. Build intelligent applications without being a data scientist with modern ML libraries.',
    date: 'February 28, 2024',
    author: 'Emily Watson',
    avatar: Brain,
    category: 'AI/ML',
    readTime: 12,
    featured: false,
  },
  {
    id: 5,
    title: 'TypeScript Advanced Patterns',
    excerpt: 'Deep dive into advanced TypeScript patterns and techniques. Improve your type safety and code quality with generics, conditional types, and more.',
    date: 'February 22, 2024',
    author: 'Michael Park',
    avatar: FileCode2,
    category: 'TypeScript',
    readTime: 9,
    featured: false,
  },
  {
    id: 6,
    title: 'Accessibility in Modern Web Apps',
    excerpt: 'Building inclusive web applications that work for everyone. Learn WCAG guidelines, semantic HTML, and accessibility testing best practices.',
    date: 'February 15, 2024',
    author: 'Lisa Zhang',
    avatar: Accessibility,
    category: 'Accessibility',
    readTime: 7,
    featured: false,
  },
  {
    id: 7,
    title: 'Cloud Architecture Decisions',
    excerpt: 'Making smart cloud architecture decisions for your next project. Compare different cloud providers and architectural patterns.',
    date: 'February 10, 2024',
    author: 'David Morrison',
    avatar: Cloud,
    category: 'Cloud',
    readTime: 11,
    featured: false,
  },
  {
    id: 8,
    title: 'Security Essentials for Web Developers',
    excerpt: 'Essential security practices every web developer should know. Protect your applications from common vulnerabilities and attacks.',
    date: 'February 5, 2024',
    author: 'Priya Patel',
    avatar: Shield,
    category: 'Security',
    readTime: 8,
    featured: false,
  },
]

const categories = ['All', 'React', 'Design', 'DevOps', 'AI/ML', 'TypeScript', 'Accessibility', 'Cloud', 'Security']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === selectedCategory)

  const featuredPosts = blogPosts.filter(p => p.featured)

  return (
    <div className="pg">
      <main className="flex-1">
        <header className="pg-hero">
          <div className="pg-hero-inner">
            <p className="pg-hero-chip">
              <span className="chip-dot" aria-hidden />
              Blog
            </p>
            <h1>
              <span className="gradient-text">Insights</span>
              {' '}& Tutorials
            </h1>
            <p className="hero-sub">
              Practical guides, deep dives, and perspectives from builders shipping real products—so you can level up faster with patterns that actually hold up in production.
            </p>
          </div>
        </header>

        <section className="pg-sec" aria-labelledby="featured-heading">
          <div className="pg-sec-inner">
            <header className="pg-sec-hd">
              <h2 id="featured-heading">Featured articles</h2>
              <p>Hand-picked pieces worth reading first—longer reads with actionable takeaways.</p>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {featuredPosts.map((post) => {
                const AvatarIcon = post.avatar
                return (
                  <VokDevCard
                    key={post.id}
                    variant="minimal"
                    isHoverable={false}
                    hasGlow={false}
                    className="pg-card pg-card-accent flex h-full flex-col border-border! bg-card! shadow-none"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="pg-icon" aria-hidden>
                        <AvatarIcon className="h-6 w-6" />
                      </div>
                      <VokDevBadge variant="primary" size="sm">
                        {post.category}
                      </VokDevBadge>
                    </div>

                    <VokDevCardTitle className="mb-3">{post.title}</VokDevCardTitle>
                    <VokDevCardDescription className="mb-6 grow">{post.excerpt}</VokDevCardDescription>

                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-border/40 pt-4 text-sm">
                      <div>
                        <p className="font-semibold text-foreground">{post.author}</p>
                        <p className="text-muted-foreground">{post.date}</p>
                      </div>
                      <span className="shrink-0 text-muted-foreground">{post.readTime} min read</span>
                    </div>
                  </VokDevCard>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="filter-heading">
          <div className="pg-sec-inner">
            <header className="pg-sec-hd">
              <h2 id="filter-heading" className="text-lg md:text-xl">
                Browse by topic
              </h2>
              <p>Narrow the archive to the stack or discipline you care about.</p>
            </header>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Category filters">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'pg-pill pg-pill-active' : 'pg-pill'}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="archive-heading">
          <div className="pg-sec-inner max-w-4xl">
            <header className="pg-sec-hd">
              <h2 id="archive-heading">All posts</h2>
              <p>
                Showing {filteredPosts.length} of {blogPosts.length} articles
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.
              </p>
            </header>

            {filteredPosts.length === 0 ? (
              <div className="pg-card pg-card-glass text-center">
                <div className="pg-icon mx-auto mb-4" aria-hidden>
                  <FileCode2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Nothing here yet</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  No articles match this category. Try another topic or reset the filter to see the full archive.
                </p>
                <div className="mt-6">
                  <VokDevButton variant="primary" size="md" onClick={() => setSelectedCategory('All')}>
                    Show all articles
                  </VokDevButton>
                </div>
              </div>
            ) : (
              <ul className="m-0 list-none space-y-5 p-0">
                {filteredPosts.map((post) => {
                  const AvatarIcon = post.avatar
                  return (
                    <li key={post.id}>
                      <VokDevCard
                        variant="minimal"
                        isHoverable={false}
                        hasGlow={false}
                        className="pg-card border-border! bg-card! shadow-none"
                      >
                        <article className="pg-post">
                          <div className="pg-icon" aria-hidden>
                            <AvatarIcon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                              <div className="min-w-0">
                                <h3 className="text-xl font-bold text-foreground">{post.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
                              </div>
                              <span className="pg-tag shrink-0 self-start">{post.category}</span>
                            </div>
                            <div className="pg-post-meta flex-wrap border-t border-border/40 pt-3">
                              <span className="font-medium text-foreground">{post.author}</span>
                              <span className="dot" aria-hidden />
                              <time dateTime={post.date}>{post.date}</time>
                              <span className="dot" aria-hidden />
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                        </article>
                      </VokDevCard>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>

        <hr className="pg-divider" />

        <section className="pg-cta" aria-labelledby="newsletter-heading">
          <div className="pg-cta-inner">
            <h2 id="newsletter-heading">Subscribe to the newsletter</h2>
            <p>
              One email with new posts and community highlights—no spam, unsubscribe anytime.
            </p>
            <form
              className="pg-input-group"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="blog-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="blog-newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              <VokDevButton type="submit" variant="primary" size="md" withGlow>
                Subscribe
              </VokDevButton>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
