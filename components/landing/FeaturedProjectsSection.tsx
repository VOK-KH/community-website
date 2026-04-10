'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { featuredProjects } from './data'
import { gsap, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'

registerGsap()

export function FeaturedProjectsSection() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const qs  = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) return

    gsap.set(qs('.sec-tag'),      { opacity: 0, x: -18, filter: 'blur(6px)' })
    gsap.set(qsa('.split-inner'), { y: '110%' })
    gsap.set(qs('.va'),           { opacity: 0, x: 14, filter: 'blur(5px)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      .to(qs('.sec-tag'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.62,
      }, 0)
      .to(qsa('.split-inner'), {
        y: '0%', duration: 1.05, stagger: 0.15,
      }, 0.1)
      .to(qs('.va'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.65,
      }, 0.35)


    let removeGridGlow: (() => void) | undefined
    if (hasFinePointer()) {
      const grid = sec.querySelector<HTMLElement>('.grid12')
      const cards = qsa('.pc')
      if (grid && cards.length) {
        const onGridMove = (e: MouseEvent) => {
          for (const card of cards) {
            const r = card.getBoundingClientRect()
            card.style.setProperty('--gx', `${e.clientX - r.left}px`)
            card.style.setProperty('--gy', `${e.clientY - r.top}px`)
          }
        }
        const onGridEnter = () => {
          for (const card of cards) card.classList.add('glow-active')
        }
        const onGridLeave = () => {
          for (const card of cards) card.classList.remove('glow-active')
        }
        grid.addEventListener('mousemove', onGridMove)
        grid.addEventListener('mouseenter', onGridEnter)
        grid.addEventListener('mouseleave', onGridLeave)
        removeGridGlow = () => {
          grid.removeEventListener('mousemove', onGridMove)
          grid.removeEventListener('mouseenter', onGridEnter)
          grid.removeEventListener('mouseleave', onGridLeave)
        }
      }
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      removeGridGlow?.()
    }
  }, [])

  return (
    <section ref={secRef} className="z1 projects" id="projects" data-sec="projects">
      <div className="proj-header">
        <div>
          <div className="sec-tag">Featured Projects</div>
          <h2 className="proj-title">
            <span className="split-line">
              <span className="split-inner">What the community</span>
            </span>
            <span className="split-line">
              <span className="split-inner">is building</span>
            </span>
          </h2>
        </div>
        <Link href="/projects" className="va">
          View all →
        </Link>
      </div>

      <div className="grid12">
        {featuredProjects.map((p) => (
          <div key={p.id} className={`pc ${p.cardClass} ${p.colClass} gsap-card`}>
            <div className="pt">
              <div className={`pi ${p.iconClass}`}>{p.emoji}</div>
              <div className="pst">
                <span className="star">★</span> {p.stars}
              </div>
            </div>
            <div className="pn">{p.title}</div>
            <p className="pd">{p.description}</p>
            <div className="pf">
              <div className="ptags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pau">
                <div className={`av ${p.author.av}`}>{p.author.initials}</div>
                <span>{p.author.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
