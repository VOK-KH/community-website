'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { getFeaturedProjects, type Project } from './data'
import { ProjectPreviewDialog } from './ProjectPreviewDialog'
import { Star, Users } from 'lucide-react'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

const featuredList = getFeaturedProjects(2) ?? []

registerGsap()

export function FeaturedProjects() {
  const secRef = useRef<HTMLElement>(null)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec || prefersReducedMotion()) return

    const tag = sec.querySelector('.featured-eyebrow')
    const words = Array.from(sec.querySelectorAll<HTMLElement>('.featured-hd .h1-word'))
    const desc = sec.querySelector('.featured-desc')
    const titles = Array.from(sec.querySelectorAll<HTMLElement>('.featured-card-title'))
    const blurbs = Array.from(sec.querySelectorAll<HTMLElement>('.featured-card-blurb'))
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.featured-card'))

    if (!tag || !desc || words.length === 0) return

    gsap.set(tag, { opacity: 0, x: -14, filter: 'blur(6px)' })
    gsap.set(words, { y: '110%' })
    gsap.set(desc, { opacity: 0, filter: 'blur(10px)', y: 16 })
    gsap.set(titles, { opacity: 0, y: 18, filter: 'blur(8px)' })
    gsap.set(blurbs, { opacity: 0, y: 12, filter: 'blur(6px)' })
    gsap.set(cards, {
      opacity: 0,
      y: 44,
      scale: 0.96,
      rotateX: 6,
      transformOrigin: 'center top',
      transformPerspective: 1000,
    })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      .to(tag, {
        opacity: 1, x: 0, filter: 'blur(0px)',
        duration: 0.62,
      }, 0)
      .to(words, {
        y: '0%',
        duration: 1,
        stagger: 0.12,
      }, 0.1)
      .to(desc, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.85,
      }, 0.35)
      .to(titles, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.75,
        stagger: 0.14,
      }, 0.5)
      .to(blurbs, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.65,
        stagger: 0.12,
      }, 0.62)
      .to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.92,
        stagger: 0.22,
        ease: 'back.out(1.15)',
      }, 0.62)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={secRef}
      className="pg-sec pg-sec-alt pg-featured relative overflow-hidden"
      aria-labelledby="featured-heading"
    >
      <InteractiveGridPattern
        variant="absolute"
        pointerMode="global"
        cellSize={56}
        proximity={132}
        drift
        ambientPulse
        vignette
        className="featured-grid-pattern z-0 opacity-[0.4] md:opacity-[0.52]"
      />

      <div className="relative z-10 pg-sec-inner">
        <div className="pg-sec-hd featured-hd">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h2 id="featured-heading" className="mb-0">
              <span className="h1-clip">
                <span className="h1-word">Featured</span>
              </span>
            </h2>
            <span className="pg-tag featured-eyebrow shrink-0">By stars</span>
          </div>
          <p className="featured-desc">
            Standout repos by community traction — ideal starting points for
            inspiration or collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8 [perspective:1200px]">
          {featuredList.map((project) => {
            const Icon = project.icon
            return (
              <article
                key={project.id}
                className="featured-card pg-card pg-card-accent flex min-h-[260px] cursor-pointer flex-col outline-none [transform-style:preserve-3d] transition-shadow focus-visible:ring-2 focus-visible:ring-primary/35"
                tabIndex={0}
                role="region"
                aria-label={`${project.title}. Press Enter to open full preview.`}
                onClick={() => setPreviewProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setPreviewProject(project)
                  }
                }}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="pg-icon pg-icon-lg shrink-0" aria-hidden>
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <span className="pg-tag shrink-0">{project.category}</span>
                </div>

                <h3 className="featured-card-title mb-2 text-xl font-bold leading-tight text-foreground md:text-[1.55rem]">
                  {project.title}
                </h3>
                <p className="featured-card-blurb mb-5 grow text-[0.95rem] leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {(project.tags ?? []).map((tag) => (
                    <span key={tag} className="pg-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-10 border-t border-border/40 pt-5">
                  <div>
                    <p className="pg-stat-num inline-flex items-center gap-2">
                      <Users size={18} className="opacity-50" />
                      {project.members}
                    </p>
                    <p className="pg-stat-label">Members</p>
                  </div>
                  <div>
                    <p className="pg-stat-num inline-flex items-center gap-2">
                      <Star size={18} className="text-amber-400" />
                      {project.stars}
                    </p>
                    <p className="pg-stat-label">Stars</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <ProjectPreviewDialog
        key={previewProject?.id ?? 'closed'}
        project={previewProject}
        open={previewProject !== null}
        onOpenChange={(open) => {
          if (!open) setPreviewProject(null)
        }}
        onProjectChange={setPreviewProject}
      />
    </section>
  )
}
