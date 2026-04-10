'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, VokDevCardContent } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { VokDevButton } from '@/components/VokDevButton'

const values = [
  {
    icon: '🎯',
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and creative solutions to solve real problems.',
  },
  {
    icon: '🤝',
    title: 'Community Driven',
    description: 'Our strength lies in our diverse community of passionate developers and designers.',
  },
  {
    icon: '📚',
    title: 'Learning Culture',
    description: 'We believe in continuous growth, sharing knowledge, and mentoring the next generation.',
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    description: 'We strive to create technology that makes a positive difference worldwide.',
  },
]

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    avatar: '👩‍💼',
    bio: 'Product designer with 10 years of experience building digital products.',
  },
  {
    name: 'Alex Rodriguez',
    role: 'CTO',
    avatar: '👨‍💻',
    bio: 'Full-stack developer passionate about scalable architecture and open source.',
  },
  {
    name: 'Jordan Lee',
    role: 'Community Lead',
    avatar: '👨‍🔧',
    bio: 'DevOps expert focused on building strong, inclusive communities.',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Growth',
    avatar: '👩‍🔬',
    bio: 'Data-driven marketer passionate about helping creators succeed.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About VokDev</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              VokDev is a thriving community where tech professionals collaborate, create, and grow together. We&apos;re building the future of work for developers, designers, and innovators.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  We believe that great things happen when talented people come together with a shared vision. Our mission is to create a platform where tech professionals from around the world can collaborate on innovative projects, share knowledge, and help each other grow.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  By fostering a culture of creativity, continuous learning, and mutual support, we&apos;re building a community that pushes the boundaries of what&apos;s possible in technology.
                </p>
                <VokDevButton variant="primary">Learn More</VokDevButton>
              </div>
              <div className="text-6xl text-center">🚀</div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-20 bg-card/50 border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <VokDevCard key={index} variant="default">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: '2,450+', label: 'Active Members' },
                { number: '180+', label: 'Projects' },
                { number: '45+', label: 'Community Events' },
                { number: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-primary/5 to-transparent border-y border-border/40">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Story</h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                VokDev was born from a simple observation: the best work happens when talented people collaborate. In 2020, our founders noticed that many talented developers and designers were working in isolation, missing out on opportunities to learn from and build with others.
              </p>
              <p>
                What started as a small Discord server with just 50 members has grown into a thriving community of over 2,450 professionals. Today, we&apos;re proud to host a platform where innovation happens every single day.
              </p>
              <p>
                Our journey has been incredible. We&apos;ve seen members start as beginners and grow into industry leaders. We&apos;ve witnessed small side projects become successful startups. Most importantly, we&apos;ve built a community where everyone feels welcome and supported.
              </p>
              <p>
                As we look to the future, our commitment remains the same: to create a platform where tech professionals can collaborate, learn, and make their impact on the world.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Meet the Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <VokDevCard key={index} variant="interactive" className="text-center">
                  <div className="text-5xl mb-4">{member.avatar}</div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <VokDevBadge variant="secondary" size="sm" className="inline-block mb-4">
                    {member.role}
                  </VokDevBadge>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border-y border-border/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you&apos;re just starting your tech journey or you&apos;re an industry expert, there&apos;s a place for you in VokDev.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <VokDevButton variant="primary" size="lg">
                Create Account
              </VokDevButton>
              <VokDevButton variant="secondary" size="lg">
                Explore Projects
              </VokDevButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
