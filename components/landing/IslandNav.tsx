'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGsapSetup, scopedQuery } from '@/lib/motion'

const LOGO_CHARS = [
  { ch: 'V', accent: true },
  { ch: 'o', accent: false },
  { ch: 'k', accent: false },
  { ch: 'D', accent: false },
  { ch: 'e', accent: false },
  { ch: 'v', accent: false },
] as const

export function IslandNav() {
  const zoneRef = useRef<HTMLDivElement>(null)

  useGsapSetup(({ reducedMotion, finePtr, addCleanup }) => {
    const zone = zoneRef.current
    if (!zone) return

    const { qs } = scopedQuery(zone)
    const island = qs('#island-nav')
    const islandZone = zone
    const trigger = qs('#island-trigger')
    const SCROLL_TOP_EPS = 2
    let hot = false
    let collapseTimer: ReturnType<typeof setTimeout> | null = null
    let islandBreathe: gsap.core.Tween | null = null
    let layoutTl: gsap.core.Timeline | null = null

    const atScrollTop = () => window.scrollY <= SCROLL_TOP_EPS
    const shouldBeWide = () => atScrollTop() || hot

    function refreshIslandBreathe() {
      if (!islandBreathe) return
      if (shouldBeWide()) islandBreathe.pause()
      else islandBreathe.resume()
    }

    function killIslandTweens() {
      if (!island) return
      layoutTl?.kill()
      layoutTl = null
      gsap.killTweensOf(island, 'width,height,borderRadius')
      island.querySelectorAll<HTMLElement>('.island-logo-char').forEach((ch) => {
        gsap.killTweensOf(ch)
      })
    }

    function expandIsland() {
      if (!island) return
      if (collapseTimer) {
        clearTimeout(collapseTimer)
        collapseTimer = null
      }
      killIslandTweens()
      island.classList.add('expanded')

      const chars = island.querySelectorAll<HTMLElement>('.island-logo-char')
      /* Kill mid-tween can leave inline styles — reset before replay */
      if (chars.length) {
        gsap.set(chars, { clearProps: 'all' })
      }

      const w = window.innerWidth < 720 ? '92vw' : 380
      const expandedH = 54

      layoutTl = gsap.timeline()
      layoutTl.to(island, {
        width: w,
        height: expandedH,
        borderRadius: 100,
        duration: 0.52,
        ease: 'back.out(1.75)',
      })

      if (!reducedMotion && chars.length) {
        gsap.set(chars, { transformOrigin: '50% 100%' })
        layoutTl.from(
          chars,
          {
            yPercent: 118,
            opacity: 0,
            rotateX: -78,
            stagger: 0.055,
            duration: 0.58,
            ease: 'back.out(1.45)',
          },
          '-=0.38',
        )
      }

      refreshIslandBreathe()
    }

    function collapseIsland(immediate: boolean) {
      if (!island) return
      const run = () => {
        if (shouldBeWide()) return
        if (collapseTimer) {
          clearTimeout(collapseTimer)
          collapseTimer = null
        }
        killIslandTweens()
        island.classList.remove('expanded')
        const chars = island.querySelectorAll<HTMLElement>('.island-logo-char')
        if (chars.length) gsap.set(chars, { clearProps: 'all' })
        gsap.to(island, {
          width: 212,
          height: 36,
          borderRadius: 100,
          duration: immediate ? 0.45 : 0.55,
          ease: 'expo.inOut',
        })
        refreshIslandBreathe()
      }
      if (immediate) {
        if (collapseTimer) {
          clearTimeout(collapseTimer)
          collapseTimer = null
        }
        run()
      } else {
        if (collapseTimer) clearTimeout(collapseTimer)
        collapseTimer = setTimeout(run, 200)
      }
    }

    function applyIslandFromScroll() {
      if (!island) return
      if (hot) return
      if (atScrollTop()) {
        if (!island.classList.contains('expanded')) expandIsland()
        else refreshIslandBreathe()
      } else {
        collapseIsland(true)
      }
    }

    if (island && islandZone) {
      const onScrollIsland = () => applyIslandFromScroll()
      window.addEventListener('scroll', onScrollIsland, { passive: true })
      applyIslandFromScroll()

      const isInsideZone = (node: EventTarget | null) =>
        node instanceof Node && islandZone.contains(node)

      const hoverTargets = [trigger, island, islandZone].filter(Boolean) as HTMLElement[]

      const onPointerEnter = () => {
        hot = true
        expandIsland()
      }
      const onPointerLeave = (e: MouseEvent) => {
        if (isInsideZone(e.relatedTarget)) return
        hot = false
        if (atScrollTop()) expandIsland()
        else collapseIsland(false)
      }

      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', onPointerEnter)
        el.addEventListener('mouseleave', onPointerLeave)
      })

      addCleanup(() => {
        window.removeEventListener('scroll', onScrollIsland)
        if (collapseTimer) clearTimeout(collapseTimer)
        hoverTargets.forEach((el) => {
          el.removeEventListener('mouseenter', onPointerEnter)
          el.removeEventListener('mouseleave', onPointerLeave)
        })
      })
    }

    if (!reducedMotion && finePtr && island && islandZone) {
      const blob = qs('.island-cursor-blob')
      if (blob) {
        gsap.set(island, { transformPerspective: 900 })
        const rotX = gsap.quickTo(island, 'rotationX', { duration: 0.48, ease: 'power2.out' })
        const rotY = gsap.quickTo(island, 'rotationY', { duration: 0.48, ease: 'power2.out' })
        const blobX = gsap.quickTo(blob, 'x', { duration: 0.38, ease: 'power3.out' })
        const blobY = gsap.quickTo(blob, 'y', { duration: 0.38, ease: 'power3.out' })
        const BLOB_R = 80

        const resetIslandCursor = () => {
          const r = island.getBoundingClientRect()
          rotX(0)
          rotY(0)
          if (r.width > 0 && r.height > 0) {
            blobX(r.width * 0.5 - BLOB_R)
            blobY(r.height * 0.5 - BLOB_R)
          }
        }

        const onIslandCursorMove = (e: MouseEvent) => {
          const r = island.getBoundingClientRect()
          if (r.width < 4 || r.height < 4) return
          const nx = (e.clientX - r.left) / r.width - 0.5
          const ny = (e.clientY - r.top) / r.height - 0.5
          rotY(nx * 9)
          rotX(-ny * 7)
          blobX(e.clientX - r.left - BLOB_R)
          blobY(e.clientY - r.top - BLOB_R)
        }

        islandZone.addEventListener('mousemove', onIslandCursorMove)
        islandZone.addEventListener('mouseleave', resetIslandCursor)
        requestAnimationFrame(resetIslandCursor)
        addCleanup(() => {
          islandZone.removeEventListener('mousemove', onIslandCursorMove)
          islandZone.removeEventListener('mouseleave', resetIslandCursor)
          resetIslandCursor()
        })
      }
    }

    if (island && !reducedMotion) {
      islandBreathe = gsap.to(island, {
        scale: 1.018,
        duration: 2.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      refreshIslandBreathe()
    }
  }, [])

  return (
    <div ref={zoneRef} id="island-zone" className="island-zone">
      <div id="island-trigger" aria-hidden />
      <nav id="island-nav" aria-label="Primary">
        <div className="island-cursor-layer" aria-hidden>
          <span className="island-cursor-blob" />
        </div>
        <div className="island-pill">
          <span className="pill-logo">
            <span className="v">Vok</span>Dev
          </span>
          <span className="pill-live" aria-hidden />
          <span className="pill-divider" aria-hidden />
          <div className="pill-metrics">
            <div className="pill-stat" aria-label="4.2 thousand members">
              <span className="pill-stat-num">4.2k</span>
              <span className="pill-stat-label">members</span>
            </div>
            <div className="pill-stat" aria-label="247 members online">
              <span className="pill-stat-num">247</span>
              <span className="pill-stat-label">online</span>
            </div>
          </div>
        </div>
        <div className="island-brand">
          <span className="island-logo">
            {LOGO_CHARS.map(({ ch, accent }, i) => (
              <span key={`${ch}-${i}`} className="island-logo-clip">
                <span className={`island-logo-char${accent ? ' island-logo-char--accent' : ''}`}>
                  {ch}
                </span>
              </span>
            ))}
          </span>
        </div>
        <Link href="/community" className="island-cta">
          Join Free
        </Link>
      </nav>
    </div>
  )
}
