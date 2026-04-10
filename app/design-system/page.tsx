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
    <main className="pg text-foreground">
      <section className="pg-hero" aria-labelledby="design-system-hero-title">
        <div className="pg-hero-inner px-4 md:px-6">
          <div className="pg-hero-chip">
            <span className="chip-dot" aria-hidden />
            Design System
          </div>
          <h1 id="design-system-hero-title" className="text-foreground">
            Modern Design System for{' '}
            <span className="gradient-text">Tech Communities</span>
          </h1>
          <p className="hero-sub">
            Tokens, components, and motion patterns built for fast iteration—consistent enough to ship,
            flexible enough to express your community&apos;s voice.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <VokDevButton variant="primary" size="lg" withGlow>
              Get Started
            </VokDevButton>
            <VokDevButton variant="secondary" size="lg">
              View Documentation
            </VokDevButton>
          </div>
        </div>
      </section>

      <div className="flex-1 w-full">
        <section className="pg-sec" aria-labelledby="color-palette-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="color-palette-heading">Color Palette</h2>
              <p>Semantic tokens tuned for contrast, glow, and dark-friendly UIs.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {[
                { name: 'Primary', color: 'bg-primary', code: '280 85% 55%' },
                { name: 'Secondary', color: 'bg-secondary', code: '190 95% 50%' },
                { name: 'Tertiary', color: 'bg-tertiary', code: '320 100% 60%' },
                { name: 'Success', color: 'bg-success', code: '142 71% 45%' },
                { name: 'Warning', color: 'bg-warning', code: '38 92% 50%' },
              ].map((item) => (
                <div key={item.name} className={`pg-swatch ${item.color}`}>
                  <div className="pg-swatch-label">
                    <span className="block text-foreground">{item.name}</span>
                    <span className="block font-normal text-muted-foreground opacity-90">{item.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="buttons-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="buttons-heading">Button Variants</h2>
              <p>Interactive buttons with loading, disabled, and glow options.</p>
            </div>
            <div className="space-y-6">
              <div className="pg-card space-y-4">
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
                  <VokDevButton variant="ghost">Ghost</VokDevButton>
                  <VokDevButton variant="destructive">Destructive</VokDevButton>
                </div>
              </div>

              <div className="pg-card space-y-4">
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

              <div className="pg-card space-y-4">
                <h3 className="text-lg font-semibold text-foreground">States</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <VokDevButton variant="primary">Normal</VokDevButton>
                  <VokDevButton variant="primary" disabled>
                    Disabled
                  </VokDevButton>
                  <VokDevButton variant="primary" isLoading>
                    Loading
                  </VokDevButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="cards-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="cards-heading">Card Components</h2>
              <p>Flexible card layouts with multiple visual weights.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VokDevCard variant="default">
                <VokDevCardHeader>
                  <VokDevCardTitle>Default Card</VokDevCardTitle>
                  <VokDevCardDescription>Clean, minimal card with subtle shadow</VokDevCardDescription>
                </VokDevCardHeader>
                <VokDevCardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect for standard content, project cards, and team members.
                  </p>
                </VokDevCardContent>
              </VokDevCard>

              <VokDevCard variant="interactive">
                <VokDevCardHeader>
                  <VokDevCardTitle>Interactive Card</VokDevCardTitle>
                  <VokDevCardDescription>Glassmorphism with vibrant glow</VokDevCardDescription>
                </VokDevCardHeader>
                <VokDevCardContent>
                  <p className="text-sm text-muted-foreground">
                    Great for featured content, highlights, and call-to-actions.
                  </p>
                </VokDevCardContent>
              </VokDevCard>

              <VokDevCard variant="featured">
                <VokDevCardHeader>
                  <VokDevCardTitle>Featured Card</VokDevCardTitle>
                  <VokDevCardDescription>Premium appearance with gradient border</VokDevCardDescription>
                </VokDevCardHeader>
                <VokDevCardContent>
                  <p className="text-sm text-muted-foreground">
                    Best for premium projects, sponsorships, and special announcements.
                  </p>
                </VokDevCardContent>
              </VokDevCard>

              <VokDevCard variant="minimal">
                <VokDevCardHeader>
                  <VokDevCardTitle>Minimal Card</VokDevCardTitle>
                  <VokDevCardDescription>Subtle design, transparent background</VokDevCardDescription>
                </VokDevCardHeader>
                <VokDevCardContent>
                  <p className="text-sm text-muted-foreground">
                    Perfect for lightweight content and sidebar items.
                  </p>
                </VokDevCardContent>
              </VokDevCard>
            </div>

            <hr className="pg-divider my-10 md:my-12 border-0" />

            <VokDevCard variant="interactive" className="md:max-w-2xl">
              <VokDevCardHeader>
                <VokDevCardTitle>Card with Footer Actions</VokDevCardTitle>
                <VokDevCardDescription>Complete example with header, content, and footer</VokDevCardDescription>
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
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="badges-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="badges-heading">Badges</h2>
              <p>Status indicators and compact tags.</p>
            </div>
            <div className="pg-card space-y-6">
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
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="forms-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="forms-heading">Form Elements</h2>
              <p>Inputs and text areas with descriptions and error states.</p>
            </div>
            <div className="pg-card pg-card-accent md:max-w-2xl space-y-4">
              <VokDevInput
                label="Email Address"
                placeholder="your@email.com"
                type="email"
                description="We&apos;ll never share your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <VokDevInput label="Search Projects" placeholder="Search..." variant="glass" />

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
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="animation-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="animation-heading">Animation Effects</h2>
              <p>Utility classes for motion that stays readable and on-brand.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VokDevCard variant="interactive" className="pg-card-glass overflow-hidden">
                <VokDevCardContent className="flex flex-col gap-4 py-8 min-h-48 justify-center">
                  <div className="flex justify-center">
                    <div className="h-14 w-14 rounded-xl bg-primary/15 border border-primary/25 animate-float" aria-hidden />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">Float</p>
                    <p className="text-sm text-muted-foreground">Gentle vertical drift for hero accents.</p>
                  </div>
                </VokDevCardContent>
              </VokDevCard>
              <VokDevCard variant="default" className="overflow-hidden">
                <VokDevCardContent className="flex flex-col gap-4 py-8 min-h-48 justify-center">
                  <div className="flex justify-center">
                    <div className="h-14 w-14 rounded-full bg-secondary/20 border border-secondary/30 animate-pulse-glow" aria-hidden />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">Pulse glow</p>
                    <p className="text-sm text-muted-foreground">Soft emphasis for live or loading states.</p>
                  </div>
                </VokDevCardContent>
              </VokDevCard>
              <VokDevCard variant="featured" className="overflow-hidden">
                <VokDevCardContent className="flex flex-col gap-4 py-8 min-h-48 justify-center">
                  <div className="flex justify-center">
                    <div className="h-14 w-14 rounded-lg bg-tertiary/15 border border-tertiary/25 animate-slide-in" aria-hidden />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">Slide in</p>
                    <p className="text-sm text-muted-foreground">Entrance motion for panels and toasts.</p>
                  </div>
                </VokDevCardContent>
              </VokDevCard>
              <VokDevCard variant="minimal" className="overflow-hidden">
                <VokDevCardContent className="flex flex-col gap-4 py-8 min-h-48 justify-center">
                  <div className="flex justify-center">
                    <div className="h-14 w-14 rounded-md bg-muted animate-fade-in border border-border" aria-hidden />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">Fade in</p>
                    <p className="text-sm text-muted-foreground">Low-noise reveals for dense layouts.</p>
                  </div>
                </VokDevCardContent>
              </VokDevCard>
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="typography-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="typography-heading">Typography System</h2>
              <p>Scale and hierarchy aligned with the landing experience.</p>
            </div>
            <div className="pg-card space-y-6">
              <div className="space-y-2">
                <h3 className="text-5xl font-bold">Heading 1 (H1)</h3>
                <p className="text-sm text-muted-foreground">48px, Bold — Hero titles and page headers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">Heading 2 (H2)</h3>
                <p className="text-sm text-muted-foreground">36px, Bold — Section headers</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold">Heading 3 (H3)</h3>
                <p className="text-sm text-muted-foreground">28px, Bold — Subsection headers</p>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-regular">Body Large (18px)</p>
                <p className="text-sm text-muted-foreground">Introductions and emphasized body copy</p>
              </div>
              <div className="space-y-2">
                <p className="text-base font-regular">
                  Body Base (16px) — Standard body text with excellent readability. This is the most common
                  font size for body content throughout the design system.
                </p>
                <p className="text-sm text-muted-foreground">Secondary text, labels, and descriptions</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="principles-heading">
          <div className="pg-sec-inner px-4 md:px-6">
            <div className="pg-sec-hd">
              <h2 id="principles-heading">Design Principles</h2>
              <p>Core values guiding VokDev design decisions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  index: '01',
                  title: 'Minimal but Expressive',
                  description: 'Clean interfaces with creative details that delight without overwhelming.',
                },
                {
                  index: '02',
                  title: 'Smooth Interactions',
                  description: 'Every interaction feels responsive and purposeful with thoughtful animations.',
                },
                {
                  index: '03',
                  title: 'Developer-Friendly',
                  description: 'Clear component APIs and naming conventions that are easy to use and maintain.',
                },
                {
                  index: '04',
                  title: 'Futuristic Aesthetic',
                  description: 'Modern gradients, glassmorphism, and glow effects that feel cutting-edge.',
                },
                {
                  index: '05',
                  title: 'Accessible by Design',
                  description: 'WCAG AA compliance, keyboard navigation, and semantic HTML throughout.',
                },
                {
                  index: '06',
                  title: 'Mobile-First',
                  description: 'Responsive design that looks great on all devices and screen sizes.',
                },
              ].map((principle) => (
                <article key={principle.index} className="pg-card pg-card-accent space-y-3">
                  <span className="text-3xl font-bold gradient-text tabular-nums">{principle.index}</span>
                  <h3 className="font-semibold text-lg text-foreground">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-cta" aria-labelledby="cta-heading">
          <div className="pg-cta-inner px-4 md:px-6">
            <h2 id="cta-heading" className="text-glow-primary">
              Ready to Build with VokDev?
            </h2>
            <p>Start shipping cohesive interfaces with tokens, components, and motion you can reuse everywhere.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VokDevButton variant="primary" size="lg" withGlow>
                View Components
              </VokDevButton>
              <VokDevButton variant="secondary" size="lg">
                Read Documentation
              </VokDevButton>
            </div>
          </div>
        </section>

        <hr className="pg-divider w-full border-0 shrink-0" />
      </div>

      <footer className="border-t border-border bg-card mt-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Product</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Community</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contribute
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Resources</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="font-semibold text-foreground">Legal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2024 VokDev. Crafted by the community.</p>
            <div className="flex gap-4">
              <a href="#" className="text-primary hover:text-secondary transition">
                Twitter
              </a>
              <a href="#" className="text-primary hover:text-secondary transition">
                GitHub
              </a>
              <a href="#" className="text-primary hover:text-secondary transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
