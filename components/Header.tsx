'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VokDevButton } from './VokDevButton'

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
          className="flex items-center gap-2 font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary"
        >
          <motion.span 
            className="text-2xl inline-block"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            ⚡
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            VokDev
          </motion.span>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden border-t border-border bg-card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent/10 rounded-md transition-colors block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div 
                className="flex flex-col gap-2 pt-2 border-t border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <VokDevButton variant="ghost" size="sm" className="w-full justify-center">
                  Sign In
                </VokDevButton>
                <VokDevButton variant="primary" size="sm" className="w-full justify-center">
                  Join Community
                </VokDevButton>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
