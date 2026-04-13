'use client'

import { useLayoutEffect, useRef } from 'react'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { aboutStoryMilestones } from './data'
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function AboutStory() {
  const secRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    registerGsap()

    const sec = secRef.current
    const timeline = timelineRef.current
    const lineFill = lineFillRef.current

    if (!sec || !timeline || !lineFill) return

    const reduced = prefersReducedMotion()
    const items = Array.from(sec.querySelectorAll<HTMLElement>('.about-story-item'))

    if (items.length === 0) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(items, { opacity: 1, x: 0, filter: 'blur(0px)' })
      gsap.set(lineFill, { scaleY: 1 })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(items, { opacity: 0, x: -16, filter: 'blur(6px)' })
    gsap.set(lineFill, { scaleY: 0 })

    const introTl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = sec.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    introTl
      .to(words, { y: '0%', duration: 0.9, stagger: 0.07 }, 0)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.78 }, 0.12)
      .to(
        items,
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.65,
          stagger: 0.14,
        },
        0.22,
      )

    // Use gsap.to (not fromTo + scrollTrigger) — fromTo can throw when ScrollTrigger
    // merges vars in some GSAP builds; initial state is already set via gsap.set above.
    const lineTween = gsap.to(lineFill, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 82%',
        end: 'bottom 35%',
        scrub: 0.65,
        invalidateOnRefresh: true,
      },
    })

    queueMicrotask(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      introTl.scrollTrigger?.kill()
      introTl.kill()
      lineTween.scrollTrigger?.kill()
      lineTween.kill()
    }
  }, [])

  return (
    <section ref={secRef} className="pg-sec pg-sec-alt" aria-labelledby="story-heading">
      <div className="pg-sec-inner max-w-3xl">
        <div className="story-hd pg-sec-hd">
          <AboutSectionTitle id="story-heading" words={['Our', 'Story']} />
          <p className="about-sec-desc">
            From a small gathering of builders to a worldwide network—here is how we got here.
          </p>
        </div>
        <div ref={timelineRef} className="about-story-timeline pg-timeline">
          <div ref={lineFillRef} className="pg-timeline-line-fill" aria-hidden />
          {aboutStoryMilestones.map((item) => (
            <div key={item.title} className="about-story-item pg-timeline-item">
              <div className="mb-2 flex flex-wrap items-baseline gap-2">
                {item.year ? (
                  <span
                    className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary"
                    style={{ fontFamily: 'var(--font-landing-mono), ui-monospace, monospace' }}
                  >
                    {item.year}
                  </span>
                ) : null}
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
              <p className="leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
