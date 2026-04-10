'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VokDevButton } from './VokDevButton'

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef   = useRef<HTMLElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLAnchorElement>(null)
  const dotRef      = useRef<HTMLSpanElement>(null)
  const mobileRef   = useRef<HTMLDivElement>(null)

  /* ── ENTRANCE: staggered bounce ── */
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    // 1. Header bar bounces down from above
    gsap.fromTo(el,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'back.out(1.5)', delay: 0.05 },
    )

    // 2. Logo shoots in from the left
    const logo = logoRef.current
    if (logo) {
      gsap.fromTo(logo,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(2.2)', delay: 0.22 },
      )
    }

    // 3. Nav links cascade down with bounce
    const navItems = el.querySelectorAll('[data-header-nav] a')
    if (navItems.length) {
      gsap.fromTo(navItems,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)', stagger: 0.055, delay: 0.28 },
      )
    }

    // 4. Action buttons slide in from the right
    const actionBtns = el.querySelectorAll('[data-header-actions] > *')
    if (actionBtns.length) {
      gsap.fromTo(actionBtns,
        { x: 18, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.07, delay: 0.32 },
      )
    }
  }, [])

  /* ── SCROLL: hide on down, bounce back on up ── */
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return

    let lastScrollY = 0
    let hidden = false
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY    = window.scrollY
          const scrolled   = scrollY > 40
          const goingDown  = scrollY > lastScrollY + 4
          const goingUp    = scrollY < lastScrollY - 4

          el.dataset.scrolled = scrolled ? '1' : '0'

          if (goingDown && scrollY > 140 && !hidden) {
            hidden = true
            gsap.to(el, { y: -90, duration: 0.4, ease: 'power3.in' })
          } else if (goingUp && hidden) {
            hidden = false
            // back.out creates the bounce-back effect when header re-appears
            gsap.to(el, { y: 0, duration: 0.65, ease: 'back.out(1.4)' })
          }

          lastScrollY = scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── MOUSE GLOW ── */
  useEffect(() => {
    const el    = headerRef.current
    const glow  = glowRef.current
    if (!el || !glow) return

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      glow.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`)
      glow.style.setProperty('--gy', `${((e.clientY - r.top)  / r.height) * 100}%`)
      gsap.to(glow, { opacity: 1, duration: 0.5, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(glow, { opacity: 0, duration: 0.4 })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── LOGO DOT: magnetic bounce on hover ── */
  useEffect(() => {
    const dot  = dotRef.current
    const logo = logoRef.current
    if (!dot || !logo) return

    const onEnter = () =>
      gsap.to(dot, { scale: 2, boxShadow: '0 0 14px 4px currentColor', duration: 0.32, ease: 'back.out(2.5)' })
    const onLeave = () =>
      gsap.to(dot, { scale: 1, boxShadow: '0 0 0px 0px currentColor', duration: 0.4, ease: 'expo.out' })

    logo.addEventListener('mouseenter', onEnter)
    logo.addEventListener('mouseleave', onLeave)
    return () => {
      logo.removeEventListener('mouseenter', onEnter)
      logo.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── MOBILE MENU: slide toggle ── */
  useEffect(() => {
    const menu = mobileRef.current
    if (!menu) return
    if (mobileOpen) {
      gsap.fromTo(menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.38, ease: 'expo.out' },
      )
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.26, ease: 'power3.in' })
    }
  }, [mobileOpen])

  return (
    <header
      ref={headerRef}
      className="header-vok sticky top-0 z-50 w-full will-change-transform"
      data-scrolled="0"
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: 'radial-gradient(220px circle at var(--gx,50%) var(--gy,50%), hsl(var(--primary)/0.12), transparent 70%)',
        } as React.CSSProperties}
        aria-hidden
      />

      <div className="header-inner mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          ref={logoRef}
          href="/"
          className="group relative flex items-center gap-2.5 select-none"
          style={{ opacity: 0 }} /* GSAP entrance sets it to 1 */
        >
          <span
            ref={dotRef}
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
            style={{ color: 'hsl(var(--primary))' }}
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Vok<span className="text-primary">Dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav data-header-nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <NavLink key={link.href} href={link.href} active={active}>
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div data-header-actions className="hidden items-center gap-2 md:flex">
          <VokDevButton variant="ghost" size="sm" withGlow={false}>
            Sign In
          </VokDevButton>
          <VokDevButton variant="primary" size="sm">
            Join Community
          </VokDevButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-md p-2 text-foreground/70 transition-colors hover:bg-accent/10 hover:text-foreground md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div ref={mobileRef} className="overflow-hidden md:hidden" style={{ height: 0, opacity: 0 }}>
        <nav className="border-t border-border/40 bg-card/95 backdrop-blur-xl px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:bg-accent/10 hover:text-foreground'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-border/40 pt-3">
            <VokDevButton variant="ghost" size="sm" withGlow={false} className="w-full justify-center">
              Sign In
            </VokDevButton>
            <VokDevButton variant="primary" size="sm" className="w-full justify-center">
              Join Community
            </VokDevButton>
          </div>
        </nav>
      </div>
    </header>
  )
}

/* ── per-link: bounce-lift + underline slide ── */
function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  const ref     = useRef<HTMLAnchorElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el   = ref.current
    const line = lineRef.current
    if (!el || !line) return

    const onEnter = () => {
      // bounce-lift: jumps up 3 px with spring overshoot
      gsap.to(el, { y: -3, duration: 0.22, ease: 'back.out(3)' })
      if (!active) {
        gsap.to(line, { scaleX: 1, duration: 0.26, ease: 'power2.out', transformOrigin: 'left' })
      }
    }
    const onLeave = () => {
      // settles back down with a tiny bounce
      gsap.to(el, { y: 0, duration: 0.38, ease: 'back.out(2.5)' })
      if (!active) {
        gsap.to(line, { scaleX: 0, duration: 0.2, ease: 'power2.in', transformOrigin: 'right' })
      }
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [active])

  return (
    <Link
      ref={ref}
      href={href}
      className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
        active ? 'text-primary' : 'text-foreground/65 hover:text-foreground'
      }`}
      style={{ display: 'inline-block' }} /* needed for translateY to work */
    >
      {children}
      <span
        ref={lineRef}
        className="absolute bottom-1 left-3.5 right-3.5 h-px rounded-full bg-primary"
        style={{
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
        }}
        aria-hidden
      />
    </Link>
  )
}
