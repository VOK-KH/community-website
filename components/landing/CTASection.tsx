'use client'

import Link from 'next/link'

export function CTASection() {
  return (
    <section className="cta-sec" id="community" data-sec="cta">
      <div className="cta-glow" />
      <div className="cta-wrap">
        <div className="cta-tag gsap-fade">✦ Join the community</div>
        <h2 className="cta-h gsap-up">
          Ready to build
          <br />
          <span className="gr">something real?</span>
        </h2>
        <p className="cta-body gsap-fade">
          Join thousands of developers sharing what they build, learning in public, and making things worth
          making — under the banner of Vision Of Knowledge.
        </p>
        <div className="cta-btns gsap-fade">
          <Link href="/community" className="btn-l p">
            Join VokDev Free →
          </Link>
          <Link href="/projects" className="btn-l o">
            Browse Projects
          </Link>
        </div>
        <div className="sp gsap-fade">
          <div className="sp-avs">
            <div className="sp-av av-c">AK</div>
            <div className="sp-av av-v">MJ</div>
            <div className="sp-av av-e">SR</div>
            <div className="sp-av av-a">TK</div>
            <div className="sp-av av-p">LC</div>
          </div>
          <span className="sp-txt">
            Joined by <strong>4,200+ developers</strong> this year
          </span>
        </div>
      </div>
    </section>
  )
}
