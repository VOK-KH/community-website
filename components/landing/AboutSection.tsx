'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import { aboutPills } from './data'
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'

registerGsap()

export function AboutSection() {
  const secRef = useRef<HTMLElement>(null)
  const visRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const qs = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) return

    /* ── Initial hidden states ── */
    gsap.set(qs('.sec-tag'), { opacity: 0, x: -18, filter: 'blur(6px)' })
    gsap.set(qsa('.split-inner'), { y: '110%' })
    gsap.set(qs('.vok-line'), { opacity: 0, y: 14, filter: 'blur(7px)' })
    gsap.set(qsa('.vok-line .L'), { opacity: 0, scale: 0.45, y: 8 })
    gsap.set(qsa('.a-body'), { opacity: 0, y: 22, filter: 'blur(8px)' })
    gsap.set(qsa('.pill'), { opacity: 0, scale: 0.85, y: 10, filter: 'blur(4px)' })
    gsap.set(qs('.a-vis'), { opacity: 0 })
    gsap.set(qs('.code-card'), { opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' })
    gsap.set(qsa('.chip'), { opacity: 0, scale: 0.7, filter: 'blur(6px)' })

    /* ── Coordinated entrance timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      .to(qs('.sec-tag'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.62,
      }, 0)
      .to(qsa('.split-inner'), {
        y: '0%', duration: 1.05, stagger: 0.13,
      }, 0.1)
      .to(qs('.vok-line'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7,
      }, 0.58)
      .to(qsa('.vok-line .L'), {
        opacity: 1, scale: 1, y: 0,
        duration: 0.55, stagger: 0.14, ease: 'back.out(2.8)',
      }, 0.82)
      .to(qsa('.a-body'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.82, stagger: 0.17,
      }, 0.74)
      .to(qsa('.pill'), {
        opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
        duration: 0.44, stagger: 0.05, ease: 'back.out(1.7)',
      }, 1.1)
      /* visual column entrance */
      .to(qs('.a-vis'), { opacity: 1, duration: 0.01 }, 0.5)
      .to(qs('.code-card'), {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 1, ease: 'expo.out',
      }, 0.55)
      .to(qsa('.chip'), {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)',
      }, 0.9)

    /* ── Text parallax: heading & body move at different rates ── */
    const heading = qs('.a-h')
    const bodies = qsa('.a-body')
    const pills = qs('.pills')

    if (heading) {
      gsap.to(heading, {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
    }
    bodies.forEach((b, i) => {
      gsap.to(b, {
        yPercent: -4 - i * 2, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    })
    if (pills) {
      gsap.to(pills, {
        yPercent: -3, ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
      })
    }

    /* ── Code card line-by-line reveal ── */
    const codeLines = qsa('.code-card > div')
    if (codeLines.length > 1) {
      gsap.set(codeLines.slice(1), { opacity: 0, x: -8 })
      ScrollTrigger.create({
        trigger: qs('.code-card'),
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(codeLines.slice(1), {
            opacity: 1, x: 0,
            duration: 0.35, stagger: 0.06, ease: 'power2.out', delay: 0.6,
          })
        },
      })
    }

    /* ── Pill magnetic hover (fine pointer only) ── */
    const pillCleanups: (() => void)[] = []
    if (hasFinePointer()) {
      qsa('.pill').forEach((pill) => {
        const mx = gsap.quickTo(pill, 'x', { duration: 0.4, ease: 'power3.out' })
        const my = gsap.quickTo(pill, 'y', { duration: 0.4, ease: 'power3.out' })
        const onMove = (e: MouseEvent) => {
          const r = pill.getBoundingClientRect()
          mx((e.clientX - r.left - r.width / 2) * 0.25)
          my((e.clientY - r.top - r.height / 2) * 0.25)
        }
        const onLeave = () => {
          gsap.to(pill, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
        }
        pill.addEventListener('mousemove', onMove)
        pill.addEventListener('mouseleave', onLeave)
        pillCleanups.push(() => {
          pill.removeEventListener('mousemove', onMove)
          pill.removeEventListener('mouseleave', onLeave)
        })
      })
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      pillCleanups.forEach((fn) => fn())
    }
  }, [])

  /* ── Cursor glow on code card ── */
  useEffect(() => {
    const vis = visRef.current
    const glow = glowRef.current
    if (!vis || !glow || prefersReducedMotion() || !hasFinePointer()) return

    const onMove = (e: MouseEvent) => {
      const r = vis.getBoundingClientRect()
      gsap.to(glow, {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    const onEnter = () => gsap.to(glow, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' })
    const onLeave = () => gsap.to(glow, { opacity: 0, scale: 0.5, duration: 0.4, ease: 'power2.inOut' })

    vis.addEventListener('mousemove', onMove)
    vis.addEventListener('mouseenter', onEnter)
    vis.addEventListener('mouseleave', onLeave)
    return () => {
      vis.removeEventListener('mousemove', onMove)
      vis.removeEventListener('mouseenter', onEnter)
      vis.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section ref={secRef} className="z1 about" id="about" data-sec="about">
      <div className="about-grid">
        <div>
          <div className="sec-tag">What is VokDev</div>

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

        <div ref={visRef} className="a-vis" id="avis">
          <div
            ref={glowRef}
            className="a-vis-glow"
            aria-hidden
            style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }}
          />
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
