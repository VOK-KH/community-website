'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t px-6 py-7 md:px-16"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: '#060a0f',
        color: '#eef2f7',
      }}
    >
      <div
        className="text-base font-extrabold tracking-tight"
        style={{ fontFamily: 'var(--font-landing-syne), ui-sans-serif, sans-serif' }}
      >
        <span style={{ color: '#00e5ff' }}>Vok</span>Dev{' '}
        <span
          style={{
            fontFamily: 'var(--font-landing-mono), monospace',
            fontSize: '0.55rem',
            color: '#3d4e62',
            fontWeight: 400,
            letterSpacing: '0.08em',
            marginLeft: '0.4rem',
          }}
        >
          Vision Of Knowledge
        </span>
      </div>
      <nav className="flex flex-wrap gap-6" aria-label="Footer">
        <Link href="/about" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          About
        </Link>
        <Link href="/projects" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          Projects
        </Link>
        <Link href="/community" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          Community
        </Link>
        <Link href="/blog" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          Blog
        </Link>
        <Link href="/contact" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          Contact
        </Link>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors hover:text-[#eef2f7]"
          style={{ color: '#3d4e62' }}
        >
          Discord
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors hover:text-[#eef2f7]"
          style={{ color: '#3d4e62' }}
        >
          GitHub
        </a>
        <Link href="/privacy" className="text-xs transition-colors hover:text-[#eef2f7]" style={{ color: '#3d4e62' }}>
          Privacy
        </Link>
      </nav>
      <span
        className="text-[0.6rem] tracking-wide"
        style={{ fontFamily: 'var(--font-landing-mono), monospace', color: '#3d4e62' }}
      >
        © {new Date().getFullYear()} VokDev. Built by the community.
      </span>
    </footer>
  )
}
