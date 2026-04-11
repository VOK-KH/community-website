'use client'

import { useLayoutEffect, useRef } from 'react'
import { VokDevCard } from '@/components/VokDevCard'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { communityFeatures } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function CommunityFeatures() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.community-feature-card'))

    if (cards.length === 0) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0 })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(cards, {
      opacity: 0,
      y: 36,
      scale: 0.96,
      rotateX: 5,
      transformOrigin: 'center top',
      transformPerspective: 1000,
    })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(words, { y: '0%', duration: 0.9, stagger: 0.07 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78, stagger: 0.08 }, 0.14)
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.88,
          stagger: 0.1,
          ease: 'back.out(1.12)',
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
      className="pg-sec pg-sec-alt relative overflow-hidden"
      aria-labelledby="community-features-heading"
    >
      <InteractiveGridPattern
        variant="absolute"
        pointerMode="global"
        cellSize={44}
        proximity={120}
        driftClassName="[animation-duration:82s]"
        ambientPulseClassName="[animation-duration:5.2s]"
        className="mask-[radial-gradient(ellipse_72%_64%_at_50%_38%,black,transparent)] text-foreground/14 opacity-[0.48] dark:text-foreground/11 dark:opacity-[0.34]"
      />
      <div className="pg-sec-inner relative z-1">
        <div className="pg-sec-hd">
          <AboutSectionTitle id="community-features-heading" words={['Why', 'Join', 'VokDev']} />
          <p className="about-sec-desc">
            Everything you need to grow your skills, find collaborators, and stay connected to what
            is happening across the ecosystem.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communityFeatures.map((feature) => (
            <VokDevCard
              key={feature.title}
              variant="default"
              isHoverable={false}
              hasGlow={false}
              className="community-feature-card pg-card pg-card-accent flex h-full flex-col !shadow-none"
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
  )
}
