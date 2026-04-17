'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { gsap, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'

registerGsap()

export function CTASection() {
  const secRef = useRef<HTMLElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return
    const qs  = (sel: string) => sec.querySelector<HTMLElement>(sel)
    const qsa = (sel: string) => Array.from(sec.querySelectorAll<HTMLElement>(sel))

    if (prefersReducedMotion()) return

    gsap.set(qs('.cta-tag'),       { opacity: 0, y: -10, filter: 'blur(6px)' })
    gsap.set(qsa('.split-inner'),  { y: '110%' })
    gsap.set(qs('.cta-body'),      { opacity: 0, y: 20, filter: 'blur(8px)' })
    gsap.set(qsa('.btn-l'),        { opacity: 0, y: 16, scale: 0.94, filter: 'blur(5px)' })
    gsap.set(qsa('.sp-av'),        { opacity: 0, x: -10, scale: 0.82, filter: 'blur(4px)' })
    gsap.set(qs('.sp-txt'),        { opacity: 0, x: 6, filter: 'blur(5px)' })
    gsap.set(qsa('.cta-feature'),  { opacity: 0, y: 14, filter: 'blur(6px)' })

    const glow = qs('.cta-glow')
    if (glow) {
      gsap.to(glow, {
        scale: 1.18, opacity: 0.85,
        duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
    }

    const ring = qs('.cta-ring')
    if (ring) {
      gsap.to(ring, {
        rotation: 360,
        duration: 45,
        ease: 'none',
        repeat: -1,
      })
    }

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    tl
      .to(qs('.cta-tag'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6,
      }, 0)
      .to(qsa('.split-inner'), {
        y: '0%', duration: 1.08, stagger: 0.18,
      }, 0.14)
      .to(qs('.cta-body'), {
        opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.85,
      }, 0.72)
      .to(qsa('.cta-feature'), {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.6, stagger: 0.08,
      }, 0.88)
      .to(qsa('.btn-l'), {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)',
      }, 1.08)
      .to(qsa('.sp-av'), {
        opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.42, stagger: 0.07, ease: 'back.out(1.5)',
      }, 1.28)
      .to(qs('.sp-txt'), {
        opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.55,
      }, 1.48)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  useEffect(() => {
    const sec = secRef.current
    const cg = cursorGlowRef.current
    if (!sec || !cg || prefersReducedMotion()) return

    let active = false

    const onMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cg, {
        x, y,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      if (!active) {
        active = true
        gsap.to(cg, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' })
      }
    }

    const onEnter = () => {
      gsap.to(cg, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' })
      active = true
    }

    const onLeave = () => {
      gsap.to(cg, { opacity: 0, scale: 0.6, duration: 0.5, ease: 'power2.inOut' })
      active = false
    }

    const btns = Array.from(sec.querySelectorAll<HTMLElement>('.btn-l'))
    const onBtnEnter = () => {
      gsap.to(cg, { scale: 1.8, duration: 0.4, ease: 'back.out(2)' })
      cg.classList.add('cta-cursor-hot')
    }
    const onBtnLeave = () => {
      gsap.to(cg, { scale: 1, duration: 0.35, ease: 'power2.out' })
      cg.classList.remove('cta-cursor-hot')
    }

    const finePtr = hasFinePointer()
    const magStrength = 0.3
    const btnMoveHandlers: Array<[HTMLElement, string, EventListener]> = []

    if (finePtr) {
      btns.forEach((btn) => {
        const onBtnMove = (e: Event) => {
          const me = e as MouseEvent
          const r = btn.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const pxInBtn = ((me.clientX - r.left) / r.width) * 100
          const pyInBtn = ((me.clientY - r.top) / r.height) * 100

          gsap.to(btn, {
            x: (me.clientX - cx) * magStrength,
            y: (me.clientY - cy) * magStrength,
            scale: 1.04,
            duration: 0.4,
            ease: 'power3.out',
          })
          btn.style.setProperty('--btn-gx', `${pxInBtn}%`)
          btn.style.setProperty('--btn-gy', `${pyInBtn}%`)
        }
        const onBtnMagLeave = () => {
          gsap.to(btn, {
            x: 0, y: 0, scale: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.4)',
          })
        }
        btn.addEventListener('mousemove', onBtnMove)
        btn.addEventListener('mouseleave', onBtnMagLeave)
        btnMoveHandlers.push(
          [btn, 'mousemove', onBtnMove],
          [btn, 'mouseleave', onBtnMagLeave],
        )
      })
    }

    sec.addEventListener('mousemove', onMove)
    sec.addEventListener('mouseenter', onEnter)
    sec.addEventListener('mouseleave', onLeave)
    btns.forEach((b) => {
      b.addEventListener('mouseenter', onBtnEnter)
      b.addEventListener('mouseleave', onBtnLeave)
    })

    return () => {
      sec.removeEventListener('mousemove', onMove)
      sec.removeEventListener('mouseenter', onEnter)
      sec.removeEventListener('mouseleave', onLeave)
      btns.forEach((b) => {
        b.removeEventListener('mouseenter', onBtnEnter)
        b.removeEventListener('mouseleave', onBtnLeave)
      })
      btnMoveHandlers.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn))
    }
  }, [])

  return (
    <section ref={secRef} className="cta-sec" id="community" data-sec="cta">
      <div className="cta-glow" />
      <div className="cta-ring" aria-hidden />
      <div
        ref={cursorGlowRef}
        className="cta-cursor-glow"
        aria-hidden
        style={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0.6)' }}
      />
      <div className="cta-wrap">
        <div className="cta-tag">
          <Zap size={12} /> Ready to ship?
        </div>

        <h2 className="cta-h">
          <span className="split-line">
            <span className="split-inner">Stop watching.</span>
          </span>
          <span className="split-line">
            <span className="split-inner">
              <span className="gr">Start building.</span>
            </span>
          </span>
        </h2>

        <p className="cta-body">
          Join thousands of developers who chose to build in the open. Ship projects, get real
          feedback, and grow your skills — all under the banner of Vision Of Knowledge.
        </p>

        <div className="cta-features">
          <div className="cta-feature">
            <span className="cta-feat-icon" style={{ color: 'var(--vok-accent)' }}>✦</span>
            <span>Free forever</span>
          </div>
          <div className="cta-feature">
            <span className="cta-feat-icon" style={{ color: 'var(--vok-violet)' }}>✦</span>
            <span>No gatekeeping</span>
          </div>
          <div className="cta-feature">
            <span className="cta-feat-icon" style={{ color: 'var(--vok-emerald)' }}>✦</span>
            <span>Ship from day one</span>
          </div>
        </div>

        <div className="cta-btns">
          <Link href="/community" className="btn-l p">
            Join VokDev Free <ArrowRight size={16} className="btn-icon" />
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
            <strong>4,200+</strong> developers building together
          </span>
        </div>
      </div>
    </section>
  )
}
