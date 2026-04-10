'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { Users, FolderKanban, GitCommitHorizontal } from 'lucide-react'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function HeroSection() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    // Scoped helpers — never leak outside this section
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

    gsap.set(badge,  { opacity: 0, scale: 0.88, filter: 'blur(10px)', y: -8 })
    gsap.set(words,  { y: '108%' })
    gsap.set(subt,   { opacity: 0, filter: 'blur(12px)', y: 12 })
    gsap.set(vok,    { opacity: 0, filter: 'blur(9px)',  y: 9 })
    gsap.set(desc,   { opacity: 0, filter: 'blur(8px)',  y: 9 })
    gsap.set(ctas,   { opacity: 0, filter: 'blur(7px)',  scale: 0.96, y: 7 })
    gsap.set(stats,  { opacity: 0, filter: 'blur(6px)',  y: 7 })
    gsap.set(scind,  { opacity: 0, filter: 'blur(4px)' })

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl
      /* ── badge: scale + blur → sharp ── */
      .to(badge, {
        opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
        duration: 0.95,
      }, 0.2)

      /* ── headline words: clip-reveal one by one ── */
      .to(words, {
        y: '0%',
        duration: 1.05,
        stagger: 0.15,
        ease: 'expo.out',
      }, 0.45)

      /* ── subtitle: blur-focus slide up ── */
      .to(subt, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.85,
      }, 0.9)

      /* ── VOK definition line ── */
      .to(vok, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.78,
      }, 1.12)

      /* ── body description ── */
      .to(desc, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.78,
      }, 1.28)

      /* ── CTAs: scale + blur-focus ── */
      .to(ctas, {
        opacity: 1, filter: 'blur(0px)', scale: 1, y: 0,
        duration: 0.72,
      }, 1.44)

      /* ── stat items: staggered blur-focus ── */
      .to(stats, {
        opacity: 1, filter: 'blur(0px)', y: 0,
        duration: 0.65, stagger: 0.1,
      }, 1.58)

      /* ── scroll indicator fades last ── */
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
      {/* badge */}
      <div className="hero-badge" id="hbadge">
        <span className="badge-live" aria-hidden />
        <span className="badge-text">Open Developer Community</span>
      </div>

      {/* headline — each word sits inside a clip-masked line */}
      <h1 className="hero-h1">
        <span className="h1-line">
          <span className="h1-word">Build.</span>
          <span className="h1-word ac">Share.</span>
        </span>
        <span className="h1-line">
          <span className="h1-word">Grow.</span>
        </span>
      </h1>

      {/* subtitle */}
      <div className="hero-subtitle" id="hsubt">
        <span className="st-word">Vision</span>
        <span className="st-dot" aria-hidden>•</span>
        <span className="st-word">Of</span>
        <span className="st-dot" aria-hidden>•</span>
        <span className="st-word">Knowledge</span>
      </div>

      {/* VOK definition */}
      <p className="vok-def" id="hvok">
        <span className="vc">V</span>ision&nbsp;&nbsp;<span className="vo">O</span>f&nbsp;&nbsp;
        <span className="vk">K</span>nowledge — where developers build what matters
      </p>

      {/* body copy */}
      <p className="hero-desc" id="hdesc">
        VokDev is the open community for developers who ship real projects, learn in public, and
        grow alongside people who genuinely get it.
      </p>

      {/* CTAs */}
      <div className="hero-ctas" id="hctas">
        <Link href="/projects" className="btn-p">Start Building →</Link>
        <Link href="/projects" className="btn-g">Explore Projects</Link>
      </div>

      {/* stats */}
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

      {/* scroll indicator */}
      {/* <div className="scroll-ind" id="scind">
        <span>Scroll</span>
        <div className="s-line" />
      </div> */}
    </section>
  )
}
