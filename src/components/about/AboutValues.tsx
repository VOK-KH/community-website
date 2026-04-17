'use client'

import { useLayoutEffect, useRef } from 'react'
import { VokDevCard } from '@/components/VokDevCard'
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { aboutValues } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function AboutValues() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const cards = Array.from(sec.querySelectorAll<HTMLElement>('.about-value-card'))

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
          stagger: 0.12,
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
      aria-labelledby="values-heading"
      id="values"
    >
      <InteractiveGridPattern
        variant="absolute"
        pointerMode="global"
        cellSize={48}
        proximity={110}
        className="mask-[radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)] opacity-50 text-foreground/16 dark:opacity-40 dark:text-foreground/12"
      />

      <div className="pg-sec-inner relative z-1">
        <div className="values-hd pg-sec-hd pg-sec-hd-center">
          <AboutSectionTitle id="values-heading" words={['Our', 'Values']} />
          <p className="about-sec-desc">
            Principles that shape how we build products, run programs, and show up for members.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((value) => (
            <VokDevCard
              key={value.title}
              variant="default"
              isHoverable
              className="about-value-card pg-card pg-card-accent group p-7 shadow-none transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg dark:shadow-none"
            >
              <div className="pg-icon pg-icon-lg mb-5 transition-transform duration-300 group-hover:scale-110">
                <value.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </VokDevCard>
          ))}
        </div>
      </div>
    </section>
  )
}
