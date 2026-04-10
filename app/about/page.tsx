'use client'

import Footer from '@/components/Footer'
import { VokDevCard } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { VokDevButton } from '@/components/VokDevButton'
import type { LucideIcon } from 'lucide-react'
import { Target, Handshake, BookOpen, Globe2, Rocket, CircleUserRound, Wrench, Briefcase } from 'lucide-react'

const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and creative solutions to solve real problems.',
  },
  {
    icon: Handshake,
    title: 'Community Driven',
    description: 'Our strength lies in our diverse community of passionate developers and designers.',
  },
  {
    icon: BookOpen,
    title: 'Learning Culture',
    description: 'We believe in continuous growth, sharing knowledge, and mentoring the next generation.',
  },
  {
    icon: Globe2,
    title: 'Global Impact',
    description: 'We strive to create technology that makes a positive difference worldwide.',
  },
]

const teamMembers: { name: string; role: string; avatar: LucideIcon; bio: string }[] = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    avatar: Briefcase,
    bio: 'Product designer with 10 years of experience building digital products.',
  },
  {
    name: 'Alex Rodriguez',
    role: 'CTO',
    avatar: CircleUserRound,
    bio: 'Full-stack developer passionate about scalable architecture and open source.',
  },
  {
    name: 'Jordan Lee',
    role: 'Community Lead',
    avatar: Wrench,
    bio: 'DevOps expert focused on building strong, inclusive communities.',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Growth',
    avatar: CircleUserRound,
    bio: 'Data-driven marketer passionate about helping creators succeed.',
  },
]

export default function AboutPage() {
  return (
    <div className="pg">
      <main className="flex-1">
        <section className="pg-hero" aria-labelledby="about-hero-heading">
          <div className="pg-hero-inner">
            <div className="pg-hero-chip">
              <span className="chip-dot" aria-hidden />
              About Us
            </div>
            <h1 id="about-hero-heading">
              About <span className="gradient-text">VokDev</span>
            </h1>
            <p className="hero-sub">
              A global home for developers, designers, and builders who want to ship real work, learn
              faster, and grow alongside peers—not in isolation. Collaboration, craft, and community
              drive everything we do.
            </p>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="mission-heading">
          <div className="pg-sec-inner">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="pg-sec-hd">
                  <h2 id="mission-heading">Our Mission</h2>
                  <p>
                    We believe the best outcomes come when talented people share a clear vision. Our
                    mission is to give tech professionals everywhere a place to collaborate on ambitious
                    projects, trade hard-won knowledge, and lift each other up.
                  </p>
                </div>
                <p className="mb-6 text-lg text-muted-foreground">
                  Through creativity, curiosity, and mutual support, we are building a community that
                  stretches what is possible in technology—without losing the human side of the craft.
                </p>
                <VokDevButton variant="primary">Learn More</VokDevButton>
              </div>
              <div className="relative flex min-h-[280px] items-center justify-center">
                <VokDevBadge
                  variant="primary"
                  size="sm"
                  className="absolute left-0 top-4 z-2 shadow-sm md:left-4"
                >
                  Ship together
                </VokDevBadge>
                <VokDevBadge
                  variant="secondary"
                  size="sm"
                  className="absolute right-0 top-1/4 z-2 -translate-y-1/2 shadow-sm md:right-6"
                >
                  Open culture
                </VokDevBadge>
                <VokDevBadge
                  variant="tertiary"
                  size="sm"
                  className="absolute bottom-8 left-1/4 z-2 -translate-x-1/2 shadow-sm md:bottom-10"
                >
                  Always learning
                </VokDevBadge>
                <div className="pg-avatar-ring scale-125 md:scale-150">
                  <div className="pg-avatar pg-avatar-lg">
                    <Rocket className="h-9 w-9 md:h-10 md:w-10" aria-hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="values-heading">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd pg-sec-hd-center">
              <h2 id="values-heading">Our Values</h2>
              <p>Principles that shape how we build products, run programs, and show up for members.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <VokDevCard
                  key={index}
                  variant="default"
                  isHoverable={false}
                  className="pg-card pg-card-accent p-7 shadow-none dark:shadow-none"
                >
                  <div className="pg-icon pg-icon-lg mb-5">
                    <value.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="impact-heading">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd pg-sec-hd-center">
              <h2 id="impact-heading">Our Impact</h2>
              <p>Numbers that reflect momentum across projects, events, and the people who power VokDev.</p>
            </div>
            <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
              {[
                { number: '2,450+', label: 'Active Members' },
                { number: '180+', label: 'Projects' },
                { number: '45+', label: 'Community Events' },
                { number: '50+', label: 'Countries' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="pg-stat-num gradient-text">{stat.number}</div>
                  <div className="pg-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt" aria-labelledby="story-heading">
          <div className="pg-sec-inner max-w-3xl">
            <div className="pg-sec-hd">
              <h2 id="story-heading">Our Story</h2>
              <p>From a small gathering of builders to a worldwide network—here is how we got here.</p>
            </div>
            <div className="pg-timeline">
              <div className="pg-timeline-item">
                <h3 className="mb-2 text-base font-semibold">2020 — The spark</h3>
                <p className="text-muted-foreground leading-relaxed">
                  VokDev started with a simple observation: the best work happens when talented people
                  collaborate. Our founders saw developers and designers working in isolation, missing
                  chances to learn from and build with others.
                </p>
              </div>
              <div className="pg-timeline-item">
                <h3 className="mb-2 text-base font-semibold">Growth that compounds</h3>
                <p className="text-muted-foreground leading-relaxed">
                  What began as a Discord server with fifty members grew into a community of over
                  2,450 professionals. Today we host a space where experimentation and shipping happen
                  every day.
                </p>
              </div>
              <div className="pg-timeline-item">
                <h3 className="mb-2 text-base font-semibold">Milestones along the way</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We have watched members go from beginners to industry leaders, and side projects become
                  real ventures. Above all, we have nurtured a culture where people feel welcome and
                  backed by peers.
                </p>
              </div>
              <div className="pg-timeline-item">
                <h3 className="mb-2 text-base font-semibold">What is next</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment is unchanged: build a platform where tech professionals collaborate,
                  learn continuously, and make a lasting impact on the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-sec" aria-labelledby="team-heading">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd pg-sec-hd-center">
              <h2 id="team-heading">Meet the Team</h2>
              <p>Leaders who keep the community ambitious, inclusive, and focused on real outcomes.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <VokDevCard
                  key={index}
                  variant="default"
                  isHoverable={false}
                  className="pg-card flex flex-col items-center p-7 text-center shadow-none dark:shadow-none"
                >
                  <div className="pg-avatar-ring mb-5">
                    <div className="pg-avatar">
                      <member.avatar className="h-7 w-7" aria-hidden />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{member.name}</h3>
                  <VokDevBadge variant="secondary" size="sm" className="mb-4">
                    {member.role}
                  </VokDevBadge>
                  <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-cta" aria-labelledby="cta-heading">
          <div className="pg-cta-inner">
            <h2 id="cta-heading">Join Our Community</h2>
            <p>
              Whether you are early in your journey or deep in your craft, there is room to contribute,
              learn, and lead at VokDev.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
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
