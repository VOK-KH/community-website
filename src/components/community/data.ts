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

export type CommunityMember = {
  id: number
  name: string
  role: string
  avatar: LucideIcon
  specialties: string[]
  projects: number
  followers: number
}

export const communityMembers: CommunityMember[] = [
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

export type CommunityFeature = {
  icon: LucideIcon
  title: string
  description: string
}

export const communityFeatures: CommunityFeature[] = [
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

export type CommunityStat = {
  value: string
  label: string
}

export const communityStats: CommunityStat[] = [
  { value: '2,450+', label: 'Active members' },
  { value: '180+', label: 'Projects' },
  { value: '45+', label: 'Events' },
  { value: '89%', label: 'Satisfaction rate' },
]
