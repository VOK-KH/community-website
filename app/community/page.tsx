'use client'

import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Palette,
  Code2,
  Wrench,
  Brain,
  Search,
  Briefcase,
  Shield,
  MessageSquare,
  GraduationCap,
  Handshake,
  CalendarDays,
  Trophy,
  Globe2,
} from 'lucide-react'

const communityMembers: {
  id: number
  name: string
  role: string
  avatar: LucideIcon
  specialties: string[]
  projects: number
  followers: number
}[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Designer',
    avatar: Palette,
    specialties: ['UI Design', 'User Research', 'Design Systems'],
    projects: 4,
    followers: 245,
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    role: 'Full Stack Developer',
    avatar: Code2,
    specialties: ['React', 'Node.js', 'AWS'],
    projects: 8,
    followers: 512,
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'DevOps Engineer',
    avatar: Wrench,
    specialties: ['Kubernetes', 'CI/CD', 'Infrastructure'],
    projects: 5,
    followers: 189,
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'AI/ML Engineer',
    avatar: Brain,
    specialties: ['Machine Learning', 'Python', 'Data Science'],
    projects: 6,
    followers: 378,
  },
  {
    id: 5,
    name: 'Michael Park',
    role: 'Frontend Developer',
    avatar: Code2,
    specialties: ['Vue.js', 'TypeScript', 'Performance'],
    projects: 7,
    followers: 423,
  },
  {
    id: 6,
    name: 'Lisa Zhang',
    role: 'UX Researcher',
    avatar: Search,
    specialties: ['User Research', 'Accessibility', 'Analytics'],
    projects: 3,
    followers: 156,
  },
  {
    id: 7,
    name: 'David Morrison',
    role: 'Tech Lead',
    avatar: Briefcase,
    specialties: ['Architecture', 'Mentoring', 'Best Practices'],
    projects: 9,
    followers: 678,
  },
  {
    id: 8,
    name: 'Priya Patel',
    role: 'Security Engineer',
    avatar: Shield,
    specialties: ['Security', 'Cryptography', 'Compliance'],
    projects: 4,
    followers: 234,
  },
]

const communityFeatures: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MessageSquare,
    title: 'Discussion Forums',
    description: 'Ask questions, share ideas, and get answers from experienced members',
  },
  {
    icon: GraduationCap,
    title: 'Learning Paths',
    description: 'Structured learning materials curated by community experts',
  },
  {
    icon: Handshake,
    title: 'Mentorship',
    description: 'Connect with mentors and guide the next generation of developers',
  },
  {
    icon: CalendarDays,
    title: 'Community Events',
    description: 'Attend webinars, workshops, and meetups throughout the year',
  },
  {
    icon: Trophy,
    title: 'Recognition',
    description: 'Earn badges and recognition for your contributions',
  },
  {
    icon: Globe2,
    title: 'Global Network',
    description: 'Connect with tech professionals from around the world',
  },
]

export default function CommunityPage() {
  const [selectedRole, setSelectedRole] = useState('All')

  const roles = ['All', ...Array.from(new Set(communityMembers.map(m => m.role)))]

  const filteredMembers = selectedRole === 'All'
    ? communityMembers
    : communityMembers.filter(m => m.role === selectedRole)

  return (
    <div className="pg">
      <main className="flex-1">
        <section className="pg-hero">
          <div className="pg-hero-inner">
            <div className="pg-hero-chip">
              <span className="chip-dot" aria-hidden />
              Community
            </div>
            <h1>
              Meet Our{' '}
              <span className="gradient-text">Community</span>
            </h1>
            <p className="hero-sub">
              Designers, engineers, and builders in one place—share work, learn from peers, and ship
              better products with people who care about craft as much as you do.
            </p>
          </div>
        </section>

        <section className="pg-sec">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd">
              <h2>Why join VokDev</h2>
              <p>
                Everything you need to grow your skills, find collaborators, and stay connected to
                what is happening across the ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {communityFeatures.map((feature, index) => (
                <VokDevCard
                  key={index}
                  variant="default"
                  isHoverable={false}
                  hasGlow={false}
                  className="pg-card pg-card-accent flex h-full flex-col !shadow-none"
                >
                  <div className="pg-icon mb-4">
                    <feature.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec pg-sec-alt">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd">
              <h2>Browse by role</h2>
              <p>Filter member spotlights to match the kind of collaboration you are looking for.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`pg-pill ${selectedRole === role ? 'pg-pill-active' : ''}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-sec">
          <div className="pg-sec-inner">
            <div className="pg-sec-hd">
              <h2>Member spotlights</h2>
              <p>
                Showing {filteredMembers.length} of {communityMembers.length} profiles for the
                selected filter.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="pg-card flex flex-col items-center text-center">
                  <div className="relative mb-5 inline-flex">
                    <div className="pg-avatar-ring">
                      <div className="pg-avatar">
                        <member.avatar className="h-7 w-7 shrink-0" aria-hidden />
                      </div>
                    </div>
                    <span className="pg-online" title="Active" aria-hidden />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {member.role}
                  </p>
                  <div className="mb-5 flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty) => (
                      <VokDevBadge
                        key={specialty}
                        variant="secondary"
                        size="sm"
                        withGlow={false}
                        className="pg-tag !gap-0"
                      >
                        {specialty}
                      </VokDevBadge>
                    ))}
                  </div>
                  <div className="mb-5 flex w-full justify-around gap-4 border-y border-border/40 py-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">{member.projects}</div>
                      <p className="pg-stat-label">Projects</p>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-foreground">{member.followers}</div>
                      <p className="pg-stat-label">Followers</p>
                    </div>
                  </div>
                  <VokDevButton variant="secondary" size="sm" className="w-full">
                    View Profile
                  </VokDevButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="pg-divider mx-auto max-w-5xl border-0" />

        <section className="pg-sec pg-sec-alt">
          <div className="pg-sec-inner">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-10">
              <div>
                <div className="pg-stat-num gradient-text">2,450+</div>
                <p className="pg-stat-label">Active members</p>
              </div>
              <div>
                <div className="pg-stat-num gradient-text">180+</div>
                <p className="pg-stat-label">Projects</p>
              </div>
              <div>
                <div className="pg-stat-num gradient-text">45+</div>
                <p className="pg-stat-label">Events</p>
              </div>
              <div>
                <div className="pg-stat-num gradient-text">89%</div>
                <p className="pg-stat-label">Satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-cta">
          <div className="pg-cta-inner">
            <h2>Ready to join us?</h2>
            <p>
              Create an account to follow builders, join discussions, and get early access to events
              and programs.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <VokDevButton variant="primary" size="lg" withGlow>
                Create account
              </VokDevButton>
              <VokDevButton variant="secondary" size="lg">
                Learn more
              </VokDevButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
