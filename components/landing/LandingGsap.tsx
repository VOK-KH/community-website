'use client'

import { useRef, type RefObject } from 'react'
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  useGsapSetup,
  prefersReducedMotion,
  hasFinePointer,
  scopedQuery,
  fadeUp,
  slideUp,
  lineReveal,
  letterPop,
  stOnce,
} from '@/lib/motion'

registerGsap()

type Props = { rootRef: RefObject<HTMLElement | null> }

export function LandingGsap({ rootRef }: Props) {
  const cleanups = useRef<(() => void)[]>([])

  useGsapSetup(({ reducedMotion, finePtr, addCleanup }) => {
    const root = rootRef.current
    if (!root) return
    const L = root
    const { qs, qsa } = scopedQuery(L)

    /* ══════════════════════════════════════
       DYNAMIC ISLAND NAV
    ══════════════════════════════════════ */
    const island = qs('#island-nav')
    const islandTrigger = qs('#island-trigger')
    let isExpanded = false
    let collapseTimer: ReturnType<typeof setTimeout> | null = null

    function expandIsland() {
      if (!island || isExpanded) return
      isExpanded = true
      if (collapseTimer) clearTimeout(collapseTimer)
      gsap.to(island, {
        width: window.innerWidth < 680 ? '92vw' : 600,
        height: 54,
        borderRadius: 100,
        duration: 0.55,
        ease: 'back.out(1.6)',
      })
    }

    function collapseIsland() {
      if (!island) return
      if (collapseTimer) clearTimeout(collapseTimer)
      collapseTimer = setTimeout(() => {
        if (!isExpanded) return
        isExpanded = false
        gsap.to(island, {
          width: 160,
          height: 36,
          borderRadius: 100,
          duration: 0.6,
          ease: 'expo.inOut',
          onComplete: () => island.classList.remove('expanded'),
        })
        island.classList.remove('expanded')
      }, 320)
    }

    if (islandTrigger && island) {
      const onTE = () => { island.classList.add('expanded'); expandIsland() }
      const onTL = () => collapseIsland()
      const onIE = () => {
        if (collapseTimer) clearTimeout(collapseTimer)
        if (!isExpanded) { island.classList.add('expanded'); expandIsland() }
      }
      islandTrigger.addEventListener('mouseenter', onTE)
      islandTrigger.addEventListener('mouseleave', onTL)
      island.addEventListener('mouseenter', onIE)
      island.addEventListener('mouseleave', onTL)
      addCleanup(() => {
        islandTrigger.removeEventListener('mouseenter', onTE)
        islandTrigger.removeEventListener('mouseleave', onTL)
        island.removeEventListener('mouseenter', onIE)
        island.removeEventListener('mouseleave', onTL)
      })
    }

    ScrollTrigger.create({ start: 'top top', onLeave: () => collapseIsland() })

    if (island && !reducedMotion) {
      gsap.to(island, {
        scale: 1.015, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
        onUpdate: function () { if (isExpanded) gsap.set(island, { scale: 1 }) },
      })
    }

    /* Active nav links */
    function setActive(id: string) {
      qsa('.island-link').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
      })
    }
    ;(['about', 'projects', 'community'] as const).forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      ScrollTrigger.create({
        trigger: el, start: 'top 55%', end: 'bottom 55%',
        onEnter: () => setActive(id), onEnterBack: () => setActive(id),
      })
    })

    /* ══════════════════════════════════════
       CURSOR SYSTEM
    ══════════════════════════════════════ */
    const cur = qs('#cur')
    const curRing = cur?.querySelector<HTMLElement>('.cur-ring') ?? null
    const curDot  = cur?.querySelector<HTMLElement>('.cur-dot')  ?? null

    if (cur && curDot && curRing && finePtr) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2
      let rx = mx, ry = my, raf = 0

      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY
        gsap.to(curDot, { x: mx, y: my, duration: 0.06, ease: 'none' })
      }
      window.addEventListener('mousemove', onMove)

      const loop = () => {
        rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1
        gsap.set(curRing, { x: rx, y: ry })
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)

      const secIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.3) {
              const sec = (e.target as HTMLElement).dataset.sec
              if (sec) L.setAttribute('data-section', sec)
            }
          })
        },
        { threshold: [0.3, 0.6] },
      )
      qsa('[data-sec]').forEach((s) => secIO.observe(s))

      const onHE = () => L.classList.add('cur-hover')
      const onHL = () => L.classList.remove('cur-hover')
      qsa('button,a,.pill,.pc,.island-link,.hsc-card').forEach((el) => {
        el.addEventListener('mouseenter', onHE)
        el.addEventListener('mouseleave', onHL)
      })

      addCleanup(() => {
        window.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(raf)
        secIO.disconnect()
        qsa('button,a,.pill,.pc,.island-link,.hsc-card').forEach((el) => {
          el.removeEventListener('mouseenter', onHE)
          el.removeEventListener('mouseleave', onHL)
        })
      })
    }

    /* ══════════════════════════════════════
       HERO ENTRANCE
    ══════════════════════════════════════ */
    if (reducedMotion) {
      L.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        node.textContent = parseInt(node.dataset.count ?? '0', 10).toLocaleString()
      })
    } else {
      /* ── initial hidden + blurred states ── */
      gsap.set('#hbadge',          { opacity: 0, filter: 'blur(10px)', y: -6 })
      gsap.set(qsa('.h1-word'),    { opacity: 0, filter: 'blur(8px)',  y: '110%' })
      gsap.set('#hsubt',           { opacity: 0, filter: 'blur(10px)', y: 8 })
      gsap.set('#hvok',            { opacity: 0, filter: 'blur(8px)',  y: 6 })
      gsap.set('#hdesc',           { opacity: 0, filter: 'blur(7px)',  y: 6 })
      gsap.set('#hctas',           { opacity: 0, filter: 'blur(6px)',  y: 4 })
      gsap.set('#hstats',          { opacity: 0, filter: 'blur(6px)',  y: 4 })
      gsap.set('#scind',           { opacity: 0, filter: 'blur(4px)' })

      /* ── staggered blur-focus + slide timeline ── */
      const htl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      htl
        .to('#hbadge',         { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.95 }, 0.3)
        .to(qsa('.h1-word'),   { opacity: 1, filter: 'blur(0px)', y: '0%', duration: 1.1, stagger: 0.13 }, 0.5)
        .to('#hsubt',          { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.85 }, 0.88)
        .to('#hvok',           { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.75 }, 1.12)
        .to('#hdesc',          { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.75 }, 1.27)
        .to('#hctas',          { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.75 }, 1.42)
        .to('#hstats',         { opacity: 1, filter: 'blur(0px)', y: 0,    duration: 0.75 }, 1.57)
        .to('#scind',          { opacity: 1, filter: 'blur(0px)',           duration: 0.65 }, 1.92)

      L.querySelectorAll<HTMLElement>('[data-count]').forEach((node) => {
        const target = parseInt(node.dataset.count ?? '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target, duration: 2.4, ease: 'power3.out', delay: 1.6,
          onUpdate: () => { node.textContent = Math.round(obj.v).toLocaleString() },
        })
      })
    }

    /* ══════════════════════════════════════
       HERO PARALLAX
    ══════════════════════════════════════ */
    if (!reducedMotion) {
      gsap.to('.hero-h1', {
        yPercent: -28, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('#hdesc,#hctas', {
        yPercent: -18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: true },
      })
      gsap.to('#hstats', {
        yPercent: -12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true },
      })

      /* orb scroll parallax */
      gsap.to('#o1', { yPercent:  35, xPercent:  8, ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1   } })
      gsap.to('#o2', { yPercent: -28,               ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1.5 } })
      gsap.to('#o3', { yPercent:  22,               ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })

      /* bg grid drift */
      gsap.to('#bgGrid', {
        backgroundPositionY: '25%', ease: 'none',
        scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 2.5 },
      })
    }

    /* ══════════════════════════════════════
       MOUSE PARALLAX — orbs follow cursor
    ══════════════════════════════════════ */
    if (!reducedMotion && finePtr) {
      const o1 = qs('#o1'), o2 = qs('#o2'), o3 = qs('#o3')
      const onMP = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth  - 0.5
        const cy = e.clientY / window.innerHeight - 0.5
        if (o1) gsap.to(o1, { x: cx *  38, y: cy *  28, duration: 1.8, ease: 'power2.out' })
        if (o2) gsap.to(o2, { x: cx * -28, y: cy * -18, duration: 2.2, ease: 'power2.out' })
        if (o3) gsap.to(o3, { x: cx *  18, y: cy *  22, duration: 1.6, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', onMP, { passive: true })
      addCleanup(() => window.removeEventListener('mousemove', onMP))
    }

    /* MarqueeStrip manages its own velocity + hover-pause. */

    /* ══════════════════════════════════════
       ABOUT — scroll reveals
    ══════════════════════════════════════ */
    if (!reducedMotion) {
      qsa('.gsap-fade').forEach((el) => {
        gsap.fromTo(el, fadeUp.from, {
          ...fadeUp.to(),
          scrollTrigger: stOnce(el, 'top 90%'),
        })
      })
      qsa('.gsap-up').forEach((el) => {
        gsap.fromTo(el, slideUp.from, {
          ...slideUp.to(),
          scrollTrigger: stOnce(el, 'top 88%'),
        })
      })

      /* code-card + chips parallax + idle float */
      gsap.to('#codeCard', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.chip1',    { yPercent: -22, xPercent:  6, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
      gsap.to('.chip2',    { yPercent:  18, xPercent: -6, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1   } })
      gsap.to('.chip3',    { yPercent: -10,               ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.8 } })

      gsap.to('#codeCard', { y: -14, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.chip1',    { y:  -9, duration: 2.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 })
      gsap.to('.chip2',    { y:  11, duration: 3.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
      gsap.to('.chip3',    { y:  -7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 })
    }

    /* ══════════════════════════════════════
       PROJECT CARDS — tilt + reveal
    ══════════════════════════════════════ */
    const cardCleanups: (() => void)[] = []
    qsa('.gsap-card').forEach((card, i) => {
      if (!reducedMotion) {
        gsap.fromTo(card,
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.06,
            scrollTrigger: stOnce(card, 'top 92%') },
        )
      }
      if (finePtr) {
        const onMm = (e: Event) => {
          const ev = e as MouseEvent
          const r  = card.getBoundingClientRect()
          const dx = (ev.clientX - r.left) / r.width  - 0.5
          const dy = (ev.clientY - r.top)  / r.height - 0.5
          gsap.to(card, { rotateY: dx * 10, rotateX: -dy * 7, duration: 0.35, ease: 'power2.out', transformPerspective: 700, scale: 1.02 })
        }
        const onMl = () => gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
        card.addEventListener('mousemove', onMm)
        card.addEventListener('mouseleave', onMl)
        cardCleanups.push(() => {
          card.removeEventListener('mousemove', onMm)
          card.removeEventListener('mouseleave', onMl)
        })
      }
    })
    addCleanup(() => cardCleanups.forEach((fn) => fn()))

    /* ══════════════════════════════════════
       DIVIDERS  /  CTA  /  PILLS  /  VOK
    ══════════════════════════════════════ */
    if (!reducedMotion) {
      qsa('.gsap-divider').forEach((el) => {
        gsap.fromTo(el, lineReveal.from, {
          ...lineReveal.to(),
          scrollTrigger: stOnce(el, 'top 92%'),
        })
      })

      gsap.to('.cta-h', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.cta-sec', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      qsa('.pills').forEach((wrap) => {
        gsap.fromTo(
          Array.from(wrap.querySelectorAll('.pill')),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: 'back.out(1.5)',
            scrollTrigger: stOnce(wrap, 'top 92%') },
        )
      })

      ScrollTrigger.create({
        trigger: '.vok-line', start: 'top 90%', once: true,
        onEnter: () =>
          gsap.fromTo('.vok-line .L', letterPop.from, { ...letterPop.to(), stagger: 0.14 }),
      })
    }

    ScrollTrigger.refresh()
  }, [rootRef])

  return null
}
