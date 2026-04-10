'use client'

import { useRef, type RefObject } from 'react'
import Link from 'next/link'
import '@/components/landing/landing-v3.css'
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  useGsapSetup,
  scopedQuery,
  lineReveal,
  stOnce,
} from '@/lib/motion'
import { HeroSection } from '@/components/landing/HeroSection'
import { MarqueeStrip } from '@/components/landing/MarqueeStrip'
import { AboutSection } from '@/components/landing/AboutSection'
import { FeaturedProjectsSection } from '@/components/landing/FeaturedProjectsSection'
import { CTASection } from '@/components/landing/CTASection'
import { HorizontalScrollSection } from '@/components/landing/HorizontalScrollSection'

registerGsap()

function HomeGsapEffects({ rootRef }: { rootRef: RefObject<HTMLElement | null> }) {
  useGsapSetup(({ reducedMotion, finePtr, addCleanup }) => {
    const root = rootRef.current
    if (!root) return
    const L = root
    const { qs, qsa } = scopedQuery(L)

    const island = qs('#island-nav')
    const islandZone = qs('#island-zone')
    const SCROLL_TOP_EPS = 2
    let hot = false
    let collapseTimer: ReturnType<typeof setTimeout> | null = null
    let islandBreathe: gsap.core.Tween | null = null

    const atScrollTop = () => window.scrollY <= SCROLL_TOP_EPS
    const shouldBeWide = () => atScrollTop() || hot

    function refreshIslandBreathe() {
      if (!islandBreathe) return
      if (shouldBeWide()) islandBreathe.pause()
      else islandBreathe.resume()
    }

    function killIslandTweens() {
      if (island) gsap.killTweensOf(island)
    }

    function expandIsland() {
      if (!island) return
      if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null }
      killIslandTweens()
      island.classList.add('expanded')
      gsap.to(island, {
        width: window.innerWidth < 720 ? '92vw' : 680,
        height: 54,
        borderRadius: 100,
        duration: 0.5,
        ease: 'back.out(1.8)',
      })
      refreshIslandBreathe()
    }

    function collapseIsland(immediate: boolean) {
      if (!island) return
      const run = () => {
        if (shouldBeWide()) return
        if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null }
        killIslandTweens()
        island.classList.remove('expanded')
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
        if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null }
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

    if (island) {
      const onScrollIsland = () => applyIslandFromScroll()
      window.addEventListener('scroll', onScrollIsland, { passive: true })
      applyIslandFromScroll()

      let removeZoneListeners: (() => void) | undefined
      if (islandZone) {
        const relatedTargetLeavesZone = (rel: EventTarget | null) =>
          !(rel instanceof Node && islandZone.contains(rel))

        const onZoneOver = (e: MouseEvent) => {
          if (!relatedTargetLeavesZone(e.relatedTarget)) return
          hot = true
          expandIsland()
        }
        const onZoneOut = (e: MouseEvent) => {
          if (!relatedTargetLeavesZone(e.relatedTarget)) return
          hot = false
          if (atScrollTop()) expandIsland()
          else collapseIsland(false)
        }

        islandZone.addEventListener('mouseover', onZoneOver)
        islandZone.addEventListener('mouseout', onZoneOut)
        removeZoneListeners = () => {
          islandZone.removeEventListener('mouseover', onZoneOver)
          islandZone.removeEventListener('mouseout', onZoneOut)
        }
      }

      addCleanup(() => {
        window.removeEventListener('scroll', onScrollIsland)
        if (collapseTimer) clearTimeout(collapseTimer)
        removeZoneListeners?.()
      })
    }

    if (island && !reducedMotion) {
      islandBreathe = gsap.to(island, {
        scale: 1.018, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
      refreshIslandBreathe()
    }

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

      gsap.to('#o1', { yPercent: 35, xPercent: 8, ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      gsap.to('#o2', { yPercent: -28, ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 1.5 } })
      gsap.to('#o3', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })

      gsap.to('#bgGrid', {
        backgroundPositionY: '25%', ease: 'none',
        scrollTrigger: { trigger: L, start: 'top top', end: 'bottom bottom', scrub: 2.5 },
      })
    }

    if (!reducedMotion && finePtr) {
      const o1 = qs('#o1'), o2 = qs('#o2'), o3 = qs('#o3')
      const o1x = o1 ? gsap.quickTo(o1, 'x', { duration: 1.8, ease: 'power2.out' }) : null
      const o1y = o1 ? gsap.quickTo(o1, 'y', { duration: 2.0, ease: 'power2.out' }) : null
      const o2x = o2 ? gsap.quickTo(o2, 'x', { duration: 2.4, ease: 'power2.out' }) : null
      const o2y = o2 ? gsap.quickTo(o2, 'y', { duration: 2.6, ease: 'power2.out' }) : null
      const o3x = o3 ? gsap.quickTo(o3, 'x', { duration: 1.5, ease: 'power2.out' }) : null
      const o3y = o3 ? gsap.quickTo(o3, 'y', { duration: 1.7, ease: 'power2.out' }) : null
      const onMP = (e: MouseEvent) => {
        const cx = e.clientX / window.innerWidth - 0.5
        const cy = e.clientY / window.innerHeight - 0.5
        o1x?.(cx * 36); o1y?.(cy * 26)
        o2x?.(cx * -26); o2y?.(cy * -16)
        o3x?.(cx * 16); o3y?.(cy * 20)
      }
      window.addEventListener('mousemove', onMP, { passive: true })
      addCleanup(() => window.removeEventListener('mousemove', onMP))
    }

    if (!reducedMotion) {
      qsa('.gsap-fade').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20, filter: 'blur(7px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)',
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

      gsap.to('#codeCard', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.2 } })
      gsap.to('.chip1', { yPercent: -22, xPercent: 6, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
      gsap.to('.chip2', { yPercent: 18, xPercent: -6, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      gsap.to('.chip3', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 0.8 } })

      gsap.to('#codeCard', { y: -14, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.chip1', { y: -9, duration: 2.9, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.6 })
      gsap.to('.chip2', { y: 11, duration: 3.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.1 })
      gsap.to('.chip3', { y: -7, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3 })
    }

    const cardCleanups: (() => void)[] = []
    qsa('.gsap-card').forEach((card, i) => {
      if (!reducedMotion) {
        gsap.fromTo(card,
          { opacity: 0, y: 48, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.85, ease: 'expo.out', delay: i * 0.07,
            scrollTrigger: stOnce(card, 'top 92%') },
        )
      }
      if (finePtr) {
        gsap.set(card, { transformPerspective: 700 })
        const tiltY = gsap.quickTo(card, 'rotateY', { duration: 0.38, ease: 'power2.out' })
        const tiltX = gsap.quickTo(card, 'rotateX', { duration: 0.38, ease: 'power2.out' })
        const tiltSc = gsap.quickTo(card, 'scale', { duration: 0.38, ease: 'power2.out' })
        const onMm = (e: Event) => {
          const ev = e as MouseEvent
          const r = card.getBoundingClientRect()
          tiltY(((ev.clientX - r.left) / r.width - 0.5) * 10)
          tiltX(-((ev.clientY - r.top) / r.height - 0.5) * 7)
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
    if (finePtr) {
      const magBtns = qsa('.btn-p,.btn-g,.btn-l,.island-cta')
      const magCleanups: (() => void)[] = []
      magBtns.forEach((btn) => {
        const moveX = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' })
        const moveY = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' })
        const onMm = (e: Event) => {
          const ev = e as MouseEvent
          const r = btn.getBoundingClientRect()
          moveX((ev.clientX - r.left - r.width / 2) * 0.3)
          moveY((ev.clientY - r.top - r.height / 2) * 0.3)
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
    }

    ScrollTrigger.refresh()
  }, [rootRef])

  return null
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rootRef} className="landing-v3">
      <HomeGsapEffects rootRef={rootRef} />

      <div className="noise" />
      <div className="bg-layer">
        <div className="bg-grid" id="bgGrid" />
        <div className="bg-grid-fine" id="bgGridFine" aria-hidden />
        <div className="bg-h-lines" id="bgLines" aria-hidden>
          <div className="bg-h-lines-track" id="bgLinesTrack" />
        </div>
        <div className="bg-v-lines" id="bgVLines" aria-hidden>
          <div className="bg-v-lines-track" id="bgVLinesTrack" />
        </div>
        <div className="orb o1" id="o1" />
        <div className="orb o2" id="o2" />
        <div className="orb o3" id="o3" />
      </div>

      <div id="island-zone" className="island-zone">
        <div id="island-trigger" aria-hidden />
        <nav id="island-nav" aria-label="Primary">
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
          <div className="island-expanded">
            <span className="island-logo">
              <span className="v">Vok</span>Dev
            </span>
            <div className="island-links">
              <Link href="/about" className="island-link">
                About
              </Link>
              <Link href="/projects" className="island-link">
                Projects
              </Link>
              <Link href="/community" className="island-link">
                Community
              </Link>
              <Link href="/blog" className="island-link">
                Blog
              </Link>
              <Link href="/contact" className="island-link">
                Contact
              </Link>
              <a
                href="https://discord.com"
                className="island-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>
              <a
                href="https://github.com"
                className="island-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <Link href="/community" className="island-cta">
              Join Free
            </Link>
          </div>
        </nav>
      </div>

      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <div className="divider gsap-divider" />
        <HorizontalScrollSection />
        <div className="divider gsap-divider" />
        <FeaturedProjectsSection />
        <div className="divider gsap-divider" />
        <CTASection />
      </main>

      <footer className="landing-footer">
        <div className="fl">
          <span className="v">Vok</span>Dev{' '}
          <span
            style={{
              fontFamily: 'var(--font-landing-mono), monospace',
              fontSize: '0.55rem',
              color: 'var(--vok-text3)',
              fontWeight: 400,
              letterSpacing: '0.08em',
              marginLeft: '0.4rem',
            }}
          >
            Vision Of Knowledge
          </span>
        </div>
        <nav className="f-links" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/community">Community</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <span className="fc">© 2026 VokDev. Built by the community.</span>
      </footer>
    </div>
  )
}
