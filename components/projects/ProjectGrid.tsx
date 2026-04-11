import type { Project } from './data'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects?: Project[] | null
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const list = projects ?? []
  return (
    <section className="pg-sec proj-grid-section" aria-labelledby="grid-heading">
      <div className="pg-sec-inner">
        <div className="pg-sec-hd proj-grid-section__hd">
          <h2 id="grid-heading">All projects</h2>
          <p>
            <span className="text-muted-foreground"> open-source repos in the directory.</span>
          </p>
        </div>
        <ul
          className="proj-grid-list grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {list.map((project) => (
            <li key={project.id} className="min-h-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
