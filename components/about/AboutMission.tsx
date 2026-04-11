'use client'

import { useLayoutEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { VokDevBadge } from '@/components/VokDevBadge'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

const missionLinkPrimary =
  'mission-action inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[0_10px_30px_-18px_hsl(var(--primary))] transition-all duration-300 hover:scale-105 hover:brightness-110 hover:-translate-y-0.5 active:scale-95 hover:glow-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'

const missionLinkSecondary =
  'mission-action inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-secondary/60 bg-transparent px-6 py-3 text-base font-semibold text-secondary transition-all duration-300 hover:scale-105 hover:bg-secondary/10 hover:-translate-y-0.5 active:scale-95 hover:glow-secondary focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2'

export function AboutMission() {
  const secRef = useRef<HTMLElement>(null)

  const missionGridParallax = useMemo(
    () => ({
      triggerRef: secRef,
      scrub: 1.35,
      yPercent: 14,
      scaleExtra: 0.035,
    }),
    [],
  )

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const actions = Array.from(sec.querySelectorAll<HTMLElement>('.mission-action'))
    const visual = sec.querySelector('.mission-visual')

    if (!visual) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(actions, { opacity: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(visual, { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(actions, { opacity: 0, y: 14, filter: 'blur(6px)' })
    gsap.set(visual, { opacity: 0, x: 28, scale: 0.96, filter: 'blur(10px)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(words, { y: '0%', duration: 0.9, stagger: 0.07 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78, stagger: 0.1 }, 0.14)
      .to(actions, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.62, stagger: 0.09 }, 0.42)
      .to(visual, { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 0.95, ease: 'back.out(1.15)' }, 0.2)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={secRef}
      className="about-mission-section pg-sec relative overflow-hidden"
      aria-labelledby="mission-heading"
    >
      <InteractiveGridPattern
        variant="absolute"
        pointerMode="global"
        cellSize={48}
        proximity={128}
        scrollParallax={missionGridParallax}
        driftClassName="[animation-duration:78s]"
        ambientPulseClassName="[animation-duration:5.5s]"
        className="mission-igp mask-[radial-gradient(ellipse_78%_68%_at_50%_42%,black,transparent)] text-foreground/17 opacity-[0.52] dark:text-foreground/13 dark:opacity-[0.38]"
      />

      <div className="pg-sec-inner relative z-1">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mission-hd pg-sec-hd">
              <AboutSectionTitle id="mission-heading" words={['Our', 'Mission']} />
              <p className="about-sec-desc">
                We believe the best outcomes come when talented people share a clear vision. Our
                mission is to give tech professionals everywhere a place to collaborate on ambitious
                projects, trade hard-won knowledge, and lift each other up.
              </p>
            </div>
            <p className="mission-extra about-sec-desc mb-6 text-base leading-relaxed text-muted-foreground">
              Through creativity, curiosity, and mutual support, we are building a community that
              stretches what is possible in technology — without losing the human side of the craft.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/community" className={missionLinkPrimary}>
                Join the community
              </Link>
              <Link href="/projects" className={missionLinkSecondary}>
                Explore projects
              </Link>
            </div>
          </div>

          <div className="mission-visual relative flex min-h-[300px] items-center justify-center">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-40"
              aria-hidden
              style={{
                background:
                  'radial-gradient(ellipse 70% 60% at 50% 100%, hsl(var(--primary) / 0.14), transparent 55%)',
              }}
            />
            <VokDevBadge
              variant="primary"
              size="sm"
              className="absolute left-0 top-4 z-2 shadow-sm md:left-4"
            >
              Ship together
            </VokDevBadge>
            <VokDevBadge
              variant="secondary"
              size="sm"
              className="absolute right-0 top-1/4 z-2 -translate-y-1/2 shadow-sm md:right-6"
            >
              Open culture
            </VokDevBadge>
            <VokDevBadge
              variant="tertiary"
              size="sm"
              className="absolute bottom-8 left-1/4 z-2 -translate-x-1/2 shadow-sm md:bottom-10"
            >
              Always learning
            </VokDevBadge>
            <div className="relative z-1 w-full max-w-[min(100%,22rem)] md:max-w-[min(100%,26rem)]">
              <Image
                src="/illust/Mission.svg"
                alt="Illustration of collaboration and shared mission"
                width={1024}
                height={1024}
                className="h-auto w-full select-none"
                sizes="(min-width: 1024px) 26rem, min(100vw - 3rem, 22rem)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
