'use client'

import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type LandingGsapProps = {
  rootRef: RefObject<HTMLElement | null>
}

export function LandingGsap({ rootRef }: LandingGsapProps) {
  const cleanupsRef = useRef<(() => void)[]>([])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const landingRoot: HTMLElement = root

    cleanupsRef.current = []
    const addCleanup = (fn: () => void) => {
      cleanupsRef.current.push(fn)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    const ctx = gsap.context(() => {
      const island = landingRoot.querySelector('#island-nav') as HTMLElement | null
      const islandTrigger = landingRoot.querySelector('#island-trigger') as HTMLElement | null

      let isExpanded = false
      let collapseTimer: ReturnType<typeof setTimeout> | null = null

      function expandIsland() {
        if (!island || isExpanded) return
        isExpanded = true
        if (collapseTimer) clearTimeout(collapseTimer)
        const w = window.innerWidth < 680 ? '92vw' : 600
        gsap.to(island, {
          width: w,
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
        const onTEnter = () => {
          island.classList.add('expanded')
          expandIsland()
        }
        const onTLeave = () => collapseIsland()
        const onIEnter = () => {
          if (collapseTimer) clearTimeout(collapseTimer)
          if (!isExpanded) {
            island.classList.add('expanded')
            expandIsland()
          }
        }
        islandTrigger.addEventListener('mouseenter', onTEnter)
        islandTrigger.addEventListener('mouseleave', onTLeave)
        island.addEventListener('mouseenter', onIEnter)
        island.addEventListener('mouseleave', onTLeave)
        addCleanup(() => {
          islandTrigger.removeEventListener('mouseenter', onTEnter)
          islandTrigger.removeEventListener('mouseleave', onTLeave)
          island.removeEventListener('mouseenter', onIEnter)
          island.removeEventListener('mouseleave', onTLeave)
        })
      }

      ScrollTrigger.create({
        start: 'top top',
        onLeave: () => collapseIsland(),
      })

      if (island && !reducedMotion) {
        gsap.to(island, {
          scale: 1.015,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          onUpdate: function () {
            if (isExpanded) gsap.set(island, { scale: 1 })
          },
        })
      }

      function setActiveNav(id: string) {
        landingRoot.querySelectorAll('.island-link').forEach((a) => {
          const el = a as HTMLAnchorElement
          el.classList.toggle('active', el.getAttribute('href') === `#${id}`)
        })
      }
      ;(['about', 'projects', 'community'] as const).forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActiveNav(id),
          onEnterBack: () => setActiveNav(id),
        })
      })

      const cur = landingRoot.querySelector('#cur') as HTMLElement | null
      const curRing = cur?.querySelector('.cur-ring') as HTMLElement | null
      const curDot = cur?.querySelector('.cur-dot') as HTMLElement | null

      if (cur && curDot && curRing && finePointer) {
        let mx = window.innerWidth / 2
        let my = window.innerHeight / 2
        let rx = mx
        let ry = my
        let raf = 0

        const onMove = (e: MouseEvent) => {
          mx = e.clientX
          my = e.clientY
          gsap.to(curDot, { x: mx, y: my, duration: 0.06, ease: 'none' })
        }
        window.addEventListener('mousemove', onMove)

        const ringFollow = () => {
          rx += (mx - rx) * 0.1
          ry += (my - ry) * 0.1
          gsap.set(curRing, { x: rx, y: ry })
          raf = requestAnimationFrame(ringFollow)
        }
        raf = requestAnimationFrame(ringFollow)

        const sections = landingRoot.querySelectorAll('[data-sec]')
        const secObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting && e.intersectionRatio > 0.3) {
                const sec = (e.target as HTMLElement).dataset.sec
                if (sec) landingRoot.setAttribute('data-section', sec)
              }
            })
          },
          { threshold: [0.3, 0.6] },
        )
        sections.forEach((s) => secObserver.observe(s))

        const hoverSelector = 'button,a,.pill,.pc,.island-link'
        const onHE = () => landingRoot.classList.add('cur-hover')
        const onHL = () => landingRoot.classList.remove('cur-hover')
        landingRoot.querySelectorAll(hoverSelector).forEach((el) => {
          el.addEventListener('mouseenter', onHE)
          el.addEventListener('mouseleave', onHL)
        })

        addCleanup(() => {
          window.removeEventListener('mousemove', onMove)
          cancelAnimationFrame(raf)
          secObserver.disconnect()
          landingRoot.querySelectorAll(hoverSelector).forEach((el) => {
            el.removeEventListener('mouseenter', onHE)
            el.removeEventListener('mouseleave', onHL)
          })
        })
      }

      if (reducedMotion) {
        landingRoot.querySelectorAll('[data-count]').forEach((node) => {
          const el = node as HTMLElement
          const t = parseInt(el.dataset.count ?? '0', 10)
          el.textContent = t.toLocaleString()
        })
        return
      }

      const easeOut = 'expo.out'
      const htl = gsap.timeline()
      htl
        .from('#hbadge', { opacity: 0, y: 28, duration: 0.9, ease: easeOut }, 0.3)
        .from(
          landingRoot.querySelectorAll('.h1-word'),
          { opacity: 0, y: 56, duration: 1.1, stagger: 0.13, ease: easeOut },
          0.5,
        )
        .from('#hsubt', { opacity: 0, y: 24, duration: 0.8, ease: easeOut }, 0.85)
        .from('#hvok', { opacity: 0, y: 20, duration: 0.7, ease: easeOut }, 1.1)
        .from('#hdesc', { opacity: 0, y: 20, duration: 0.7, ease: easeOut }, 1.25)
        .from('#hctas', { opacity: 0, y: 20, duration: 0.7, ease: easeOut }, 1.4)
        .from('#hstats', { opacity: 0, y: 20, duration: 0.7, ease: easeOut }, 1.55)
        .from('#scind', { opacity: 0, duration: 0.6, ease: easeOut }, 1.9)

      landingRoot.querySelectorAll('[data-count]').forEach((node) => {
        const el = node as HTMLElement
        const t = parseInt(el.dataset.count ?? '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: t,
          duration: 2.4,
          ease: 'power3.out',
          delay: 1.6,
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString()
          },
        })
      })

      gsap.to('.hero-h1', {
        yPercent: -28,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('#hdesc,#hctas', {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: true },
      })
      gsap.to('#hstats', {
        yPercent: -12,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: '45% top', end: 'bottom top', scrub: true },
      })

      gsap.to('#o1', {
        yPercent: 35,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: landingRoot, start: 'top top', end: 'bottom bottom', scrub: 1 },
      })
      gsap.to('#o2', {
        yPercent: -28,
        ease: 'none',
        scrollTrigger: { trigger: landingRoot, start: 'top top', end: 'bottom bottom', scrub: 1.5 },
      })
      gsap.to('#o3', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: { trigger: landingRoot, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      })

      gsap.to('#bgGrid', {
        backgroundPositionY: '25%',
        ease: 'none',
        scrollTrigger: { trigger: landingRoot, start: 'top top', end: 'bottom bottom', scrub: 2.5 },
      })

      let lastY = 0
      const onScrollVel = () => {
        const d = Math.abs(window.scrollY - lastY)
        lastY = window.scrollY
        const speed = 1 + d * 0.04
        const mq1 = landingRoot.querySelector('#mq1') as HTMLElement | null
        const mq2 = landingRoot.querySelector('#mq2') as HTMLElement | null
        if (mq1) mq1.style.animationDuration = `${32 / Math.min(speed, 3)}s`
        if (mq2) mq2.style.animationDuration = `${26 / Math.min(speed, 3)}s`
      }
      window.addEventListener('scroll', onScrollVel, { passive: true })
      addCleanup(() => window.removeEventListener('scroll', onScrollVel))

      gsap.utils.toArray(landingRoot.querySelectorAll('.gsap-fade')).forEach((el) => {
        const node = el as HTMLElement
        gsap.fromTo(
          node,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: node, start: 'top 90%', toggleActions: 'play none none none' },
          },
        )
      })
      gsap.utils.toArray(landingRoot.querySelectorAll('.gsap-up')).forEach((el) => {
        const node = el as HTMLElement
        gsap.fromTo(
          node,
          { opacity: 0, y: 52 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: node, start: 'top 88%', toggleActions: 'play none none none' },
          },
        )
      })

      gsap.to('#codeCard', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      })
      gsap.to('.chip1', {
        yPercent: -22,
        xPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to('.chip2', {
        yPercent: 18,
        xPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
      gsap.to('.chip3', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })

      gsap.to('#codeCard', { y: -14, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.chip1', { y: -9, duration: 2.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 })
      gsap.to('.chip2', { y: 11, duration: 3.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
      gsap.to('.chip3', { y: -7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 })

      const cardCleanups: (() => void)[] = []
      gsap.utils.toArray(landingRoot.querySelectorAll('.gsap-card')).forEach((cardEl, i) => {
        const card = cardEl as HTMLElement
        gsap.fromTo(
          card,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
            delay: i * 0.06,
          },
        )

        if (finePointer) {
          const onMm = (e: Event) => {
            const ev = e as MouseEvent
            const r = card.getBoundingClientRect()
            const dx = (ev.clientX - r.left) / r.width - 0.5
            const dy = (ev.clientY - r.top) / r.height - 0.5
            gsap.to(card, {
              rotateY: dx * 10,
              rotateX: -dy * 7,
              duration: 0.35,
              ease: 'power2.out',
              transformPerspective: 700,
              scale: 1.02,
            })
          }
          const onMl = () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'expo.out' })
          }
          card.addEventListener('mousemove', onMm)
          card.addEventListener('mouseleave', onMl)
          cardCleanups.push(() => {
            card.removeEventListener('mousemove', onMm)
            card.removeEventListener('mouseleave', onMl)
          })
        }
      })
      addCleanup(() => cardCleanups.forEach((fn) => fn()))

      gsap.utils.toArray(landingRoot.querySelectorAll('.gsap-divider')).forEach((d) => {
        const el = d as HTMLElement
        el.style.transformOrigin = 'left center'
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
          },
        )
      })

      gsap.to('.cta-h', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.cta-sec', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })

      gsap.utils.toArray(landingRoot.querySelectorAll('.pills')).forEach((wrapEl) => {
        const wrap = wrapEl as HTMLElement
        gsap.fromTo(
          wrap.querySelectorAll('.pill'),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.45,
            ease: 'back.out(1.5)',
            scrollTrigger: { trigger: wrap, start: 'top 92%', toggleActions: 'play none none none' },
          },
        )
      })

      ScrollTrigger.create({
        trigger: '.vok-line',
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            '.vok-line .L',
            { opacity: 0, scale: 0.4 },
            { opacity: 1, scale: 1, stagger: 0.14, duration: 0.5, ease: 'back.out(2)' },
          )
        },
      })

      ScrollTrigger.refresh()
    }, landingRoot)

    return () => {
      cleanupsRef.current.forEach((fn) => fn())
      cleanupsRef.current = []
      ctx.revert()
    }
  }, [rootRef])

  return null
}
