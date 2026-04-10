/** Marquee row 1 — duplicate sequence for seamless loop (matches vokdev-landing-v3.html) */
export const marqueeRow1 = [
  { text: 'Build Together', mod: 'c' as const },
  { text: 'Open Source', mod: undefined },
  { text: 'Ship Fast', mod: 'v' as const },
  { text: 'Community First', mod: undefined },
  { text: 'Grow Together', mod: 'e' as const },
  { text: 'Share Knowledge', mod: undefined },
  { text: 'Vision Of Knowledge', mod: 'c' as const },
  { text: 'No Gatekeeping', mod: undefined },
] as const

/** Marquee row 2 */
export const marqueeRow2 = [
  { text: 'Learn In Public', mod: 'e' as const },
  { text: 'Code Reviews', mod: undefined },
  { text: 'Side Projects', mod: 'c' as const },
  { text: 'Dev Journals', mod: undefined },
  { text: 'Hack Nights', mod: 'v' as const },
  { text: 'Weekly Challenges', mod: undefined },
  { text: 'Mentorship', mod: 'e' as const },
  { text: 'Pair Programming', mod: undefined },
] as const

export const aboutPills = [
  'Open Source',
  'Project Showcases',
  'Dev Journals',
  'Code Reviews',
  'Weekly Challenges',
  'Mentorship',
  'Job Board',
  'Pair Programming',
] as const

export type LandingProject = {
  id: string
  colClass: 'col8' | 'col4'
  cardClass: 'c-cy' | 'c-vi' | 'c-em' | 'c-am' | 'c-pk' | 'c-bl'
  iconClass: 'i-cy' | 'i-vi' | 'i-em' | 'i-am' | 'i-pk' | 'i-bl'
  icon: string
  stars: number
  title: string
  description: string
  tags: string[]
  author: { initials: string; handle: string; av: 'av-c' | 'av-v' | 'av-e' | 'av-a' | 'av-p' | 'av-b' }
}

export const featuredProjects: LandingProject[] = [
  {
    id: 'flowcanvas',
    colClass: 'col8',
    cardClass: 'c-cy',
    iconClass: 'i-cy',
    icon: 'Waves',
    stars: 284,
    title: 'FlowCanvas',
    description:
      'Browser-based visual programming environment for data pipelines. Drag, drop, deploy without writing a line of config.',
    tags: ['TypeScript', 'React', 'WebGL'],
    author: { initials: 'AK', handle: 'alex.k', av: 'av-c' },
  },
  {
    id: 'prism-cli',
    colClass: 'col4',
    cardClass: 'c-vi',
    iconClass: 'i-vi',
    icon: 'Sparkles',
    stars: 142,
    title: 'Prism CLI',
    description:
      'Terminal tool that reads your git history and returns plain-English change summaries instantly.',
    tags: ['Rust', 'CLI'],
    author: { initials: 'MJ', handle: 'm_jayden', av: 'av-v' },
  },
  {
    id: 'greenqueue',
    colClass: 'col4',
    cardClass: 'c-em',
    iconClass: 'i-em',
    icon: 'Leaf',
    stars: 198,
    title: 'GreenQueue',
    description:
      'Carbon-aware job scheduler. Delays non-urgent tasks to when the grid is cleanest. Drop-in Redis replacement.',
    tags: ['Go', 'Redis'],
    author: { initials: 'SR', handle: 'sara.r', av: 'av-e' },
  },
  {
    id: 'hotdiff',
    colClass: 'col4',
    cardClass: 'c-am',
    iconClass: 'i-am',
    icon: 'Zap',
    stars: 91,
    title: 'HotDiff',
    description:
      'Live API diffing across environments. Compare request/response pairs in real time, zero setup required.',
    tags: ['Python', 'FastAPI'],
    author: { initials: 'TK', handle: 't.kong', av: 'av-a' },
  },
  {
    id: 'gemui',
    colClass: 'col4',
    cardClass: 'c-pk',
    iconClass: 'i-pk',
    icon: 'Gem',
    stars: 217,
    title: 'GemUI',
    description:
      'Headless component library with instant brand adaptation via design tokens. Zero runtime overhead.',
    tags: ['Vue', 'CSS'],
    author: { initials: 'LC', handle: 'l.chen', av: 'av-p' },
  },
  {
    id: 'orbiter',
    colClass: 'col4',
    cardClass: 'c-bl',
    iconClass: 'i-bl',
    icon: 'Telescope',
    stars: 76,
    title: 'Orbiter',
    description:
      'Self-hosted analytics. 1MB bundle, no cookies, open source. Runs on a $5 VPS in minutes.',
    tags: ['Svelte', 'SQLite'],
    author: { initials: 'NP', handle: 'n.patel', av: 'av-b' },
  },
]
