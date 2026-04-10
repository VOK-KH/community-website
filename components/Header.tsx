'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { VokDevButton } from './VokDevButton'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/community', label: 'Community' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-border/80 bg-background/90 shadow-sm backdrop-blur-xl'
          : 'border-border/40 bg-background/70 backdrop-blur'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary transition-transform group-hover:scale-125" />
          <span className="text-xl font-bold text-foreground">
            VokDev
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-primary/12 text-primary'
                  : 'text-foreground/70 hover:bg-accent/10 hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden gap-2 md:flex">
          <ThemeToggle />
          <VokDevButton variant="ghost" size="sm" withGlow={false}>
            Sign In
          </VokDevButton>
          <VokDevButton variant="primary" size="sm" withGlow={false}>
            Join Community
          </VokDevButton>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 transition-colors hover:bg-muted md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="animate-slide-in border-t border-border bg-card md:hidden">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-primary/12 text-primary'
                    : 'text-foreground/70 hover:bg-accent/10 hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <ThemeToggle />
              <VokDevButton variant="ghost" size="sm" withGlow={false} className="w-full justify-center">
                Sign In
              </VokDevButton>
              <VokDevButton variant="primary" size="sm" withGlow={false} className="w-full justify-center">
                Join Community
              </VokDevButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
