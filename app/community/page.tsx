'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { VokDevButton } from '@/components/VokDevButton'
import { VokDevCard, VokDevCardHeader, VokDevCardTitle, VokDevCardDescription, VokDevCardContent } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { useState } from 'react'

const communityMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Designer',
    avatar: '👩‍💼',
    specialties: ['UI Design', 'User Research', 'Design Systems'],
    projects: 4,
    followers: 245,
  },
  {
    id: 2,
    name: 'Alex Rodriguez',
    role: 'Full Stack Developer',
    avatar: '👨‍💻',
    specialties: ['React', 'Node.js', 'AWS'],
    projects: 8,
    followers: 512,
  },
  {
    id: 3,
    name: 'Jordan Lee',
    role: 'DevOps Engineer',
    avatar: '👨‍🔧',
    specialties: ['Kubernetes', 'CI/CD', 'Infrastructure'],
    projects: 5,
    followers: 189,
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'AI/ML Engineer',
    avatar: '👩‍🔬',
    specialties: ['Machine Learning', 'Python', 'Data Science'],
    projects: 6,
    followers: 378,
  },
  {
    id: 5,
    name: 'Michael Park',
    role: 'Frontend Developer',
    avatar: '👨‍💻',
    specialties: ['Vue.js', 'TypeScript', 'Performance'],
    projects: 7,
    followers: 423,
  },
  {
    id: 6,
    name: 'Lisa Zhang',
    role: 'UX Researcher',
    avatar: '👩‍🎓',
    specialties: ['User Research', 'Accessibility', 'Analytics'],
    projects: 3,
    followers: 156,
  },
  {
    id: 7,
    name: 'David Morrison',
    role: 'Tech Lead',
    avatar: '👨‍💼',
    specialties: ['Architecture', 'Mentoring', 'Best Practices'],
    projects: 9,
    followers: 678,
  },
  {
    id: 8,
    name: 'Priya Patel',
    role: 'Security Engineer',
    avatar: '👩‍💻',
    specialties: ['Security', 'Cryptography', 'Compliance'],
    projects: 4,
    followers: 234,
  },
]

const communityFeatures = [
  {
    icon: '💬',
    title: 'Discussion Forums',
    description: 'Ask questions, share ideas, and get answers from experienced members',
  },
  {
    icon: '🎓',
    title: 'Learning Paths',
    description: 'Structured learning materials curated by community experts',
  },
  {
    icon: '🤝',
    title: 'Mentorship',
    description: 'Connect with mentors and guide the next generation of developers',
  },
  {
    icon: '🎪',
    title: 'Community Events',
    description: 'Attend webinars, workshops, and meetups throughout the year',
  },
  {
    icon: '🏆',
    title: 'Recognition',
    description: 'Earn badges and recognition for your contributions',
  },
  {
    icon: '🌍',
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-16 md:py-24 border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Community</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Connect with talented designers, developers, and innovators. Learn, collaborate, and build amazing things together.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join VokDev?</h2>
              <p className="text-muted-foreground text-lg">
                Be part of a thriving community focused on growth and collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityFeatures.map((feature, index) => (
                <VokDevCard key={index} variant="default">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        {/* Members Filter Section */}
        <section className="px-4 py-12 bg-card/50 border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Filter by Role</h3>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedRole === role
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section className="px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredMembers.length} of {communityMembers.length} members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <VokDevCard key={member.id} variant="interactive" className="hover-lift flex flex-col">
                  <div className="text-5xl mb-4 text-center">{member.avatar}</div>
                  
                  <h3 className="text-lg font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-primary text-center font-medium mb-4">{member.role}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {member.specialties.slice(0, 2).map((specialty) => (
                      <VokDevBadge key={specialty} variant="secondary" size="sm">
                        {specialty}
                      </VokDevBadge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-around text-center py-3 border-y border-border/40 mb-4">
                    <div>
                      <div className="text-lg font-semibold text-primary">{member.projects}</div>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-secondary">{member.followers}</div>
                      <p className="text-xs text-muted-foreground">Followers</p>
                    </div>
                  </div>

                  <VokDevButton variant="secondary" size="sm" className="w-full">
                    View Profile
                  </VokDevButton>
                </VokDevCard>
              ))}
            </div>
          </div>
        </section>

        {/* Community Stats Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 border-y border-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,450+</div>
                <p className="text-muted-foreground">Active Members</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">180+</div>
                <p className="text-muted-foreground">Projects</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-tertiary mb-2">45+</div>
                <p className="text-muted-foreground">Events</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">89%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Become part of the VokDev community and connect with thousands of talented professionals.
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
