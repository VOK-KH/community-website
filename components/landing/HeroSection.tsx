'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { Users, FolderKanban, GitCommitHorizontal, ArrowRight, Github } from 'lucide-react'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'
import { ParticlesBackground } from './ParticlesBackground'

registerGsap()

export function HeroSection() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const qs  = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) {
      sec.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        node.textContent = parseInt(node.dataset.count ?? '0', 10).toLocaleString()
      })
      return
    }

    const badge  = qs('#hbadge')
    const words  = qsa('.h1-word')
    const subt   = qs('#hsubt')
    const vok    = qs('#hvok')
    const desc   = qs('#hdesc')
    const ctas   = qs('#hctas')
    const stats  = qsa('.stat-item')
    const scind  = qs('#scind')
    const trusted = qs('#htrusted')

    gsap.set(badge,   { opacity: 0, scale: 0.88, filter: 'blur(10px)', y: -8 })
    gsap.set(words,   { y: '108%' })
    gsap.set(subt,    { opacity: 0, filter: 'blur(12px)', y: 12 })
    gsap.set(vok,     { opacity: 0, filter: 'blur(9px)',  y: 9 })
    gsap.set(desc,    { opacity: 0, filter: 'blur(8px)',  y: 9 })
    gsap.set(ctas,    { opacity: 0, filter: 'blur(7px)',  scale: 0.96, y: 7 })
    gsap.set(stats,   { opacity: 0, filter: 'blur(6px)',  y: 7 })
    gsap.set(scind,   { opacity: 0, filter: 'blur(4px)' })
    gsap.set(trusted, { opacity: 0, filter: 'blur(5px)',  y: 6 })

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl
      .to(badge, {
        opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
        duration: 0.95,
      }, 0.2)
      .to(words, {
        y: '0%',
        duration: 1.05,
        stagger: 0.15,
        ease: 'expo.out',
      }, 0.45)
      .to(subt, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.85,
      }, 0.9)
      .to(vok, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.78,
      }, 1.12)
      .to(desc, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.78,
      }, 1.28)
      .to(ctas, {
        opacity: 1, filter: 'blur(0px)', scale: 1, y: 0,
        duration: 0.72,
      }, 1.44)
      .to(stats, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.65, stagger: 0.1,
      }, 1.58)
      .to(trusted, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.55,
      }, 1.88)
      .to(scind, {
        opacity: 1, filter: 'blur(0px)',
        duration: 0.6,
      }, 1.98)

    sec.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
      const target = parseInt(node.dataset.count ?? '0', 10)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: target,
        duration: 2.5,
        ease: 'power3.out',
        delay: 1.65,
        onUpdate: () => { node.textContent = Math.round(obj.v).toLocaleString() },
      })
    })

    return () => { tl.kill() }
  }, [])

  return (
    <section ref={secRef} className="hero" id="hero" data-sec="hero">
      <ParticlesBackground />
      <div className="hero-badge" id="hbadge">
        <span className="badge-live" aria-hidden />
        <span className="badge-text">Open Developer Community</span>
        <span className="badge-version">v3.0</span>
      </div>

      <h1 className="hero-h1">
        <span className="h1-line">
          <span className="h1-word">Build.</span>
          <span className="h1-word ac">Share.</span>
        </span>
        <span className="h1-line">
          <span className="h1-word">Grow.</span>
        </span>
      </h1>

      <div className="hero-subtitle" id="hsubt">
        <span className="st-word">Vision</span>
        <span className="st-dot" aria-hidden>•</span>
        <span className="st-word">Of</span>
        <span className="st-dot" aria-hidden>•</span>
        <span className="st-word">Knowledge</span>
      </div>

      <p className="vok-def" id="hvok">
        <span className="vc">V</span>ision&nbsp;&nbsp;<span className="vo">O</span>f&nbsp;&nbsp;
        <span className="vk">K</span>nowledge — where developers turn ideas into impact
      </p>

      <p className="hero-desc" id="hdesc">
        VokDev is the open-source community where developers ship real projects, learn in public,
        and level up alongside builders who genuinely get it. No gatekeeping. Just code.
      </p>

      <div className="hero-ctas" id="hctas">
        <Link href="/community" className="btn-p">
          Join the Community <ArrowRight size={16} className="btn-icon" />
        </Link>
        <a
          href="https://github.com"
          className="btn-g"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} /> Star on GitHub
        </a>
      </div>

      <div className="hero-stats" id="hstats">
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-accent)' }}>
            <span data-count="4200">0</span>+
          </span>
          <span className="s-lbl"><Users size={14} /> Members</span>
        </div>
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-violet)' }}>
            <span data-count="830">0</span>+
          </span>
          <span className="s-lbl"><FolderKanban size={14} /> Projects</span>
        </div>
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-emerald)' }}>
            <span data-count="12000">0</span>+
          </span>
          <span className="s-lbl"><GitCommitHorizontal size={14} /> Commits</span>
        </div>
      </div>

      <div className="hero-trusted" id="htrusted">
        <span className="trusted-label">Trusted by developers from</span>
        <div className="trusted-logos">
          <span className="trusted-co">Google</span>
          <span className="trusted-dot" aria-hidden />
          <span className="trusted-co">Meta</span>
          <span className="trusted-dot" aria-hidden />
          <span className="trusted-co">Vercel</span>
          <span className="trusted-dot" aria-hidden />
          <span className="trusted-co">Stripe</span>
          <span className="trusted-dot" aria-hidden />
          <span className="trusted-co">Indie Hackers</span>
        </div>
      </div>
    </section>
  )
}
