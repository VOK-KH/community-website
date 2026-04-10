'use client'

import { type RefObject } from 'react'
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  useGsapSetup,
  scopedQuery,
  lineReveal,
  stOnce,
} from '@/lib/motion'

registerGsap()

type Props = { rootRef: RefObject<HTMLElement | null> }

export function LandingGsap({ rootRef }: Props) {

  useGsapSetup(({ reducedMotion, finePtr, addCleanup }) => {
    const root = rootRef.current
    if (!root) return
    const L = root
    const { qs, qsa } = scopedQuery(L)

    /* ══════════════════════════════════════
       DYNAMIC ISLAND NAV
       CSS owns only child opacity (.expanded class).
       GSAP owns all dimension animation — no CSS transition conflict.
    ══════════════════════════════════════ */
    const island = qs('#island-nav')
    const islandTrigger = qs('#island-trigger')
    let isExpanded = false
    let collapseTimer: ReturnType<typeof setTimeout> | null = null

    function expandIsland() {
      if (!island || isExpanded) return
      isExpanded = true
      if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null }
      gsap.to(island, {
        width: window.innerWidth < 680 ? '92vw' : 600,
        height: 54,
        borderRadius: 100,
        duration: 0.5,
        ease: 'back.out(1.8)',
      })
    }

    function collapseIsland() {
      if (!island) return
      if (collapseTimer) clearTimeout(collapseTimer)
      collapseTimer = setTimeout(() => {
        if (!isExpanded) return
        isExpanded = false
        // Remove class first so content fades out, then size collapses
        island.classList.remove('expanded')
        gsap.to(island, {
          width: 160,
          height: 36,
          borderRadius: 100,
          duration: 0.55,
          ease: 'expo.inOut',
        })
      }, 280)
    }

    if (islandTrigger && island) {
      const onTE = () => { island.classList.add('expanded'); expandIsland() }
      const onTL = () => collapseIsland()
      const onIE = () => {
        if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null }
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

    // Subtle breathing pulse — paused while expanded
    if (island && !reducedMotion) {
      const breathe = gsap.to(island, {
        scale: 1.018, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      // Pause the breathe when expanded so it doesn't fight user interaction
      island.addEventListener('mouseenter', () => breathe.pause())
      island.addEventListener('mouseleave', () => { if (!isExpanded) breathe.resume() })
    }

    /* ── Active nav link highlighting ── */
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
       ─────────────────────────────────────
       • xPercent:-50 / yPercent:-50 owns centering — NO CSS transform on elements
       • quickSetter: dot follows instantly (zero tween overhead)
       • gsap.ticker: ring lerps smoothly behind mouse on GSAP's own RAF
       • curLabel is a DOM child of curRing — moves with the ring for free
       • Hover scale and section dot rotation are GSAP-owned (no CSS transform conflict)
    ══════════════════════════════════════ */
    const cur     = qs('#cur')
    const curRing = cur?.querySelector<HTMLElement>('.cur-ring') ?? null
    const curDot  = cur?.querySelector<HTMLElement>('.cur-dot')  ?? null

    if (cur && curDot && curRing && finePtr) {
      // Centre each element via GSAP's own percentage system
      gsap.set([curDot, curRing], { xPercent: -50, yPercent: -50 })

      // quickSetter: pre-compiled single-property setters — fastest possible update
      const setDotX  = gsap.quickSetter(curDot,  'x', 'px')
      const setDotY  = gsap.quickSetter(curDot,  'y', 'px')
      const setRingX = gsap.quickSetter(curRing, 'x', 'px')
      const setRingY = gsap.quickSetter(curRing, 'y', 'px')

      let mx = window.innerWidth  / 2
      let my = window.innerHeight / 2
      let rx = mx, ry = my

      const onMove = (e: MouseEvent) => {
        mx = e.clientX
        my = e.clientY
        setDotX(mx)
        setDotY(my)
      }
      window.addEventListener('mousemove', onMove, { passive: true })

      // Ring lerp runs on GSAP's own ticker — no extra RAF needed
      const LERP = 0.11
      const ringTick = () => {
        rx += (mx - rx) * LERP
        ry += (my - ry) * LERP
        setRingX(rx)
        setRingY(ry)
      }
      gsap.ticker.add(ringTick)

      // Section observer → update data-section + handle dot rotation
      const secIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              const sec = (entry.target as HTMLElement).dataset.sec
              if (!sec) return
              L.setAttribute('data-section', sec)
              gsap.to(curDot, {
                rotation: sec === 'marquee' ? 45 : 0,
                duration: 0.35,
                ease: sec === 'marquee' ? 'back.out(1.4)' : 'expo.out',
              })
            }
          })
        },
        { threshold: [0.3, 0.6] },
      )
      qsa('[data-sec]').forEach((s) => secIO.observe(s))

      // Hover scale handled by GSAP (avoids CSS transform conflict)
      const onHE = () => {
        L.classList.add('cur-hover')
        const sec = L.dataset.section ?? 'hero'
        const scl = sec === 'cta' ? 1.12 : sec === 'projects' ? 1.5 : 1.52
        gsap.to(curRing, { scale: scl, duration: 0.28, ease: 'back.out(1.6)' })
        if (sec === 'projects') gsap.to(curDot, { scale: 0, duration: 0.18, ease: 'power2.in' })
      }
      const onHL = () => {
        L.classList.remove('cur-hover')
        gsap.to(curRing, { scale: 1, duration: 0.4,  ease: 'expo.out' })
        gsap.to(curDot,  { scale: 1, duration: 0.28, ease: 'back.out(1.8)' })
      }

      const hoverTargets = qsa('button,a,.pill,.pc,.island-link,.hsc-card')
      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', onHE)
        el.addEventListener('mouseleave', onHL)
      })

      addCleanup(() => {
        window.removeEventListener('mousemove', onMove)
        gsap.ticker.remove(ringTick)
        secIO.disconnect()
        hoverTargets.forEach((el) => {
          el.removeEventListener('mouseenter', onHE)
          el.removeEventListener('mouseleave', onHL)
        })
      })
    }

    /* Hero entrance + counters are self-managed by HeroSection.tsx */

    /* ══════════════════════════════════════
       HERO SCROLL PARALLAX
       scrub: 1.5 gives a cushioned, cinematic scroll response
    ══════════════════════════════════════ */
    if (!reducedMotion) {
      gsap.to('.hero-h1', {
        yPercent: -26, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to('#hdesc,#hctas', {
        yPercent: -16, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to('#hstats', {
        yPercent: -10, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: 1.5 },
      })

      // Orb scroll parallax
      gsap.to('#o1', { yPercent:  35, xPercent:  8, ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1   } })
      gsap.to('#o2', { yPercent: -28,               ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1.5 } })
      gsap.to('#o3', { yPercent:  22,               ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })

      gsap.to('#bgGrid', {
        backgroundPositionY: '25%', ease: 'none',
        scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 2.5 },
      })
    }

    /* ══════════════════════════════════════
       ORB MOUSE PARALLAX
       gsap.quickTo pre-compiles the tween so each call just updates
       the destination — no per-frame tween allocation.
    ══════════════════════════════════════ */
    if (!reducedMotion && finePtr) {
      const o1 = qs('#o1'), o2 = qs('#o2'), o3 = qs('#o3')
      // Pre-compile quickTo for each axis; different durations for depth feel
      const o1x = o1 ? gsap.quickTo(o1, 'x', { duration: 1.8, ease: 'power2.out' }) : null
      const o1y = o1 ? gsap.quickTo(o1, 'y', { duration: 2.0, ease: 'power2.out' }) : null
      const o2x = o2 ? gsap.quickTo(o2, 'x', { duration: 2.4, ease: 'power2.out' }) : null
      const o2y = o2 ? gsap.quickTo(o2, 'y', { duration: 2.6, ease: 'power2.out' }) : null
      const o3x = o3 ? gsap.quickTo(o3, 'x', { duration: 1.5, ease: 'power2.out' }) : null
      const o3y = o3 ? gsap.quickTo(o3, 'y', { duration: 1.7, ease: 'power2.out' }) : null
      const onMP = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth  - 0.5
        const cy = e.clientY / window.innerHeight - 0.5
        o1x?.(cx *  36); o1y?.(cy *  26)
        o2x?.(cx * -26); o2y?.(cy * -16)
        o3x?.(cx *  16); o3y?.(cy *  20)
      }
      window.addEventListener('mousemove', onMP, { passive: true })
      addCleanup(() => window.removeEventListener('mousemove', onMP))
    }

    /* ══════════════════════════════════════
       SCROLL TEXT REVEALS
       blur-focus style — mirrors hero entrance for consistency.
       Headings get more y-travel and longer duration than body copy.
    ══════════════════════════════════════ */
    if (!reducedMotion) {
      qsa('.gsap-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20, filter: 'blur(7px)' },
          { opacity: 1, y: 0,  filter: 'blur(0px)',
            duration: 0.9, ease: 'expo.out',
            scrollTrigger: stOnce(el, 'top 90%') },
        )
      })

      qsa('.gsap-up').forEach((el) => {
        const isHeading = /^h[1-6]$/i.test(el.tagName)
        gsap.fromTo(el,
          { opacity: 0, y: isHeading ? 52 : 34, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)',
            duration: isHeading ? 1.1 : 0.88, ease: 'expo.out',
            scrollTrigger: stOnce(el, 'top 88%') },
        )
      })

      // About section visual: code card + chips scroll parallax + idle float
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
       CARD 3D TILT + ENTRANCE
       quickTo pre-compiles rotateX/Y/scale for smooth high-frequency updates.
       Leave uses gsap.to with expo.out for a natural spring-back.
    ══════════════════════════════════════ */
    const cardCleanups: (() => void)[] = []
    qsa('.gsap-card').forEach((card, i) => {
      if (!reducedMotion) {
        gsap.fromTo(card,
          { opacity: 0, y: 48, filter: 'blur(8px)' },
          { opacity: 1, y: 0,  filter: 'blur(0px)',
            duration: 0.85, ease: 'expo.out', delay: i * 0.07,
            scrollTrigger: stOnce(card, 'top 92%') },
        )
      }
      if (finePtr) {
        gsap.set(card, { transformPerspective: 700 })
        const tiltY  = gsap.quickTo(card, 'rotateY', { duration: 0.38, ease: 'power2.out' })
        const tiltX  = gsap.quickTo(card, 'rotateX', { duration: 0.38, ease: 'power2.out' })
        const tiltSc = gsap.quickTo(card, 'scale',   { duration: 0.38, ease: 'power2.out' })
        const onMm = (e: Event) => {
          const ev = e as MouseEvent
          const r  = card.getBoundingClientRect()
          tiltY((ev.clientX - r.left) / r.width  - 0.5)
          tiltX(-((ev.clientY - r.top)  / r.height - 0.5) * 7)
          tiltSc(1.025)
        }
        const onMl = () => gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.55, ease: 'expo.out' })
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
       MAGNETIC CTA BUTTONS
       quickTo updates the target position each frame; mouse-leave snaps
       back with an elastic spring for a satisfying "release" feel.
    ══════════════════════════════════════ */
    if (finePtr) {
      const magBtns = qsa('.btn-p,.btn-g,.btn-l,.island-cta')
      const magCleanups: (() => void)[] = []
      magBtns.forEach((btn) => {
        const moveX = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' })
        const moveY = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' })
        const onMm = (e: Event) => {
          const ev = e as MouseEvent
          const r = btn.getBoundingClientRect()
          moveX((ev.clientX - r.left - r.width  / 2) * 0.3)
          moveY((ev.clientY - r.top  - r.height / 2) * 0.3)
        }
        const onMl = () => gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' })
        btn.addEventListener('mousemove', onMm)
        btn.addEventListener('mouseleave', onMl)
        magCleanups.push(() => {
          btn.removeEventListener('mousemove', onMm)
          btn.removeEventListener('mouseleave', onMl)
        })
      })
      addCleanup(() => magCleanups.forEach((fn) => fn()))
    }

    /* ══════════════════════════════════════
       MISC: DIVIDERS · PILLS · VOK LETTER POP · CTA PARALLAX
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

      /* pills + vok-line .L letter-pop are now owned by AboutSection.tsx */
    }

    ScrollTrigger.refresh()
  }, [rootRef])

  return null
}
