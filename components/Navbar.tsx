'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const EXT_LINKS = [
  { href: 'https://discord.com', label: 'Discord' },
  { href: 'https://github.com', label: 'GitHub' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isLanding = pathname === '/'
  const [mobileOpen, setMobileOpen] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (mobileOpen) setMobileOpen(false)
  }

  useLayoutEffect(() => {
    if (isLanding) return
    const el = barRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.6)', delay: 0.1 },
    )
  }, [isLanding])

  useLayoutEffect(() => {
    if (isLanding) return
    const el = barRef.current
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
  }, [isLanding])

  useEffect(() => {
    if (isLanding) return
    const menu = mobileRef.current
    if (!menu) return
    if (mobileOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.35, ease: 'expo.out' },
      )
    } else {
      gsap.to(menu, { height: 0, opacity: 0, duration: 0.22, ease: 'power3.in' })
    }
  }, [mobileOpen, isLanding])

  if (isLanding) return null

  return (
    <div className="nb-zone">
      <nav ref={barRef} className="nb" style={{ opacity: 0 }} aria-label="Primary">
        <Link href="/" className="nb-logo">
          <span className="nb-v">Vok</span>Dev
        </Link>

        <div className="nb-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nb-link${pathname === link.href || pathname.startsWith(link.href + '/') ? ' nb-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {EXT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nb-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <Link href="/community" className="nb-cta">
          Join Free
        </Link>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="nb-burger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <div ref={mobileRef} className="nb-mobile" style={{ height: 0, opacity: 0 }}>
        <div className="nb-mobile-inner">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nb-mobile-link${pathname === link.href ? ' nb-active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {EXT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nb-mobile-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/community"
            className="nb-cta nb-cta-mobile"
            onClick={() => setMobileOpen(false)}
          >
            Join Free
          </Link>
        </div>
      </div>
    </div>
  )
}
