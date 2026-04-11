'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { Project } from './data'
import { Star, ArrowUpRight } from 'lucide-react'
import { gsap, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'
import { ProjectPreviewDialog } from './ProjectPreviewDialog'

registerGsap()

type AccentKind = 'design' | 'ai' | 'devops' | 'default'

function categoryAccent(category: string): AccentKind {
  const c = category.toLowerCase()
  if (c.includes('design')) return 'design'
  if (c.includes('ai') || c.includes('ml')) return 'ai'
  if (c.includes('devops') || c.includes('cloud')) return 'devops'
  return 'default'
}

function formatStarCount(n: number): string {
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

function avatarInitials(project: Project): [string, string, string] {
  const w = project.title.split(/\s+/).filter(Boolean)
  const tags = project.tags ?? []
  const pick = (s: string | undefined, fallback: string) =>
    (s?.slice(0, 2) ?? fallback).toUpperCase().padEnd(2, '·').slice(0, 2)
  return [
    pick(w[0], 'PR'),
    pick(w[1], tags[0] ?? 'CO'),
    pick(w[2], tags[1] ?? 'EX'),
  ]
}

const ACCENT = {
  design: {
    hoverBorder: '#2fffca',
    ring: '#2fffca',
    tagHover: '#2fffca',
    tagBorderHover: '#1a4a40',
    ripple: 'rgba(47, 255, 202, 0.12)',
  },
  ai: {
    hoverBorder: '#d2a8ff',
    ring: '#d2a8ff',
    tagHover: '#d2a8ff',
    tagBorderHover: '#3a1f5a',
    ripple: 'rgba(210, 168, 255, 0.12)',
  },
  devops: {
    hoverBorder: '#79c0ff',
    ring: '#79c0ff',
    tagHover: '#79c0ff',
    tagBorderHover: '#1a3a5a',
    ripple: 'rgba(121, 192, 255, 0.12)',
  },
  /* GSAP cannot tween `hsl(var(--primary))` — use parseable colors (splitColor / CSSPlugin) */
  default: {
    hoverBorder: '#3b82f6',
    ring: '#3b82f6',
    tagHover: '#3b82f6',
    tagBorderHover: 'rgba(59, 130, 246, 0.5)',
    ripple: 'rgba(59, 130, 246, 0.14)',
  },
} as const

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [navProject, setNavProject] = useState<Project | null>(null)

  const kind = categoryAccent(project.category)
  const status = project.status ?? 'active'
  const tagList = project.tags ?? []
  const language = project.language ?? inferLanguage(tagList)
  const license = project.license ?? 'MIT'
  const lastUpdated = project.lastUpdated ?? 'Recently'
  const [a1, a2, a3] = avatarInitials(project)
  const extraMembers = Math.max(0, project.members - 3)
  const accent = ACCENT[kind]

  const catClass =
    kind === 'design'
      ? 'proj-card-gh__cat--design'
      : kind === 'ai'
        ? 'proj-card-gh__cat--ai'
        : kind === 'devops'
          ? 'proj-card-gh__cat--devops'
          : 'proj-card-gh__cat--default'

  const Icon = project.icon

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    const ring = ringRef.current
    const icon = iconRef.current
    const arrow = arrowRef.current
    if (!wrap || !card || !ring || !icon || !arrow) return

    const motionAccent = ACCENT[kind]

    const reduced = prefersReducedMotion()
    const fine = hasFinePointer()

    if (reduced) return

    let glowPulse: gsap.core.Tween | null = null
    let tiltTween: gsap.core.Tween | null = null

    const onEnter = () => {
      gsap.killTweensOf([card, ring, icon, arrow])
      card.classList.add('proj-card-gh--hover')
      gsap.to(card, {
        y: -6,
        scale: 1.02,
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(ring, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      glowPulse?.kill()
      glowPulse = gsap.to(ring, {
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'sine.inOut',
      })
      gsap.to(icon, { rotate: 8, scale: 1.12, duration: 0.35, ease: 'back.out(2)' })
      gsap.to(arrow, { x: 2, y: -2, scale: 1.1, duration: 0.3, ease: 'power2.out' })
    }

    const onLeave = () => {
      glowPulse?.kill()
      glowPulse = null
      gsap.killTweensOf([card, ring, icon, arrow])
      card.classList.remove('proj-card-gh--hover')
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        duration: 0.45,
        ease: 'elastic.out(1, 0.7)',
        transformPerspective: 600,
      })
      gsap.to(ring, { opacity: 0, duration: 0.3 })
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.7)' })
      gsap.to(arrow, { x: 0, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
    }

    const onMove = (e: MouseEvent) => {
      if (!fine) return
      const r = card.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / r.width
      const dy = (e.clientY - cy) / r.height
      tiltTween?.kill()
      tiltTween = gsap.to(card, {
        rotateY: dx * 10,
        rotateX: -dy * 10,
        duration: 0.25,
        ease: 'power1.out',
        transformPerspective: 600,
      })
    }

    const onDown = () => {
      gsap.to(card, { scale: 0.97, duration: 0.12, ease: 'power2.in' })
      const rip = document.createElement('div')
      rip.setAttribute('aria-hidden', 'true')
      rip.className = 'pointer-events-none absolute rounded-full'
      rip.style.width = '200px'
      rip.style.height = '200px'
      rip.style.left = '50%'
      rip.style.top = '50%'
      rip.style.margin = '-100px 0 0 -100px'
      rip.style.background = motionAccent.ripple
      card.style.position = 'relative'
      card.appendChild(rip)
      gsap.fromTo(
        rip,
        { scale: 0, opacity: 1 },
        {
          scale: 3,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => rip.remove(),
        },
      )
    }

    const onUp = () => {
      gsap.to(card, { scale: 1.02, duration: 0.2, ease: 'back.out(2)' })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      glowPulse?.kill()
      tiltTween?.kill()
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [kind, project.id])

  const onTagEnter = (el: HTMLElement) => {
    el.classList.add('is-hover')
  }

  const onTagLeave = (el: HTMLElement) => {
    el.classList.remove('is-hover')
  }

  const openPreview = () => {
    setNavProject(project)
    setPreviewOpen(true)
  }

  const previewTarget = navProject ?? project

  return (
    <div
      ref={wrapRef}
      className="proj-card-wrap"
      data-proj-accent={kind}
    >
      <ProjectPreviewDialog
        key={previewTarget.id}
        project={previewTarget}
        open={previewOpen}
        onOpenChange={(open) => {
          setPreviewOpen(open)
          if (!open) setNavProject(null)
        }}
        onProjectChange={setNavProject}
      />
      <div
        ref={ringRef}
        className="proj-card-glow-ring"
        style={{ borderColor: accent.ring }}
        aria-hidden
      />

      <article
        ref={cardRef}
        className={`proj-card-gh group cursor-pointer ${kind === 'design' ? 'proj-card-gh--featured' : ''}`}
        tabIndex={0}
        role="region"
        aria-label={`${project.title}. Press Enter to open full preview.`}
        onClick={openPreview}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openPreview()
          }
        }}
      >
        <div className="proj-card-gh__top">
          <div ref={iconRef} className="proj-card-gh__icon">
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
          </div>
          <span className={`proj-card-gh__cat ${catClass}`}>{project.category}</span>
        </div>

        <div className="proj-card-gh__body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>

        <div className="proj-card-gh__tags">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="proj-card-gh__tag"
              onMouseEnter={(e) => onTagEnter(e.currentTarget)}
              onMouseLeave={(e) => onTagLeave(e.currentTarget)}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="proj-card-gh__divider" aria-hidden />

        <div className="proj-card-gh__meta">
          <div className="proj-card-gh__meta-item">
            <span className="proj-card-gh__meta-label">Status</span>
            <span className="proj-card-gh__meta-val">
              {status === 'active' ? (
                <>
                  <span
                    className="proj-card-gh__dot proj-card-gh__dot--green proj-card-gh__dot--pulse"
                    aria-hidden
                  />
                  Active
                </>
              ) : (
                <>
                  <span className="proj-card-gh__dot proj-card-gh__dot--amber proj-card-gh__dot--pulse" aria-hidden />
                  Beta
                </>
              )}
            </span>
          </div>
          <div className="proj-card-gh__meta-item">
            <span className="proj-card-gh__meta-label">Last updated</span>
            <span className="proj-card-gh__meta-val text-muted-foreground">{lastUpdated}</span>
          </div>
          <div className="proj-card-gh__meta-item">
            <span className="proj-card-gh__meta-label">Language</span>
            <span className="proj-card-gh__meta-val">
              <span
                className="proj-card-gh__lang-dot"
                style={{ background: languageDotColor(language) }}
                aria-hidden
              />
              {language}
            </span>
          </div>
          <div className="proj-card-gh__meta-item">
            <span className="proj-card-gh__meta-label">License</span>
            <span className="proj-card-gh__meta-val text-muted-foreground">{license}</span>
          </div>
        </div>

        <div className="proj-card-gh__divider" aria-hidden />

        <div className="proj-card-gh__footer">
          <div className="proj-card-gh__footer-left">
            <div className="proj-card-gh__stars">
              <Star className="h-[13px] w-[13px] shrink-0 fill-amber-400 text-amber-400" aria-hidden />
              <span className="proj-card-gh__stars-val tabular-nums">
                {formatStarCount(project.stars)}
              </span>
            </div>
            <div className="proj-card-gh__members">
              <div className="proj-card-gh__avatars" aria-hidden>
                <span className="proj-card-gh__av proj-card-gh__av--1">{a1}</span>
                <span className="proj-card-gh__av proj-card-gh__av--2">{a2}</span>
                <span className="proj-card-gh__av proj-card-gh__av--3">{a3}</span>
                <span className="proj-card-gh__av proj-card-gh__av--count">
                  +{extraMembers}
                </span>
              </div>
              <span className="proj-card-gh__contrib">{project.members} members</span>
            </div>
          </div>

          <div ref={arrowRef} className="proj-card-gh__arrow" aria-hidden>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </div>
        </div>
      </article>
    </div>
  )
}
