'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { Project } from './data'
import { allProjects } from './data'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Star,
  Github,
  ExternalLink,
  Heart,
  Eye,
  Users,
  Sparkles,
  CircleDot,
  Mail,
  FolderOpen,
  Share2,
  ThumbsUp,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function formatCompact(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`
  }
  if (n >= 1000) {
    const k = n / 1000
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k`
  }
  return String(n)
}

function inferLanguage(tags: string[] | null | undefined): string {
  const t = (tags ?? []).join(' ').toLowerCase()
  if (t.includes('python')) return 'Python'
  if (t.includes('rust')) return 'Rust'
  if (t.includes('go ')) return 'Go'
  return 'TypeScript'
}

function languageDotColor(lang: string): string {
  const l = lang.toLowerCase()
  if (l.includes('python')) return '#3572A5'
  if (l.includes('rust')) return '#dea584'
  if (l.includes('typescript') || l.includes('javascript')) return '#f1e05a'
  return '#3b82f6'
}

function estimateViews(p: Project): number {
  return p.stars * 38 + p.members * 156 + p.id * 412
}

function splitCaseStudyBody(text: string): string[] {
  const parts = text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
  return parts.length ? parts : [text]
}

function titleWordmark(title: string): string {
  const w = title.split(/\s+/).filter(Boolean)
  return w.slice(0, 2).join(' ') || title
}

/** Centered case-study column (aligned with Behance-style viewer) */
const PREVIEW_CONTENT_CLASS = 'mx-auto w-full max-w-6xl'

function usePopoverHoverDismiss(setOpen: Dispatch<SetStateAction<boolean>>, leaveMs = 220) {
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
  }, [])

  const scheduleLeave = useCallback(() => {
    cancelLeave()
    leaveTimer.current = setTimeout(() => setOpen(false), leaveMs)
  }, [cancelLeave, leaveMs, setOpen])

  const openPinned = useCallback(() => {
    cancelLeave()
    setOpen(true)
  }, [cancelLeave, setOpen])

  useEffect(() => () => cancelLeave(), [cancelLeave])

  return { cancelLeave, scheduleLeave, openPinned }
}

export interface ProjectPreviewDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Sync parent state when user moves prev/next in the viewer */
  onProjectChange?: (project: Project) => void
}

