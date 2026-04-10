'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, registerGsap, prefersReducedMotion } from '@/lib/motion'

registerGsap()

export function CTASection() {
  const secRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const qs  = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) return

    /* ── Initial hidden states ── */
    gsap.set(qs('.cta-tag'),       { opacity: 0, y: -10, filter: 'blur(6px)' })
    gsap.set(qsa('.split-inner'),  { y: '110%' })
    gsap.set(qs('.cta-body'),      { opacity: 0, y: 20, filter: 'blur(8px)' })
    gsap.set(qsa('.btn-l'),        { opacity: 0, y: 16, scale: 0.94, filter: 'blur(5px)' })
    gsap.set(qsa('.sp-av'),        { opacity: 0, x: -10, scale: 0.82, filter: 'blur(4px)' })
    gsap.set(qs('.sp-txt'),        { opacity: 0, x: 6, filter: 'blur(5px)' })

    /* ── Glow: gentle infinite pulse that starts immediately ── */
    const glow = qs('.cta-glow')
    if (glow) {
      gsap.to(glow, {
        scale: 1.18, opacity: 0.85,
        duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
    }

    /* ── Coordinated entrance timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      /* 1. Tag drops in from above */
      .to(qs('.cta-tag'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6,
      }, 0)

      /* 2. Headline: line-by-line clip-reveal */
      .to(qsa('.split-inner'), {
        y: '0%', duration: 1.08, stagger: 0.18,
      }, 0.14)

      /* 3. Body text blur-focus */
      .to(qs('.cta-body'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85,
      }, 0.72)

      /* 4. Buttons: scale + blur-focus with back.out bounce */
      .to(qsa('.btn-l'), {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)',
      }, 0.92)

      /* 5. Social proof: avatars stagger in from the left */
      .to(qsa('.sp-av'), {
        opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.42, stagger: 0.07, ease: 'back.out(1.5)',
      }, 1.12)

      /* 6. Social proof text slides in */
      .to(qs('.sp-txt'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55,
      }, 1.38)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section ref={secRef} className="cta-sec" id="community" data-sec="cta">
      <div className="cta-glow" />
      <div className="cta-wrap">
        <div className="cta-tag">✦ Join the community</div>

        {/* Heading: each line is a .split-line clip container */}
        <h2 className="cta-h">
          <span className="split-line">
            <span className="split-inner">Ready to build</span>
          </span>
          <span className="split-line">
            <span className="split-inner">
              <span className="gr">something real?</span>
            </span>
          </span>
        </h2>

        <p className="cta-body">
          Join thousands of developers sharing what they build, learning in public, and making
          things worth making — under the banner of Vision Of Knowledge.
        </p>

        <div className="cta-btns">
          <Link href="/community" className="btn-l p">
            Join VokDev Free →
          </Link>
          <Link href="/projects" className="btn-l o">
            Browse Projects
          </Link>
        </div>

        <div className="sp">
          <div className="sp-avs">
            <div className="sp-av av-c">AK</div>
            <div className="sp-av av-v">MJ</div>
            <div className="sp-av av-e">SR</div>
            <div className="sp-av av-a">TK</div>
            <div className="sp-av av-p">LC</div>
          </div>
          <span className="sp-txt">
            Joined by <strong>4,200+ developers</strong> this year
          </span>
        </div>
      </div>
    </section>
  )
}
