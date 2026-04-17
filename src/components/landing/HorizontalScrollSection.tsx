'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion, isMobile, hasFinePointer } from '@/lib/motion'

registerGsap()

/* ── Feature data ─────────────────────────────────────────────────────── */

const FEATURES = [
  {
    illust: 'Rocket',
    cardCls: 'hsc-cy',
    tag: 'Build',
    title: 'Ship real projects',
    desc: 'Take your side project from idea to production with live feedback, async code reviews, and support from 4,200+ devs.',
    metric: '830+',
    metricLabel: 'projects shipped',
    extra: ['TypeScript', 'React', 'Next.js'],
  },
  {
    illust: 'BookOpen',
    cardCls: 'hsc-vi',
    tag: 'Learn',
    title: 'Learn in public',
    desc: 'Share your dev journey — post wins, stumbles, and breakthroughs. The community learns with you, not just from you.',
    metric: '12k+',
    metricLabel: 'commits this year',
    extra: ['Dev Journals', 'Pair Programming'],
  },
  {
    illust: 'Handshake',
    cardCls: 'hsc-em',
    tag: 'Connect',
    title: 'Find your people',
    desc: 'Co-founders, mentors, code reviewers, accountability partners. The right person is always one message away.',
    metric: '4.2k+',
    metricLabel: 'active members',
    extra: ['Mentorship', 'Hack Nights'],
  },
  {
    illust: 'Zap',
    cardCls: 'hsc-am',
    tag: 'Grow',
    title: 'Level up, fast',
    desc: 'Weekly challenges, dedicated code-review threads, and pair programming sprints that make you a sharper engineer.',
    metric: '52',
    metricLabel: 'challenges / year',
    extra: ['Weekly Challenges', 'Code Reviews'],
  },
  {
    illust: 'Sparkles',
    cardCls: 'hsc-pk',
    tag: 'Share',
    title: 'No gatekeeping — ever',
    desc: 'VokDev means Vision Of Knowledge. Open-source everything, share freely, and watch knowledge compound exponentially.',
    metric: '100%',
    metricLabel: 'open source',
    extra: ['Open Source', 'Job Board'],
  },
] as const

/* ── Sub-components ────────────────────────────────────────────────────── */

function LabelCard() {
  return (
    <div className="hsc-label">
      <div className="sec-tag">How it works</div>
      <h2 className="hsc-h">
        One community.
        <br />
        <span className="hl">Infinite</span>
        <br />
        possibilities.
      </h2>
      <p className="hsc-sub">
        Swipe or scroll to explore →
      </p>
    </div>
  )
}

function FeatureCard({
  illust,
  cardCls,
  tag,
  title,
  desc,
  metric,
  metricLabel,
  extra,
  index,
}: (typeof FEATURES)[number] & { index: number }) {
  return (
    <article className={`hsc-card ${cardCls}`} style={{ '--card-i': index } as React.CSSProperties}>
      <div className="hsc-card-top">
        <span className="hsc-icon">
          <Image
            src={`/illust/${illust}.svg`}
            alt={tag}
            width={48}
            height={48}
            className="hsc-illust"
          />
        </span>
        <span className="hsc-tag">{tag}</span>
      </div>
      <h3 className="hsc-title">{title}</h3>
      <p className="hsc-desc">{desc}</p>
      <div className="hsc-tags">
        {extra.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="hsc-metric">
        <span className="hsc-num">{metric}</span>
        <span className="hsc-lbl">{metricLabel}</span>
      </div>
    </article>
  )
}

/* ── Main component ───────────────────────────────────────────────────── */

export function HorizontalScrollSection() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    registerGsap()
    const pin = pinRef.current
    const track = trackRef.current
    const fill = fillRef.current
    if (!pin || !track) return

    // On small screens fall back to vertical — skip horizontal scroll
    if (isMobile(768)) return

    if (prefersReducedMotion()) {
      // ensure cards are visible
      Array.from(track.querySelectorAll<HTMLElement>('.hsc-card')).forEach((c) => {
        c.style.opacity = '1'
      })
      return
    }

    /* extra scroll distance = full track width - one viewport */
    const getExtra = () => track.scrollWidth - window.innerWidth

    const tween = gsap.to(track, {
      x: () => -getExtra(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 1.1,
        start: 'top top',
        end: () => `+=${getExtra()}`,
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          if (fill) fill.style.transform = `scaleX(${st.progress})`
        },
      },
    })

    /* card entrance: stagger from initial hidden state */
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.hsc-card'))
    gsap.set(cards, { opacity: 0, y: 36 })
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.18 + i * 0.08,
        scrollTrigger: {
          trigger: pin,
          start: 'top 85%',
          once: true,
        },
      })
    })

    /* cursor-following glow on cards */
    const glowCleanups: (() => void)[] = []
    if (hasFinePointer()) {
      cards.forEach((card) => {
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--gx', `${e.clientX - r.left}px`)
          card.style.setProperty('--gy', `${e.clientY - r.top}px`)
        }
        card.addEventListener('mousemove', onMove)
        glowCleanups.push(() => card.removeEventListener('mousemove', onMove))
      })
    }

    ScrollTrigger.refresh()

    return () => {
      tween.kill()
      glowCleanups.forEach((fn) => fn())
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === pin) t.kill()
      })
    }
  }, [])

  return (
    <section className="hscroll-sec z1" id="hscroll" data-sec="hscroll">
      {/* pinned viewport — GSAP pins this element */}
      <div ref={pinRef} className="hscroll-pin">
        {/* horizontal track */}
        <div ref={trackRef} className="hscroll-track">
          <LabelCard />
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.tag} {...f} index={i} />
          ))}
        </div>

        {/* scrub progress bar */}
        <div className="hscroll-progress" aria-hidden>
          <div ref={fillRef} className="hscroll-progress-fill" />
        </div>
      </div>
    </section>
  )
}
