'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VokDevButton from '@/components/VokDevButton'
import VokDevCard from '@/components/VokDevCard'
import VokDevBadge from '@/components/VokDevBadge'
import { useState } from 'react'

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    excerpt: 'Learn the best practices and patterns for scaling your React applications to production. Discover performance optimization techniques and state management strategies.',
    date: 'March 15, 2024',
    author: 'Sarah Chen',
    avatar: '👩‍💼',
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
    avatar: '👨‍💻',
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
    avatar: '👨‍🔧',
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
    avatar: '👩‍🔬',
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
    avatar: '👨‍💻',
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
    avatar: '👩‍🎓',
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
    avatar: '👨‍💼',
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
    avatar: '👩‍💻',
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24 border-b border-border/40">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">VokDev Blog</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Insights, tutorials, and industry trends from our community experts
            </p>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <VokDevCard
                  key={post.id}
                  variant="featured"
                  className="hover-lift flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{post.avatar}</div>
                    <VokDevBadge variant="primary" size="sm">
                      {post.category}
                    </VokDevBadge>
                  </div>

                  <VokDevCard.Title className="mb-3">{post.title}</VokDevCard.Title>
                  <VokDevCard.Description className="mb-6 flex-grow">
                    {post.excerpt}
                  </VokDevCard.Description>

                  <div className="border-t border-border/40 pt-4 flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-foreground">{post.author}</p>
                      <p className="text-muted-foreground">{post.date}</p>
                    </div>
                    <span className="text-muted-foreground">{post.readTime} min read</span>
                  </div>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="px-4 py-12 bg-card/50 border-y border-border/40">
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

        {/* All Posts Section */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <VokDevCard
                  key={post.id}
                  variant="interactive"
                  className="hover:border-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{post.avatar}</div>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                        </div>
                        <VokDevBadge variant="secondary" size="sm" className="flex-shrink-0">
                          {post.category}
                        </VokDevBadge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border/40 pt-4 mt-4">
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </VokDevCard>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No articles found in this category.
                </p>
                <VokDevButton variant="ghost" onClick={() => setSelectedCategory('All')}>
                  View All Articles
                </VokDevButton>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border-y border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get the latest articles and insights delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <VokDevButton variant="primary">Subscribe</VokDevButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
