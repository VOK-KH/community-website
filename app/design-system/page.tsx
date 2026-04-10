'use client';

import React, { useState } from 'react';
import { VokDevButton } from '@/components/VokDevButton';
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, VokDevCardContent, VokDevCardFooter } from '@/components/VokDevCard';
import { VokDevBadge } from '@/components/VokDevBadge';
import { VokDevInput, VokDevTextarea } from '@/components/VokDevInput';

export default function DesignSystemPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-glow-primary">
                VokDev Design System
              </h1>
            </div>
            <VokDevButton variant="primary" size="sm">
              Documentation
            </VokDevButton>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-pretty">
              Modern Design System for <span className="text-primary">Tech Communities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              VokDev is a futuristic, developer-friendly design system with smooth interactions, creative expression, and accessibility at its core.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <VokDevButton variant="primary" size="lg" withGlow>
              Get Started
            </VokDevButton>
            <VokDevButton variant="secondary" size="lg">
              View Documentation
            </VokDevButton>
          </div>
        </section>

        {/* Color Palette */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🎨 Color Palette</h2>
            <p className="text-muted-foreground">Carefully curated colors for innovation and creativity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Primary', color: 'bg-primary', code: '280 85% 55%' },
              { name: 'Secondary', color: 'bg-secondary', code: '190 95% 50%' },
              { name: 'Tertiary', color: 'bg-tertiary', code: '320 100% 60%' },
              { name: 'Success', color: 'bg-success', code: '142 71% 45%' },
              { name: 'Warning', color: 'bg-warning', code: '38 92% 50%' },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className={`${item.color} h-32 rounded-lg glow-primary`} />
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.code}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🔘 Button Variants</h2>
            <p className="text-muted-foreground">Interactive buttons with smooth animations</p>
          </div>
          <div className="space-y-6">
            {/* Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <VokDevButton variant="primary" withGlow>
                  Primary
                </VokDevButton>
                <VokDevButton variant="secondary" withGlow>
                  Secondary
                </VokDevButton>
                <VokDevButton variant="tertiary" withGlow>
                  Tertiary
                </VokDevButton>
                <VokDevButton variant="ghost">
                  Ghost
                </VokDevButton>
                <VokDevButton variant="destructive">
                  Destructive
                </VokDevButton>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <VokDevButton size="xs" variant="primary">
                  Extra Small
                </VokDevButton>
                <VokDevButton size="sm" variant="primary">
                  Small
                </VokDevButton>
                <VokDevButton size="md" variant="primary">
                  Medium
                </VokDevButton>
                <VokDevButton size="lg" variant="primary">
                  Large
                </VokDevButton>
              </div>
            </div>

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">States</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <VokDevButton variant="primary">
                  Normal
                </VokDevButton>
                <VokDevButton variant="primary" disabled>
                  Disabled
                </VokDevButton>
                <VokDevButton variant="primary" isLoading>
                  Loading
                </VokDevButton>
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🎯 Card Components</h2>
            <p className="text-muted-foreground">Flexible card layouts with multiple styles</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Card */}
            <VokDevCard variant="default">
              <VokDevCardHeader>
                <VokDevCardTitle>Default Card</VokDevCardTitle>
                <VokDevCardDescription>
                  Clean, minimal card with subtle shadow
                </VokDevCardDescription>
              </VokDevCardHeader>
              <VokDevCardContent>
                <p className="text-sm text-muted-foreground">
                  Perfect for standard content, project cards, and team members.
                </p>
              </VokDevCardContent>
            </VokDevCard>

            {/* Interactive Card */}
            <VokDevCard variant="interactive">
              <VokDevCardHeader>
                <VokDevCardTitle>Interactive Card</VokDevCardTitle>
                <VokDevCardDescription>
                  Glassmorphism with vibrant glow
                </VokDevCardDescription>
              </VokDevCardHeader>
              <VokDevCardContent>
                <p className="text-sm text-muted-foreground">
                  Great for featured content, highlights, and call-to-actions.
                </p>
              </VokDevCardContent>
            </VokDevCard>

            {/* Featured Card */}
            <VokDevCard variant="featured">
              <VokDevCardHeader>
                <VokDevCardTitle>Featured Card</VokDevCardTitle>
                <VokDevCardDescription>
                  Premium appearance with gradient border
                </VokDevCardDescription>
              </VokDevCardHeader>
              <VokDevCardContent>
                <p className="text-sm text-muted-foreground">
                  Best for premium projects, sponsorships, and special announcements.
                </p>
              </VokDevCardContent>
            </VokDevCard>

            {/* Minimal Card */}
            <VokDevCard variant="minimal">
              <VokDevCardHeader>
                <VokDevCardTitle>Minimal Card</VokDevCardTitle>
                <VokDevCardDescription>
                  Subtle design, transparent background
                </VokDevCardDescription>
              </VokDevCardHeader>
              <VokDevCardContent>
                <p className="text-sm text-muted-foreground">
                  Perfect for lightweight content and sidebar items.
                </p>
              </VokDevCardContent>
            </VokDevCard>
          </div>

          {/* Card with Footer */}
          <VokDevCard variant="interactive" className="md:max-w-2xl">
            <VokDevCardHeader>
              <VokDevCardTitle>Card with Footer Actions</VokDevCardTitle>
              <VokDevCardDescription>
                Complete example with header, content, and footer
              </VokDevCardDescription>
            </VokDevCardHeader>
            <VokDevCardContent>
              <p className="text-sm text-muted-foreground">
                This card demonstrates the full component structure with actionable footer.
              </p>
            </VokDevCardContent>
            <VokDevCardFooter>
              <VokDevButton variant="primary" size="sm">
                Learn More
              </VokDevButton>
              <VokDevButton variant="ghost" size="sm">
                Dismiss
              </VokDevButton>
            </VokDevCardFooter>
          </VokDevCard>
        </section>

        {/* Badges */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🏷️ Badges</h2>
            <p className="text-muted-foreground">Status indicators and tags</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <VokDevBadge variant="primary">Primary Badge</VokDevBadge>
              <VokDevBadge variant="secondary">Secondary Badge</VokDevBadge>
              <VokDevBadge variant="tertiary">Tertiary Badge</VokDevBadge>
              <VokDevBadge variant="success">Success</VokDevBadge>
              <VokDevBadge variant="warning">Warning</VokDevBadge>
              <VokDevBadge variant="destructive">Error</VokDevBadge>
            </div>
            <div className="flex flex-wrap gap-3">
              <VokDevBadge variant="primary" size="sm">
                Small
              </VokDevBadge>
              <VokDevBadge variant="secondary" size="sm">
                Small Tag
              </VokDevBadge>
              <VokDevBadge variant="tertiary" size="sm">
                Compact
              </VokDevBadge>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">📝 Form Elements</h2>
            <p className="text-muted-foreground">Input fields with validation states</p>
          </div>
          <VokDevCard variant="default" className="md:max-w-2xl">
            <VokDevCardContent className="space-y-4">
              <VokDevInput
                label="Email Address"
                placeholder="your@email.com"
                type="email"
                description="We&apos;ll never share your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <VokDevInput
                label="Search Projects"
                placeholder="Search..."
                variant="glass"
              />

              <VokDevTextarea
                label="Project Description"
                placeholder="Tell us about your amazing project..."
                description="Maximum 500 characters"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
              />

              <VokDevInput
                label="With Error"
                placeholder="This field has an error"
                error="This field is required"
              />

              <div className="pt-4 flex gap-3">
                <VokDevButton variant="primary">Submit</VokDevButton>
                <VokDevButton variant="ghost">Cancel</VokDevButton>
              </div>
            </VokDevCardContent>
          </VokDevCard>
        </section>

        {/* Animation Effects */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">✨ Animation Effects</h2>
            <p className="text-muted-foreground">Smooth, purposeful animations and transitions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VokDevCard variant="interactive" className="flex items-center justify-center h-48">
              <div className="animate-float text-4xl">🚀</div>
            </VokDevCard>
            <VokDevCard variant="default" className="flex items-center justify-center h-48">
              <div className="animate-pulse-glow text-4xl">✨</div>
            </VokDevCard>
            <VokDevCard variant="featured" className="flex items-center justify-center h-48">
              <div className="animate-slide-in text-4xl">🎯</div>
            </VokDevCard>
            <VokDevCard variant="minimal" className="flex items-center justify-center h-48">
              <div className="animate-fade-in text-4xl">💡</div>
            </VokDevCard>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🔤 Typography System</h2>
            <p className="text-muted-foreground">Clean, modern font scales with excellent readability</p>
          </div>
          <VokDevCard variant="default" className="space-y-6 p-8">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold">Heading 1 (H1)</h1>
              <p className="text-sm text-muted-foreground">48px, Bold - Hero titles and page headers</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Heading 2 (H2)</h2>
              <p className="text-sm text-muted-foreground">36px, Bold - Section headers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">Heading 3 (H3)</h3>
              <p className="text-sm text-muted-foreground">28px, Bold - Subsection headers</p>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-regular">Body Large (18px)</p>
              <p className="text-sm text-muted-foreground">Great for introductions and important content</p>
            </div>
            <div className="space-y-2">
              <p className="text-base font-regular">Body Base (16px) - Standard body text with excellent readability. This is the most common font size for body content throughout the design system.</p>
              <p className="text-sm text-muted-foreground">Secondary text, labels, and descriptions</p>
            </div>
          </VokDevCard>
        </section>

        {/* Design Principles */}
        <section className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">🎯 Design Principles</h2>
            <p className="text-muted-foreground">Core values guiding VokDev design decisions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '✨',
                title: 'Minimal but Expressive',
                description: 'Clean interfaces with creative details that delight without overwhelming.',
              },
              {
                icon: '⚡',
                title: 'Smooth Interactions',
                description: 'Every interaction feels responsive and purposeful with thoughtful animations.',
              },
              {
                icon: '🧠',
                title: 'Developer-Friendly',
                description: 'Clear component APIs and naming conventions that are easy to use and maintain.',
              },
              {
                icon: '🎨',
                title: 'Futuristic Aesthetic',
                description: 'Modern gradients, glassmorphism, and glow effects that feel cutting-edge.',
              },
              {
                icon: '♿',
                title: 'Accessible by Design',
                description: 'WCAG AA compliance, keyboard navigation, and semantic HTML throughout.',
              },
              {
                icon: '📱',
                title: 'Mobile-First',
                description: 'Responsive design that looks great on all devices and screen sizes.',
              },
            ].map((principle, idx) => (
              <VokDevCard key={idx} variant="interactive" isHoverable>
                <VokDevCardContent className="space-y-3">
                  <p className="text-3xl">{principle.icon}</p>
                  <p className="font-semibold text-lg text-foreground">
                    {principle.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </VokDevCardContent>
              </VokDevCard>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="space-y-6 py-12">
          <VokDevCard variant="featured" className="text-center space-y-6 p-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold text-glow-primary">
                Ready to Build with VokDev?
              </h2>
              <p className="text-lg text-muted-foreground">
                Start creating amazing experiences with our comprehensive design system
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VokDevButton variant="primary" size="lg" withGlow>
                View Components
              </VokDevButton>
              <VokDevButton variant="secondary" size="lg">
                Read Documentation
              </VokDevButton>
            </div>
          </VokDevCard>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Components</a></li>
                <li><a href="#" className="hover:text-primary transition">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition">Guidelines</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Community</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition">Contribute</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Resources</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition">Case Studies</a></li>
                <li><a href="#" className="hover:text-primary transition">Support</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition">License</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 VokDev. Crafted with ✨ by the community.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-primary hover:text-secondary transition">Twitter</a>
              <a href="#" className="text-primary hover:text-secondary transition">GitHub</a>
              <a href="#" className="text-primary hover:text-secondary transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
