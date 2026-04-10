'use client'

import { useRef } from 'react'
import Link from 'next/link'
import './landing-v3.css'
import { LandingGsap } from './LandingGsap'
import { HeroSection } from './HeroSection'
import { MarqueeStrip } from './MarqueeStrip'
import { AboutSection } from './AboutSection'
import { FeaturedProjectsSection } from './FeaturedProjectsSection'
import { CTASection } from './CTASection'
import { HorizontalScrollSection } from './HorizontalScrollSection'

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rootRef} className="landing-v3" data-section="hero">
      <LandingGsap rootRef={rootRef} />

      {/* Cursor — label is a child of ring so it follows the lagged ring automatically */}
      <div id="cur" aria-hidden="true">
        <div className="cur-ring">
          <div className="cur-label">Join</div>
        </div>
        <div className="cur-dot" />
      </div>

      <div className="noise" />
      <div className="bg-layer">
        <div className="bg-grid" id="bgGrid" />
        <div className="orb o1" id="o1" />
        <div className="orb o2" id="o2" />
        <div className="orb o3" id="o3" />
      </div>

      <div id="island-trigger" aria-hidden />
      <nav id="island-nav" aria-label="Primary">
        <div className="island-pill">
          <span className="pill-logo">
            <span className="v">Vok</span>Dev
          </span>
          <span className="pill-dot" />
          <span className="pill-live" />
          <span className="pill-status">4.2k members</span>
        </div>
        <div className="island-expanded">
          <span className="island-logo">
            <span className="v">Vok</span>Dev
          </span>
          <div className="island-links">
            <Link href="#about" className="island-link active">
              About
            </Link>
            <Link href="#projects" className="island-link">
              Projects
            </Link>
            <Link href="#community" className="island-link">
              Community
            </Link>
            <Link href="/blog" className="island-link">
              Blog
            </Link>
          </div>
          <Link href="/community" className="island-cta">
            Join Free
          </Link>
        </div>
      </nav>

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
          <Link href="/blog">Blog</Link>
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
