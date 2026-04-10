'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGsap } from '@/lib/motion'
import { marqueeRow1, marqueeRow2 } from './data'

registerGsap()

type Item = { text: string; mod?: 'c' | 'v' | 'e' }

function Row({
  items,
  id,
  reverse,
}: {
  items: readonly Item[]
  id: string
  reverse?: boolean
}) {
  // triple for seamless loop at any speed
  const doubled = [...items, ...items, ...items]
  return (
    <div className="mq-row">
      <div
        className={`mq-inner${reverse ? ' mq-inner--rev' : ''}`}
        id={id}
        aria-hidden={id !== 'mq1'}
      >
        {doubled.map((item, i) => (
          <div key={`${id}-${i}`} className="mq-item">
            <span className={item.mod ? `mq-w ${item.mod}` : 'mq-w'}>{item.text}</span>
            <span className="mq-dot" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeStrip() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const paused = useRef(false)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    /* ── entrance: fade-up when scrolled into view ── */
    gsap.fromTo(
      wrap,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 92%',
          once: true,
        },
      },
    )

    /* ── scroll-velocity: speed up rows on fast scroll ── */
    const mq1 = wrap.querySelector<HTMLElement>('#mq1')
    const mq2 = wrap.querySelector<HTMLElement>('#mq2')
    const BASE1 = 32
    const BASE2 = 26

    let lastY = window.scrollY
    let velTimer: ReturnType<typeof setTimeout> | null = null

    const onScroll = () => {
      if (paused.current) return
      const d = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY
      const speed = Math.min(1 + d * 0.05, 3.2)

      if (mq1) mq1.style.animationDuration = `${BASE1 / speed}s`
      if (mq2) mq2.style.animationDuration = `${BASE2 / speed}s`

      // decay back to base after 400 ms of no scroll
      if (velTimer) clearTimeout(velTimer)
      velTimer = setTimeout(() => {
        if (mq1) gsap.to(mq1, { '--dur': BASE1, duration: 1.2, ease: 'power3.out', onUpdate: () => { mq1.style.animationDuration = `${BASE1}s` } })
        if (mq2) gsap.to(mq2, { '--dur': BASE2, duration: 1.2, ease: 'power3.out', onUpdate: () => { mq2.style.animationDuration = `${BASE2}s` } })
      }, 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── hover: pause both rows ── */
    const onEnter = () => {
      paused.current = true
      if (mq1) gsap.to(mq1, { animationPlayState: 'paused', duration: 0 })
      if (mq2) gsap.to(mq2, { animationPlayState: 'paused', duration: 0 })
      // smooth slow-to-stop via CSS animation-duration trick
      if (mq1) mq1.style.animationPlayState = 'paused'
      if (mq2) mq2.style.animationPlayState = 'paused'
    }
    const onLeave = () => {
      paused.current = false
      if (mq1) mq1.style.animationPlayState = 'running'
      if (mq2) mq2.style.animationPlayState = 'running'
    }
    wrap.addEventListener('mouseenter', onEnter)
    wrap.addEventListener('mouseleave', onLeave)

    /* ── mouse-tilt: subtle 3-D perspective tilt on hover ── */
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 5
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2.5
      gsap.to(wrap, { rotateX: -dy, rotateY: dx, duration: 0.55, ease: 'power2.out', transformPerspective: 800 })
    }
    const onMoveLeave = () => {
      gsap.to(wrap, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'expo.out' })
    }
    wrap.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onMoveLeave)

    return () => {
      window.removeEventListener('scroll', onScroll)
      wrap.removeEventListener('mouseenter', onEnter)
      wrap.removeEventListener('mouseleave', onLeave)
      wrap.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onMoveLeave)
      if (velTimer) clearTimeout(velTimer)
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === wrap) t.kill()
      })
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="mq-wrap"
      id="marquee"
      data-sec="marquee"
      style={{ opacity: 0 }} /* GSAP entrance sets it to 1 */
    >
      <div className="mq-fl" aria-hidden />
      <div className="mq-fr" aria-hidden />
      <Row items={marqueeRow1} id="mq1" />
      <Row items={marqueeRow2} id="mq2" reverse />
    </div>
  )
}
