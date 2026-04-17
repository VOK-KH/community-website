import type { LucideIcon } from 'lucide-react'
import {
  Target,
  Handshake,
  BookOpen,
  Globe2,
  Rocket,
  CircleUserRound,
  Wrench,
  Briefcase,
} from 'lucide-react'

export const aboutValues: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Target,
    title: 'Innovation First',
    description:
      'We embrace cutting-edge technologies and creative solutions to solve real problems.',
  },
  {
    icon: Handshake,
    title: 'Community Driven',
    description:
      'Our strength lies in our diverse community of passionate developers and designers.',
  },
  {
    icon: BookOpen,
    title: 'Learning Culture',
    description:
      'We believe in continuous growth, sharing knowledge, and mentoring the next generation.',
  },
  {
    icon: Globe2,
    title: 'Global Impact',
    description: 'We strive to create technology that makes a positive difference worldwide.',
  },
]

export const aboutTeamMembers: {
  name: string
  role: string
  avatar: LucideIcon
  bio: string
}[] = [
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

export const aboutImpactStats: { number: string; label: string }[] = [
  { number: '2,450+', label: 'Active Members' },
  { number: '180+', label: 'Projects' },
  { number: '45+', label: 'Community Events' },
  { number: '50+', label: 'Countries' },
]

export const aboutStoryMilestones: { year?: string; title: string; body: string }[] = [
  {
    year: '2020',
    title: 'The spark',
    body: 'VokDev started with a simple observation: the best work happens when talented people collaborate. Our founders saw developers and designers working in isolation, missing chances to learn from and build with others.',
  },
  {
    title: 'Growth that compounds',
    body: 'What began as a Discord server with fifty members grew into a community of over 2,450 professionals. Today we host a space where experimentation and shipping happen every day.',
  },
  {
    title: 'Milestones along the way',
    body: 'We have watched members go from beginners to industry leaders, and side projects become real ventures. Above all, we have nurtured a culture where people feel welcome and backed by peers.',
  },
  {
    title: 'What is next',
    body: 'Our commitment is unchanged: build a platform where tech professionals collaborate, learn continuously, and make a lasting impact on the world.',
  },
]
