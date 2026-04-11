import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Paintbrush,
  BarChart3,
  Blocks,
  Smartphone,
  LineChart,
  FlaskConical,
  Cloud,
} from 'lucide-react'

export interface Project {
  id: number
  title: string
  description: string
  category: string
  tags: string[]
  members: number
  stars: number
  icon: LucideIcon
  /** Main language label for card meta row */
  language?: string
  license?: string
  status?: 'active' | 'beta'
  /** Shown in meta grid, e.g. "2 days ago" */
  lastUpdated?: string
  /** Extra paragraph(s) in the preview modal */
  previewDetails?: string
  /** Primary GitHub / repo link for the preview CTA */
  repositoryUrl?: string
  /** Behance-style credit line, e.g. team or studio name */
  teamLabel?: string
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: 'AI Chat Platform',
    description: 'Real-time collaborative AI chat with context awareness and custom models',
    category: 'AI/ML',
    tags: ['AI', 'Chat', 'Real-time'],
    members: 5,
    stars: 234,
    icon: Bot,
    teamLabel: 'Vokdev AI Guild',
    previewDetails:
      'We set out to make collaborative AI feel as natural as a shared doc—streaming tokens, shared context, and room-level permissions without the usual glue code.\n\nIncludes streaming responses, shared workspaces, and adapter hooks for custom models. The team ships weekly releases; RFCs live in the repo wiki.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 2,
    title: 'Design System UI Kit',
    description: 'Production-ready component library with 50+ accessible components',
    category: 'Design',
    tags: ['UI', 'Components', 'Design'],
    members: 3,
    stars: 512,
    icon: Paintbrush,
    language: 'TypeScript',
    license: 'MIT',
    status: 'active',
    lastUpdated: '2 days ago',
    teamLabel: 'Design Systems Lab',
    previewDetails:
      'A single source of truth for product teams: tokens, components, and documentation that stay aligned from Figma to production.\n\nTokens, themes, and Storybook stories stay in sync with the published npm package. Figma library updates ship on a quarterly cadence with migration notes.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Web Performance Dashboard',
    description: 'Monitor and analyze web performance metrics with real-time analytics',
    category: 'DevTools',
    tags: ['Analytics', 'Dashboard', 'Performance'],
    members: 4,
    stars: 189,
    icon: BarChart3,
    teamLabel: 'Performance Guild',
    previewDetails:
      'The brief was simple: see performance regressions before users do. We unified RUM, lab data, and custom marks in one place.\n\nCollect Core Web Vitals, long tasks, and custom marks in one dashboard. Alerts integrate with Slack and email; exports to BigQuery are in beta.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 4,
    title: 'Full-Stack Framework',
    description: 'Modern framework combining frontend and backend in one seamless experience',
    category: 'Framework',
    tags: ['Framework', 'Full-stack', 'Backend'],
    members: 8,
    stars: 678,
    icon: Blocks,
    teamLabel: 'Framework Collective',
    previewDetails:
      'We wanted one framework that feels great on day one and scales when the product gets serious—routing, data loading, and deploy targets without the usual yak shave.\n\nOpinionated defaults for routing, data loading, and deployment targets. Plugin API covers auth, ORMs, and edge runtimes without forking the core.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 5,
    title: 'Mobile App Builder',
    description: 'Low-code platform for building cross-platform mobile applications',
    category: 'Mobile',
    tags: ['Mobile', 'App', 'Cross-platform'],
    members: 6,
    stars: 445,
    icon: Smartphone,
    teamLabel: 'Mobile Craft Studio',
    previewDetails:
      'Low-code shouldn’t mean low quality—this project explores how far we can push visual editing while keeping real native output.\n\nDrag-and-drop screens, native builds, and a small runtime for custom logic. Paid templates fund maintenance; core editor remains MIT licensed.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 6,
    title: 'Data Visualization Library',
    description: 'Beautiful and interactive data visualization components for React',
    category: 'Visualization',
    tags: ['Charts', 'Data', 'Visualization'],
    members: 4,
    stars: 367,
    icon: LineChart,
    teamLabel: 'Data Viz Open Lab',
    previewDetails:
      'Charts should feel intentional, not noisy. We focused on composable primitives and motion that respects the data.\n\nComposable primitives for cartesian and polar charts with sensible animation defaults. SSR-safe; tree-shake only the modules you import.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 7,
    title: 'API Testing Suite',
    description: 'Comprehensive testing framework for REST and GraphQL APIs',
    category: 'Testing',
    tags: ['Testing', 'API', 'QA'],
    members: 5,
    stars: 278,
    icon: FlaskConical,
    language: 'TypeScript',
    license: 'MIT',
    status: 'beta',
    lastUpdated: '1 day ago',
    teamLabel: 'QA Tooling Guild',
    previewDetails:
      'APIs change fast; tests should catch drift before production. This work packages contract testing and great DX in one toolchain.\n\nContract tests, snapshot diffs, and CI reporters for REST and GraphQL. VS Code extension provides jump-to-schema and mock generators.',
    repositoryUrl: 'https://github.com',
  },
  {
    id: 8,
    title: 'Cloud Infrastructure Tool',
    description: 'Simplified cloud resource management and deployment automation',
    category: 'DevOps',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
    members: 7,
    stars: 521,
    icon: Cloud,
    teamLabel: 'Infra Automation Lab',
    previewDetails:
      'Infrastructure should be boring to operate and honest about drift. We built declarative workflows with safe rollbacks in mind.\n\nDeclarative stacks for common cloud vendors with drift detection and safe rollbacks. Terraform-compatible modules are published under the same semver.',
    repositoryUrl: 'https://github.com',
  },
]

export function getFeaturedProjects(count = 3): Project[] {
  return [...allProjects].sort((a, b) => b.stars - a.stars).slice(0, count)
}

export function starBarPercent(stars: number): number {
  return Math.min(100, (stars / 700) * 100)
}