export function ProjectPreviewDialog({
  project,
  open,
  onOpenChange,
  onProjectChange,
}: ProjectPreviewDialogProps) {
  const [following, setFollowing] = useState(false)
  const [saved, setSaved] = useState(false)

  const idx = project ? allProjects.findIndex((p) => p.id === project.id) : -1
  const hasPrev = idx > 0
  const hasNext = idx >= 0 && idx < allProjects.length - 1

  const goPrev = useCallback(() => {
    if (!hasPrev || idx <= 0) return
    onProjectChange?.(allProjects[idx - 1])
  }, [hasPrev, idx, onProjectChange])

  const goNext = useCallback(() => {
    if (!hasNext || idx < 0) return
    onProjectChange?.(allProjects[idx + 1])
  }, [hasNext, idx, onProjectChange])

  const scrollToTools = useCallback(() => {
    document.getElementById('proj-preview-tools')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share && project) {
        await navigator.share({ title: project.title, text: project.description, url })
        return
      }
    } catch {
      /* user cancelled or share failed */
    }
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* ignore */
    }
  }, [project])

  if (!project) return null

  const Icon = project.icon
  const tags = project.tags ?? []
  const language = project.language ?? inferLanguage(tags)
  const license = project.license ?? 'MIT'
  const status = project.status ?? 'active'
  const lastUpdated = project.lastUpdated ?? 'Recently'
  const repo = project.repositoryUrl ?? 'https://github.com'
  const team = project.teamLabel ?? 'Vokdev Community'
  const detail =
    project.previewDetails ??
    `${project.description} This case study highlights how builders collaborate in the open—tools, process, and what ships next.`

  const paragraphs = splitCaseStudyBody(detail)
  const views = estimateViews(project)
  const wordmark = titleWordmark(project.title)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        overlayClassName="backdrop-blur-xl bg-black/70"
        className={cn(
          'proj-preview-dialog proj-preview-behance-sheet',
          'h-[96dvh] max-h-[96dvh] w-full max-w-none gap-0 overflow-hidden',
          'rounded-t-2xl border border-zinc-800 bg-zinc-950 p-0 text-zinc-100',
          'sm:max-w-full',
        )}
      >
        <SheetTitle className="sr-only">{project.title}</SheetTitle>
        <SheetDescription className="sr-only">{project.description}</SheetDescription>

        <div className="relative flex min-h-0 flex-1 flex-col">
          {/* Sticky header — close fixed to sheet right; content stays max-width centered */}
          <header className="sticky top-0 z-20 shrink-0 border-b border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md">
            <SheetClose
              className={cn(
                'absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-md p-2 text-zinc-400 transition-colors',
                'hover:bg-zinc-800 hover:text-zinc-100',
                'focus-visible:ring-2 focus-visible:ring-zinc-600 focus-visible:outline-none',
                'sm:right-5',
              )}
            >
              <span className="sr-only">Close</span>
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </SheetClose>
            <div
              className={cn(
                PREVIEW_CONTENT_CLASS,
                'px-3 py-3 pr-12 sm:px-5 sm:pr-14',
              )}
            >
              <h2 className="text-pretty text-base font-bold leading-snug tracking-tight text-zinc-50 sm:text-lg">
                {project.title}
              </h2>
            </div>
          </header>

          <div className="relative min-h-0 flex-1">
            <div
              className={cn(
                'h-full overflow-y-auto overflow-x-hidden overscroll-contain',
                'px-4 pb-32 pt-2 sm:px-6 sm:pr-20 sm:pb-28',
              )}
            >
              <div className={cn(PREVIEW_CONTENT_CLASS)}>
              {/* Hero stage — grain + large type */}
              <div className="proj-preview-stage relative mb-8 min-h-[min(42vh,380px)] overflow-hidden rounded-2xl border border-zinc-800/80">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  aria-hidden
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-zinc-800/50 via-zinc-950 to-black" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(0,87,255,0.12),transparent_55%)]" />
                <div className="relative flex h-full min-h-[min(42vh,380px)] flex-col items-center justify-center px-6 py-12 text-center">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    {project.category}
                  </p>
                  <p
                    className="max-w-[95%] select-none text-balance font-sans text-[clamp(2rem,10vw,4.5rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]"
                    style={{ textShadow: '0 0 80px rgba(0,87,255,0.25)' }}
                  >
                    {wordmark}
                  </p>
                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-zinc-400">{project.description}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="mb-10 grid grid-cols-3 gap-2 border-y border-zinc-800 py-5 sm:gap-4">
                <div className="proj-preview-behance-stat text-zinc-300">
                  <Heart
                    className="mx-auto size-5 fill-rose-500/90 text-rose-500"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="text-lg font-bold tabular-nums text-zinc-50 sm:text-xl">
                    {formatCompact(project.stars)}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Appreciations
                  </span>
                </div>
                <div className="proj-preview-behance-stat text-zinc-300">
                  <Eye className="mx-auto size-5 text-zinc-500" strokeWidth={1.75} aria-hidden />
                  <span className="text-lg font-bold tabular-nums text-zinc-50 sm:text-xl">
                    {formatCompact(views)}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Views
                  </span>
                </div>
                <div className="proj-preview-behance-stat text-zinc-300">
                  <Users className="mx-auto size-5 text-zinc-500" strokeWidth={1.75} aria-hidden />
                  <span className="text-lg font-bold tabular-nums text-zinc-50 sm:text-xl">
                    {project.members}
                  </span>
                  <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Team
                  </span>
                </div>
              </div>

              <section id="proj-preview-tools" className="mb-10 scroll-mt-24">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="size-4 text-[#4d8fff]" aria-hidden />
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Tools &amp; technologies
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mb-10 border-t border-zinc-800 pt-10">
                <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  About this project
                </h3>
                <div className="space-y-5">
                  {paragraphs.map((block, i) => (
                    <p
                      key={i}
                      className={cn(
                        'max-w-prose text-pretty leading-[1.75] text-zinc-300 sm:max-w-none',
                        i === 0 ? 'text-[1.05rem] text-zinc-100 sm:text-lg' : 'text-[0.95rem]',
                      )}
                    >
                      {block}
                    </p>
                  ))}
                </div>
              </section>

              <section className="mb-8">
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Production notes
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: 'Status',
                      node: (
                        <span className="flex items-center gap-2 text-sm font-medium text-zinc-200">
                          <CircleDot
                            className={cn(
                              'size-3.5',
                              status === 'active' ? 'text-emerald-400' : 'text-amber-400',
                            )}
                          />
                          {status === 'active' ? 'Active development' : 'Public beta'}
                        </span>
                      ),
                    },
                    { label: 'Last activity', node: <span className="text-sm text-zinc-200">{lastUpdated}</span> },
                    {
                      label: 'Primary language',
                      node: (
                        <span className="flex items-center gap-2 text-sm text-zinc-200">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ background: languageDotColor(language) }}
                          />
                          {language}
                        </span>
                      ),
                    },
                    { label: 'License', node: <span className="text-sm text-zinc-200">{license}</span> },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        {item.label}
                      </p>
                      <div className="mt-2">{item.node}</div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800 pt-8 text-zinc-500">
                <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                <span className="text-sm">
                  <span className="font-semibold tabular-nums text-zinc-200">
                    {formatCompact(project.stars)}
                  </span>
                  <span className="ml-1.5">GitHub stars</span>
                </span>
                <span className="mx-2 text-zinc-700">·</span>
                <Users className="size-4 text-zinc-500" aria-hidden />
                <span className="text-sm">
                  <span className="font-semibold tabular-nums text-zinc-200">{project.members}</span>
                  <span className="ml-1.5">contributors</span>
                </span>
              </div>
              </div>
            </div>

            {/* Floating action rail */}
            <aside
              className="pointer-events-none absolute right-2 top-8 z-30 flex flex-col gap-3 max-sm:right-1 max-sm:top-6 max-sm:scale-90"
              aria-label="Project actions"
            >
              <div className="pointer-events-auto flex flex-col gap-3 rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-2 shadow-2xl backdrop-blur-md">
                <ProjectActionProfile
                  project={project}
                  Icon={Icon}
                  team={team}
                  following={following}
                  setFollowing={setFollowing}
                  formatCompact={formatCompact}
                />
                <RailBtn
                  icon={Mail}
                  label="Hire"
                  href="mailto:hello@vokdev.community?subject=Project%20inquiry"
                />
                <RailBtn icon={Sparkles} label="Tools" onClick={scrollToTools} />
                <RailBtn
                  icon={saved ? Bookmark : FolderOpen}
                  label="Save"
                  onClick={() => setSaved((s) => !s)}
                  active={saved}
                />
                <RailBtn icon={Share2} label="Share" onClick={handleShare} />
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 rounded-xl bg-[#0057ff] p-2.5 text-white shadow-lg transition hover:bg-[#0046cc]"
                >
                  <ThumbsUp className="size-5" strokeWidth={2} aria-hidden />
                  <span className="text-[9px] font-semibold uppercase tracking-wide">Appreciate</span>
                </a>
              </div>
            </aside>

            {/* Prev / Next — project carousel */}
            {(hasPrev || hasNext) && onProjectChange ? (
              <nav
                className="pointer-events-none absolute bottom-6 left-3 right-3 z-20 flex justify-between sm:left-6 sm:right-6"
                aria-label="Browse projects"
              >
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={goPrev}
                  className={cn(
                    'pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-200 shadow-lg backdrop-blur-md transition',
                    'hover:border-zinc-600 hover:bg-zinc-800',
                    'disabled:pointer-events-none disabled:opacity-30',
                  )}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={goNext}
                  className={cn(
                    'pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-200 shadow-lg backdrop-blur-md transition',
                    'hover:border-zinc-600 hover:bg-zinc-800',
                    'disabled:pointer-events-none disabled:opacity-30',
                  )}
                  aria-label="Next project"
                >
                  <ChevronRight className="size-6" />
                </button>
              </nav>
            ) : null}
          </div>

          <SheetFooter className="mt-0 shrink-0 border-t border-zinc-800 bg-zinc-950 p-0">
            <div
              className={cn(
                PREVIEW_CONTENT_CLASS,
                'flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5',
              )}
            >
              <p className="text-center text-xs leading-relaxed text-zinc-500 sm:text-left">
                Open the repo for issues, roadmap, and contribution guidelines.
              </p>
              <Link
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#0057ff] px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0046cc] sm:w-auto"
              >
                <Github className="size-4" />
                View on GitHub
                <ExternalLink className="size-3.5 opacity-80" aria-hidden />
              </Link>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ProjectActionProfile({
  project,
  Icon,
  team,
  following,
  setFollowing,
  formatCompact,
}: {
  project: Project
  Icon: LucideIcon
  team: string
  following: boolean
  setFollowing: Dispatch<SetStateAction<boolean>>
  formatCompact: (n: number) => string
}) {
  const [open, setOpen] = useState(false)
  const { cancelLeave, scheduleLeave, openPinned } = usePopoverHoverDismiss(setOpen)

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex flex-col items-center gap-1 rounded-xl border border-transparent p-2.5 text-zinc-400 transition-colors',
            'hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100',
            'focus-visible:ring-2 focus-visible:ring-zinc-600 focus-visible:outline-none',
            open && 'border-zinc-600 bg-zinc-900 text-zinc-100',
          )}
          aria-label={`${team} — profile details`}
          aria-expanded={open}
          onMouseEnter={openPinned}
          onMouseLeave={scheduleLeave}
        >
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 shadow-inner">
              <Icon className="size-5 text-zinc-200" strokeWidth={1.5} />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0057ff] text-[10px] font-bold text-white"
              aria-hidden
            >
              +
            </span>
          </div>
          <span className="text-[9px] font-medium uppercase tracking-wide text-zinc-500">Profile</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="end"
        sideOffset={10}
        collisionPadding={16}
        onMouseEnter={cancelLeave}
        onMouseLeave={scheduleLeave}
        className="z-80 w-72 border-zinc-700 bg-zinc-950 p-4 text-zinc-100 shadow-2xl"
      >
        <div className="flex gap-3">
          <div className="relative shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900">
              <Icon className="size-6 text-zinc-200" strokeWidth={1.5} />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0057ff] text-[10px] font-bold text-white"
              aria-hidden
            >
              +
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold leading-tight text-zinc-50">{team}</p>
            <p className="mt-1 text-xs text-zinc-500">{project.category}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-4 border-t border-zinc-800 pt-3 text-xs text-zinc-500">
          <span>
            <span className="font-semibold tabular-nums text-zinc-200">{project.members}</span> contributors
          </span>
          <span>
            <span className="font-semibold tabular-nums text-zinc-200">{formatCompact(project.stars)}</span> stars
          </span>
        </div>
        <button
          type="button"
          onClick={() => setFollowing((f) => !f)}
          className={cn(
            'mt-4 w-full rounded-md py-2 text-sm font-semibold transition-colors',
            following
              ? 'border border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
              : 'bg-[#0057ff] text-white hover:bg-[#0046cc]',
          )}
        >
          {following ? 'Following' : 'Follow'}
        </button>
      </PopoverContent>
    </Popover>
  )
}

function RailBtn({
  icon: IconEl,
  label,
  onClick,
  href,
  active,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>
  label: string
  onClick?: () => void
  href?: string
  active?: boolean
}) {
  const className = cn(
    'flex flex-col items-center gap-1 rounded-xl p-2.5 transition-colors',
    'border border-transparent text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100',
    active && 'border-zinc-600 bg-zinc-900 text-[#4d8fff]',
  )

  const inner = (
    <>
      <IconEl className="size-5" strokeWidth={1.75} aria-hidden />
      <span className="text-[9px] font-medium uppercase tracking-wide text-zinc-500">{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  )
}
