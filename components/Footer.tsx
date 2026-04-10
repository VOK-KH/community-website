'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="pg-footer">
      <div className="pg-footer-brand">
        <span className="pg-footer-logo">
          <span className="pg-footer-v">Vok</span>Dev
        </span>
        <span className="pg-footer-tagline">Vision Of Knowledge</span>
      </div>
      <nav className="pg-footer-links" aria-label="Footer">
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
      <span className="pg-footer-copy">
        © {new Date().getFullYear()} VokDev. Built by the community.
      </span>
    </footer>
  )
}
