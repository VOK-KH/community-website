'use client'

import { useLayoutEffect, useRef } from 'react'
import { ParticlesBackground } from '@/components/landing/ParticlesBackground'
import { gsap, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'

registerGsap()

export function ProjectsHero() {
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = heroRef.current
    if (!el) return

    const chip = el.querySelector('.pg-hero-chip')
    const words = Array.from(el.querySelectorAll<HTMLElement>('.h1-word'))
    const sub = el.querySelector('.hero-sub')
    const grid = el.querySelector<HTMLElement>('.pg-hero-grid')
    const o1 = el.querySelector<HTMLElement>('#pgHeroO1')
    const o2 = el.querySelector<HTMLElement>('#pgHeroO2')
    const o3 = el.querySelector<HTMLElement>('#pgHeroO3')

    const reduced = prefersReducedMotion()

    let tl: gsap.core.Timeline | null = null
    if (!reduced && chip && words.length && sub) {
      gsap.set(chip, { opacity: 0, scale: 0.9, filter: 'blur(8px)', y: -6 })
      gsap.set(words, { y: '110%' })
      gsap.set(sub, { opacity: 0, filter: 'blur(10px)', y: 16 })

      tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl
        .to(chip, {
          opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
          duration: 0.8,
        }, 0.15)
        .to(words, {
          y: '0%',
          duration: 1,
          stagger: 0.13,
        }, 0.35)
        .to(sub, {
          opacity: 1, filter: 'blur(0px)', y: 0,
          duration: 0.85,
        }, 0.75)
    }

    const parallaxTweens: gsap.core.Tween[] = []

    if (!reduced && grid) {
      parallaxTweens.push(
        gsap.to(grid, {
          backgroundPositionY: '22%',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 2.2 },
        }),
      )
    }

    if (!reduced && o1 && o2 && o3) {
      parallaxTweens.push(
        gsap.to(o1, {
          yPercent: 22, xPercent: 6, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1 },
        }),
        gsap.to(o2, {
          yPercent: -18, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 1.4 },
        }),
        gsap.to(o3, {
          yPercent: 16, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.85 },
        }),
      )
    }

    let onPointer: ((e: MouseEvent) => void) | undefined
    if (!reduced && hasFinePointer() && o1 && o2 && o3) {
      const o1x = gsap.quickTo(o1, 'x', { duration: 1.85, ease: 'power2.out' })
      const o1y = gsap.quickTo(o1, 'y', { duration: 2, ease: 'power2.out' })
      const o2x = gsap.quickTo(o2, 'x', { duration: 2.3, ease: 'power2.out' })
      const o2y = gsap.quickTo(o2, 'y', { duration: 2.5, ease: 'power2.out' })
      const o3x = gsap.quickTo(o3, 'x', { duration: 1.6, ease: 'power2.out' })
      const o3y = gsap.quickTo(o3, 'y', { duration: 1.75, ease: 'power2.out' })
      onPointer = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth - 0.5
        const cy = e.clientY / window.innerHeight - 0.5
        o1x(cx * 32); o1y(cy * 22)
        o2x(cx * -22); o2y(cy * -14)
        o3x(cx * 14); o3y(cy * 18)
      }
      el.addEventListener('mousemove', onPointer, { passive: true })
    }

    return () => {
      tl?.kill()
      parallaxTweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.kill()
      })
      if (onPointer) el.removeEventListener('mousemove', onPointer)
    }
  }, [])

  return (
    <header ref={heroRef} className="pg-hero">
      <div className="pg-hero-bg" aria-hidden>
        <div className="pg-hero-noise" />
        <div className="pg-hero-grid" />
        <div className="pg-hero-orb pg-hero-orb--a" id="pgHeroO1" />
        <div className="pg-hero-orb pg-hero-orb--b" id="pgHeroO2" />
        <div className="pg-hero-orb pg-hero-orb--c" id="pgHeroO3" />
      </div>

      <ParticlesBackground id="pg-hero-particles" />

      <div className="pg-hero-inner">
        <p className="pg-hero-chip">
          <span className="chip-dot" aria-hidden />
          Projects
        </p>

        <h1>
          <span className="h1-clip">
            <span className="h1-word">Explore</span>
          </span>{' '}
          <span className="h1-clip">
            <span className="h1-word gradient-text">Projects</span>
          </span>
        </h1>

        <p className="hero-sub">
          Browse community-built work — from experiments to production systems — and find
          teams, ideas, and momentum for what you want to ship next.
        </p>
      </div>
    </header>
  )
}
