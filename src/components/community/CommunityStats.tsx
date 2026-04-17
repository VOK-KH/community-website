'use client'

import { useLayoutEffect, useRef } from 'react'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { communityStats } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function CommunityStats() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const stats = Array.from(sec.querySelectorAll<HTMLElement>('.community-stat-tile'))

    if (stats.length === 0) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(stats, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(stats, { opacity: 0, y: 28, scale: 0.94, filter: 'blur(6px)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(words, { y: '0%', duration: 0.9, stagger: 0.07 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78 }, 0.12)
      .to(
        stats,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.72,
          stagger: 0.1,
          ease: 'back.out(1.25)',
        },
        0.2,
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
      aria-labelledby="community-stats-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 0%, hsl(var(--primary) / 0.07), transparent 60%)',
        }}
      />
      <div className="pg-sec-inner relative z-1">
        <div className="pg-sec-hd pg-sec-hd-center">
          <AboutSectionTitle id="community-stats-heading" words={['Community', 'Momentum']} />
          <p className="about-sec-desc">
            A snapshot of active members, projects, and programming—numbers that grow with everyone
            who shows up.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {communityStats.map((stat) => (
            <div
              key={stat.label}
              className="community-stat-tile rounded-2xl border border-border/70 bg-card/50 p-6 text-center shadow-sm backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
            >
              <div className="pg-stat-num gradient-text">{stat.value}</div>
              <div className="pg-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
