'use client'

import { useLayoutEffect, useRef } from 'react'
import { VokDevCard } from '@/components/VokDevCard'
import { VokDevBadge } from '@/components/VokDevBadge'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { aboutTeamMembers } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function AboutTeam() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.about-team-card'))

    if (cards.length === 0) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
      })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(cards, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      rotateX: 4,
      transformOrigin: 'center top',
      transformPerspective: 1000,
    })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(words, { y: '0%', duration: 0.9, stagger: 0.06 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78 }, 0.12)
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'back.out(1.1)',
        },
        0.22,
      )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={secRef}
      className="pg-sec relative overflow-hidden"
      aria-labelledby="team-heading"
    >
      <InteractiveGridPattern
        variant="absolute"
        pointerMode="global"
        cellSize={54}
        proximity={124}
        className="mask-[radial-gradient(ellipse_75%_60%_at_50%_55%,black,transparent)] opacity-45 text-foreground/15 dark:opacity-38 dark:text-foreground/11"
      />

      <div className="pg-sec-inner relative z-1">
        <div className="team-hd pg-sec-hd pg-sec-hd-center">
          <AboutSectionTitle id="team-heading" words={['Meet', 'the', 'Team']} />
          <p className="about-sec-desc">
            Leaders who keep the community ambitious, inclusive, and focused on real outcomes.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {aboutTeamMembers.map((member) => (
            <VokDevCard
              key={member.name}
              variant="default"
              isHoverable
              className="about-team-card group pg-card flex flex-col items-center p-7 text-center shadow-none transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg dark:shadow-none"
            >
              <div className="pg-avatar-ring mb-5 transition-transform duration-300 group-hover:scale-105">
                <div className="pg-avatar ring-1 ring-primary/10">
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
  )
}
