import { projects } from '../../data/projects.js';
import { ProjectCard } from '../ui/ProjectCard.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <Reveal>
          <p className="section-kicker">Featured work</p>
          <h2 className="section-heading" id="projects-title">
            Business-focused systems built across frontend, backend and deployment workflows.
          </h2>
          <p className="section-copy">
            Featured projects emphasize role-based access, operational workflows, relational data
            models, integrations and production deployment.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
