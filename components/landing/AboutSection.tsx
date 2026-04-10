'use client'

import { useLayoutEffect, useRef } from 'react'
import { aboutPills } from './data'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function AboutSection() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const qs  = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) return

    /* ── Initial hidden states ── */
    gsap.set(qs('.sec-tag'),       { opacity: 0, x: -18, filter: 'blur(6px)' })
    gsap.set(qsa('.split-inner'),  { y: '110%' })
    gsap.set(qs('.vok-line'),      { opacity: 0, y: 14,  filter: 'blur(7px)' })
    gsap.set(qsa('.vok-line .L'),  { opacity: 0, scale: 0.45, y: 8 })
    gsap.set(qsa('.a-body'),       { opacity: 0, y: 22, filter: 'blur(8px)' })
    gsap.set(qsa('.pill'),         { opacity: 0, scale: 0.85, y: 10, filter: 'blur(4px)' })

    /* ── Coordinated entrance timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      /* 1. Section tag: slides in from left */
      .to(qs('.sec-tag'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.62,
      }, 0)

      /* 2. Heading: line-by-line clip-reveal (y 110% → 0%) */
      .to(qsa('.split-inner'), {
        y: '0%', duration: 1.05, stagger: 0.13,
      }, 0.1)

      /* 3. VOK definition line fades in */
      .to(qs('.vok-line'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7,
      }, 0.58)

      /* 4. V · O · K letters pop in with back.out spring */
      .to(qsa('.vok-line .L'), {
        opacity: 1, scale: 1, y: 0,
        duration: 0.55, stagger: 0.14, ease: 'back.out(2.8)',
      }, 0.82)

      /* 5. Body paragraphs: blur-focus staggered */
      .to(qsa('.a-body'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.82, stagger: 0.17,
      }, 0.74)

      /* 6. Tech pills pop in */
      .to(qsa('.pill'), {
        opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
        duration: 0.44, stagger: 0.05, ease: 'back.out(1.7)',
      }, 1.1)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={secRef} className="z1 about" id="about" data-sec="about">
      <div className="about-grid">
        <div>
          <div className="sec-tag">What is VokDev</div>

          {/* Heading: each line is a .split-line clip container */}
          <h2 className="a-h">
            <span className="split-line">
              <span className="split-inner">A community built on</span>
            </span>
            <span className="split-line">
              <span className="split-inner">
                <span className="hl">Vision. Knowledge.</span>
              </span>
            </span>
            <span className="split-line">
              <span className="split-inner">Real Code.</span>
            </span>
          </h2>

          <div className="vok-line">
            <span className="L Lc">V</span>
            <span>ision</span>
            <span style={{ margin: '0 0.35rem', color: 'var(--vok-text3)' }}>·</span>
            <span className="L Lo">O</span>
            <span>f</span>
            <span style={{ margin: '0 0.35rem', color: 'var(--vok-text3)' }}>·</span>
            <span className="L Lk">K</span>
            <span>nowledge</span>
          </div>

          <p className="a-body">
            VokDev is where you stop scrolling and start building. A home for indie hackers,
            open-source contributors, and self-taught engineers who believe the best way to
            learn is to ship.
          </p>
          <p className="a-body">
            No fluff. No corporate speak. Real people, real code, growing together every day.
          </p>

          <div className="pills">
            {aboutPills.map((label) => (
              <span key={label} className="pill">
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="a-vis" id="avis">
          <div className="chip chip3">
            <span className="chip-dot" />⚡ 98% uptime
          </div>
          <div className="code-card" id="codeCard">
            <div className="cc-dots">
              <span className="cc-dot" style={{ background: '#ff5f57' }} />
              <span className="cc-dot" style={{ background: '#febc2e' }} />
              <span className="cc-dot" style={{ background: '#28c840' }} />
            </div>
            <div>
              <span className="cc">Vision Of Knowledge</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="ck">const</span> <span className="cf">vokdev</span> = {'{'}
            </div>
            <div>
              &nbsp;&nbsp;name: <span className="cs">&quot;VokDev&quot;</span>,
            </div>
            <div>
              &nbsp;&nbsp;stands<span className="ck">For</span>: [
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="cs">&quot;Vision&quot;</span>,{' '}
              <span className="cs">&quot;Of&quot;</span>, <span className="cs">&quot;Knowledge&quot;</span>
            </div>
            <div>&nbsp;&nbsp;],</div>
            <div>
              &nbsp;&nbsp;members: <span className="cn">4_200</span>,
            </div>
            <div>
              &nbsp;&nbsp;projects: <span className="cn">830</span>,
            </div>
            <div>
              &nbsp;&nbsp;<span className="cf">join</span>: () =&gt; <span className="cs">🚀</span>
            </div>
            <div>{'}'};</div>
          </div>
          <div className="chip chip1">
            <span className="chip-dot" />
            4.2k members
          </div>
          <div className="chip chip2">
            <span className="chip-dot" />
            312 projects / month
          </div>
        </div>
      </div>
    </section>
  )
}
