'use client'

import Link from 'next/link'
import { featuredProjects } from './data'

export function FeaturedProjectsSection() {
  return (
    <section className="z1 projects" id="projects" data-sec="projects">
      <div className="proj-header">
        <div>
          <div className="sec-tag gsap-fade">Featured Projects</div>
          <h2 className="proj-title gsap-up">
            What the community
            <br />
            is building
          </h2>
        </div>
        <Link href="/projects" className="va gsap-fade">
          View all →
        </Link>
      </div>
      <div className="grid12">
        {featuredProjects.map((p) => (
          <div key={p.id} className={`pc ${p.cardClass} ${p.colClass} gsap-card`}>
            <div className="pt">
              <div className={`pi ${p.iconClass}`}>{p.emoji}</div>
              <div className="pst">
                <span className="star">★</span> {p.stars}
              </div>
            </div>
            <div className="pn">{p.title}</div>
            <p className="pd">{p.description}</p>
            <div className="pf">
              <div className="ptags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pau">
                <div className={`av ${p.author.av}`}>{p.author.initials}</div>
                <span>{p.author.handle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
