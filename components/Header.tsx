'use client'

import Link from 'next/link'
import { useState } from 'react'
import VokDevButton from './VokDevButton'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/community', label: 'Community' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 max-w-7xl mx-auto px-4 items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary hover:scale-105 transition-transform"
        >
          <span className="text-2xl">⚡</span>
          VokDev
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors rounded-md hover:bg-accent/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-2">
          <VokDevButton variant="ghost" size="sm">
            Sign In
          </VokDevButton>
          <VokDevButton variant="primary" size="sm">
            Join Community
          </VokDevButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent/10 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <VokDevButton variant="ghost" size="sm" className="w-full justify-center">
                Sign In
              </VokDevButton>
              <VokDevButton variant="primary" size="sm" className="w-full justify-center">
                Join Community
              </VokDevButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
