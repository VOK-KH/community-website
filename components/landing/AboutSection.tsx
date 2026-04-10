'use client'

import { aboutPills } from './data'

export function AboutSection() {
  return (
    <section className="z1 about" id="about" data-sec="about">
      <div className="about-grid">
        <div>
          <div className="sec-tag gsap-fade">What is VokDev</div>
          <h2 className="a-h gsap-up">
            A community built on
            <br />
            <span className="hl">Vision. Knowledge.</span>
            <br />
            Real Code.
          </h2>
          <div className="vok-line gsap-fade">
            <span className="L Lc">V</span>
            <span>ision</span>
            <span style={{ margin: '0 0.35rem', color: 'var(--vok-text3)' }}>·</span>
            <span className="L Lo">O</span>
            <span>f</span>
            <span style={{ margin: '0 0.35rem', color: 'var(--vok-text3)' }}>·</span>
            <span className="L Lk">K</span>
            <span>nowledge</span>
          </div>
          <p className="a-body gsap-fade">
            VokDev is where you stop scrolling and start building. A home for indie hackers, open-source
            contributors, and self-taught engineers who believe the best way to learn is to ship.
          </p>
          <p className="a-body gsap-fade">
            No fluff. No corporate speak. Real people, real code, growing together every day.
          </p>
          <div className="pills gsap-fade">
            {aboutPills.map((label) => (
              <span key={label} className="pill">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="a-vis" id="avis">
          <div className="chip chip3">
            <span className="chip-dot" />⚡ 98% uptime
          </div>
          <div className="code-card" id="codeCard">
            <div className="cc-dots">
              <span className="cc-dot" style={{ background: '#ff5f57' }} />
              <span className="cc-dot" style={{ background: '#febc2e' }} />
              <span className="cc-dot" style={{ background: '#28c840' }} />
            </div>
            <div>
              <span className="cc">Vision Of Knowledge</span>
            </div>
            <div>&nbsp;</div>
            <div>
              <span className="ck">const</span> <span className="cf">vokdev</span> = {'{'}
            </div>
            <div>
              &nbsp;&nbsp;name: <span className="cs">&quot;VokDev&quot;</span>,
            </div>
            <div>
              &nbsp;&nbsp;stands<span className="ck">For</span>: [
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="cs">&quot;Vision&quot;</span>,{' '}
              <span className="cs">&quot;Of&quot;</span>, <span className="cs">&quot;Knowledge&quot;</span>
            </div>
            <div>&nbsp;&nbsp;],</div>
            <div>
              &nbsp;&nbsp;members: <span className="cn">4_200</span>,
            </div>
            <div>
              &nbsp;&nbsp;projects: <span className="cn">830</span>,
            </div>
            <div>
              &nbsp;&nbsp;<span className="cf">join</span>: () =&gt; <span className="cs">🚀</span>
            </div>
            <div>{'}'};</div>
          </div>
          <div className="chip chip1">
            <span className="chip-dot" />
            4.2k members
          </div>
          <div className="chip chip2">
            <span className="chip-dot" />
            312 projects / month
          </div>
        </div>
      </div>
    </section>
  )
}
