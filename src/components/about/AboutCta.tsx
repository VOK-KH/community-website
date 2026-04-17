'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Sparkles, Heart } from 'lucide-react'
import { AboutSectionTitle } from '@/components/about/AboutSectionTitle'
import { clearAboutTextMotion, setAboutDescsHidden, setAboutWordsHidden } from '@/components/about/sectionText'
import { gsap, registerGsap, prefersReducedMotion, hasFinePointer } from '@/lib/motion'

registerGsap()

const features = [
  { icon: Users, label: 'Inclusive spaces' },
  { icon: Sparkles, label: 'Ship in public' },
  { icon: Heart, label: 'Peer support' },
]

export function AboutCta() {
  const secRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const sec = secRef.current
    if (!sec) return

    const reduced = prefersReducedMotion()
    const chip = sec.querySelector('.cta-chip')
    const heading = sec.querySelector('#about-cta-heading')
    const body = sec.querySelector('.cta-body')
    const feats = Array.from(sec.querySelectorAll<HTMLElement>('.cta-feat'))
    const btns = Array.from(sec.querySelectorAll<HTMLElement>('.pg-cta-btn'))
    const proof = sec.querySelector('.cta-proof')

    if (!chip || !heading || !body) return

    if (reduced) {
      clearAboutTextMotion(sec)
      gsap.set(chip, { opacity: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(body, { opacity: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(feats, { opacity: 1, y: 0, filter: 'blur(0px)' })
      gsap.set(btns, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' })
      if (proof) gsap.set(proof, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    setAboutWordsHidden(sec)
    setAboutDescsHidden(sec)
    gsap.set(chip, { opacity: 0, y: -10, filter: 'blur(6px)' })
    gsap.set(feats, { opacity: 0, y: 12, filter: 'blur(5px)' })
    gsap.set(btns, { opacity: 0, y: 16, scale: 0.94, filter: 'blur(6px)' })
    if (proof) gsap.set(proof, { opacity: 0, y: 10, filter: 'blur(4px)' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top 78%', once: true },
      defaults: { ease: 'expo.out' },
    })

    const words = heading.querySelectorAll('.about-word')
    const descs = sec.querySelectorAll('.about-sec-desc')

    tl.to(chip, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 }, 0)
      .to(words, { y: '0%', duration: 0.88, stagger: 0.06 }, 0.06)
      .to(descs, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8 }, 0.22)
      .to(feats, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.07 }, 0.45)
      .to(
        btns,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        },
        0.62,
      )
    if (proof) tl.to(proof, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55 }, 0.9)

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  useEffect(() => {
    const sec = secRef.current
    const glow = glowRef.current
    if (!sec || !glow || prefersReducedMotion() || !hasFinePointer()) return

    let active = false
    const strength = 0.3

    const onSectionMove = (e: MouseEvent) => {
      const rect = sec.getBoundingClientRect()
      gsap.to(glow, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      if (!active) {
        active = true
        gsap.to(glow, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' })
      }
    }

    const onSectionLeave = () => {
      gsap.to(glow, { opacity: 0, scale: 0.5, duration: 0.5, ease: 'power2.inOut' })
      active = false
    }

    const btns = Array.from(sec.querySelectorAll<HTMLElement>('.pg-cta-btn'))
    const cleanups: Array<[HTMLElement, string, EventListener]> = []

    btns.forEach((btn) => {
      const onMove = (e: Event) => {
        const me = e as MouseEvent
        const r = btn.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        gsap.to(btn, {
          x: (me.clientX - cx) * strength,
          y: (me.clientY - cy) * strength,
          duration: 0.4,
          ease: 'power3.out',
        })
        btn.style.setProperty('--btn-gx', `${((me.clientX - r.left) / r.width) * 100}%`)
        btn.style.setProperty('--btn-gy', `${((me.clientY - r.top) / r.height) * 100}%`)
      }
      const onEnter = () => {
        gsap.to(btn, { scale: 1.05, duration: 0.25, ease: 'power2.out' })
        gsap.to(glow, { scale: 1.6, duration: 0.35, ease: 'back.out(2)' })
      }
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
        gsap.to(glow, { scale: 1, duration: 0.35, ease: 'power2.out' })
      }
      btn.addEventListener('mousemove', onMove)
      btn.addEventListener('mouseenter', onEnter)
      btn.addEventListener('mouseleave', onLeave)
      cleanups.push([btn, 'mousemove', onMove], [btn, 'mouseenter', onEnter], [btn, 'mouseleave', onLeave])
    })

    sec.addEventListener('mousemove', onSectionMove)
    sec.addEventListener('mouseleave', onSectionLeave)

    return () => {
      sec.removeEventListener('mousemove', onSectionMove)
      sec.removeEventListener('mouseleave', onSectionLeave)
      cleanups.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn))
    }
  }, [])

  return (
    <section ref={secRef} className="pg-cta" aria-labelledby="about-cta-heading">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 50%, hsl(var(--primary) / 0.08), transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-[0.06]"
        style={{ borderColor: 'hsl(var(--primary))' }}
        aria-hidden
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute z-0 h-[280px] w-[280px] rounded-full mix-blend-screen"
        aria-hidden
        style={{
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.5)',
          background:
            'radial-gradient(circle at center, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.04) 40%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      <div className="pg-cta-inner">
        <p
          className="cta-chip mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            color: 'hsl(var(--primary))',
            borderColor: 'hsl(var(--primary) / 0.25)',
            background: 'hsl(var(--primary) / 0.06)',
          }}
        >
          <Users size={12} aria-hidden />
          Grow with us
        </p>

        <AboutSectionTitle id="about-cta-heading" words={['Join', 'Our', 'Community']} />
        <p className="cta-body about-sec-desc">
          Whether you are early in your journey or deep in your craft, there is room to contribute,
          learn, and lead at VokDev — the same motion and care we put into our projects page.
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="cta-feat inline-flex items-center gap-2 text-xs tracking-wide text-muted-foreground"
              style={{ fontFamily: 'var(--font-landing-mono), ui-monospace, monospace' }}
            >
              <Icon size={13} className="text-primary opacity-70" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/community"
            className="pg-cta-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_4px_20px_hsl(var(--primary)/0.25)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_8px_32px_hsl(var(--primary)/0.35),0_0_60px_-8px_hsl(var(--primary)/0.2)]"
            style={{ willChange: 'transform', isolation: 'isolate' }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
              style={{
                background:
                  'radial-gradient(180px circle at var(--btn-gx, 50%) var(--btn-gy, 50%), rgba(255,255,255,0.18), transparent 60%)',
              }}
            />
            <span className="relative z-10">Create account</span>
            <ArrowRight
              size={15}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            href="/projects"
            className="pg-cta-btn group relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-8 py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-shadow duration-300"
            style={{
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--card) / 0.5)',
              willChange: 'transform',
              isolation: 'isolate',
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
              style={{
                background:
                  'radial-gradient(180px circle at var(--btn-gx, 50%) var(--btn-gy, 50%), hsl(var(--foreground) / 0.06), transparent 60%)',
              }}
            />
            <span className="relative z-10">Explore projects</span>
          </Link>
        </div>

        <p className="cta-proof mt-8 text-xs tracking-wide text-muted-foreground">
          Same community energy as{' '}
          <Link href="/projects" className="font-medium text-foreground underline-offset-4 hover:underline">
            featured projects
          </Link>{' '}
          — open roles, open repos, open doors.
        </p>
      </div>
    </section>
  )
}
