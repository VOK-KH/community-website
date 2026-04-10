'use client'

import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Github, Mail } from 'lucide-react'
import gsap from 'gsap'

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  )
}

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
]

const ICON_LINKS = [
  { href: '/contact', label: 'Contact', icon: Mail, external: false },
  { href: 'https://discord.com', label: 'Discord', icon: DiscordIcon, external: true },
  { href: 'https://github.com', label: 'GitHub', icon: Github, external: true },
] as const

export default function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const [expanded, setExpanded] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (expanded) setExpanded(false)
  }

  const collapse = useCallback(() => {
    const el = navRef.current
    if (!el) return
    setExpanded(false)
    gsap.killTweensOf(el)
    el.classList.remove('nb-exp')
    gsap.to(el, {
      width: window.innerWidth < 520 ? 180 : 'auto',
      height: 46,
      borderRadius: 100,
      duration: 0.45,
      ease: 'expo.inOut',
    })
  }, [])

  const expand = useCallback(() => {
    const el = navRef.current
    if (!el) return
    setExpanded(true)
    gsap.killTweensOf(el)
    el.classList.add('nb-exp')
    const w = Math.min(window.innerWidth - 32, 420)
    gsap.to(el, {
      width: w,
      height: 'auto',
      borderRadius: 22,
      duration: 0.5,
      ease: 'back.out(1.4)',
    })
  }, [])

  const toggle = useCallback(() => {
    if (expanded) collapse()
    else expand()
  }, [expanded, collapse, expand])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') collapse() }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) collapse()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [expanded, collapse])

  useLayoutEffect(() => {
    if (isLanding) return
    const el = navRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', delay: 0.1 },
    )
  }, [isLanding])

  useLayoutEffect(() => {
    if (isLanding) return
    const el = navRef.current
    if (!el) return

    let lastScrollY = 0
    let hidden = false
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const goingDown = scrollY > lastScrollY + 4
        const goingUp = scrollY < lastScrollY - 4

        if (goingDown && scrollY > 140 && !hidden) {
          hidden = true
          if (expanded) collapse()
          gsap.to(el, { y: -90, duration: 0.4, ease: 'power3.in' })
        } else if (goingUp && hidden) {
          hidden = false
          gsap.to(el, { y: 0, duration: 0.65, ease: 'back.out(1.4)' })
        }

        lastScrollY = scrollY
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isLanding, expanded, collapse])

  if (isLanding) return null

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="nb-zone">
      <nav ref={navRef} className="nb" style={{ opacity: 0 }} aria-label="Primary">
        {/* ── Collapsed pill content ── */}
        <div className="nb-pill">
          <Link href="/" className="nb-logo">
            <span className="nb-v">Vok</span>Dev
          </Link>

          <div className="nb-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nb-link${isActive(link.href) ? ' nb-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nb-icons">
            {ICON_LINKS.map((link) => {
              const Icon = link.icon
              const cls = `nb-icon-btn${isActive(link.href) ? ' nb-active' : ''}`
              if (link.external) {
                return (
                  <a key={link.href} href={link.href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={link.label} title={link.label}>
                    <Icon className="h-4 w-4" />
                  </a>
                )
              }
              return (
                <Link key={link.href} href={link.href} className={cls} aria-label={link.label} title={link.label}>
                  <Icon className="h-4 w-4" />
                </Link>
              )
            })}
            <span className="nb-sep" aria-hidden />
          </div>

          <Link href="/community" className="nb-cta">
            Join Free
          </Link>

          <button
            onClick={toggle}
            className="nb-burger"
            aria-label={expanded ? 'Close menu' : 'Open menu'}
            aria-expanded={expanded}
          >
            {expanded ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* ── Expanded island content ── */}
        <div className="nb-expanded">
          <div className="nb-exp-top">
            <Link href="/" className="nb-logo" onClick={collapse}>
              <span className="nb-v">Vok</span>Dev
            </Link>
            <button onClick={collapse} className="nb-exp-close" aria-label="Close menu">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="nb-exp-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nb-exp-link${isActive(link.href) ? ' nb-active' : ''}`}
                onClick={collapse}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nb-exp-divider" aria-hidden />

          <div className="nb-exp-icons">
            {ICON_LINKS.map((link) => {
              const Icon = link.icon
              const cls = `nb-exp-icon-link${isActive(link.href) ? ' nb-active' : ''}`
              if (link.external) {
                return (
                  <a key={link.href} href={link.href} className={cls} target="_blank" rel="noopener noreferrer" onClick={collapse}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                )
              }
              return (
                <Link key={link.href} href={link.href} className={cls} onClick={collapse}>
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          <Link href="/community" className="nb-exp-cta" onClick={collapse}>
            Join Free
          </Link>
        </div>
      </nav>
    </div>
  )
}
