'use client'

import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="hero" id="hero" data-sec="hero">
      <div className="hero-badge" id="hbadge">
        <span className="badge-live" aria-hidden />
        <span className="badge-text">Open Developer Community</span>
      </div>
      <h1 className="hero-h1">
        <span className="h1-line">
          <span className="h1-word">Build.</span>
          <span className="h1-word ac">Share.</span>
        </span>
        <span className="h1-line">
          <span className="h1-word">Grow.</span>
        </span>
      </h1>
      <div className="hero-subtitle" id="hsubt">
        <span className="st-word">Vision</span>
        <span className="st-dot" aria-hidden>
          •
        </span>
        <span className="st-word">Of</span>
        <span className="st-dot" aria-hidden>
          •
        </span>
        <span className="st-word">Knowledge</span>
      </div>
      <p className="vok-def" id="hvok">
        <span className="vc">V</span>ision &nbsp;<span className="vo">O</span>f &nbsp;
        <span className="vk">K</span>nowledge — where developers build what matters
      </p>
      <p className="hero-desc" id="hdesc">
        VokDev is the open community for developers who ship real projects, learn in public, and grow
        alongside people who genuinely get it.
      </p>
      <div className="hero-ctas" id="hctas">
        <Link href="/projects" className="btn-p">
          Start Building
        </Link>
        <Link href="/projects" className="btn-g">
          Explore Projects
        </Link>
      </div>
      <div className="hero-stats" id="hstats">
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-accent)' }}>
            <span data-count="4200">0</span>+
          </span>
          <span className="s-lbl">Members</span>
        </div>
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-violet)' }}>
            <span data-count="830">0</span>+
          </span>
          <span className="s-lbl">Projects</span>
        </div>
        <div className="stat-item">
          <span className="s-num" style={{ color: 'var(--vok-emerald)' }}>
            <span data-count="12000">0</span>+
          </span>
          <span className="s-lbl">Commits</span>
        </div>
      </div>
      <div className="scroll-ind" id="scind">
        <span>Scroll</span>
        <div className="s-line" />
      </div>
    </section>
  )
}
