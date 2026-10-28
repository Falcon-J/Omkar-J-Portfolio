import { ProjectWall } from "@/components/portfolio/project-wall";
import { Treat } from "@/components/portfolio/companion";
export function ProjectsSection() {
  return (
    <section tabIndex={-1} id="projects" data-chapter="projects" aria-labelledby="projects-heading" className="chapter projects-chapter">
      <header className="chapter-heading">
        <h2 id="projects-heading" className="accent-heading">
          Selected work.
        </h2>
      </header>
      <ProjectWall />
      <div className="chapter-treat">
        <Treat id="projects" />
      </div>
    </section>
  );
}
