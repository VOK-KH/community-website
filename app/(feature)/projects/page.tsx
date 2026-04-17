'use client'

import Footer from '@/components/Footer'
import { allProjects } from '@/components/projects/data'
import {
  ProjectsHero,
  FeaturedProjects,
  ProjectGrid,
  ProjectsCTA,
} from '@/components/projects'

export default function ProjectsPage() {
  return (
    <div className="pg">
      <main>
        <ProjectsHero />
        <FeaturedProjects />
        <ProjectGrid projects={allProjects} />
        <ProjectsCTA />
      </main>
      <Footer />
    </div>
  )
}
