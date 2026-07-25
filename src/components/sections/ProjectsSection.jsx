import { projects } from '../../data/projects.js';
import { ProjectCard } from '../ui/ProjectCard.jsx';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <div className="section-shell">
        <p className="section-kicker">Featured work</p>
        <h2 className="section-heading" id="projects-title">
          Project cards are ready for verified repositories, screenshots and live demos.
        </h2>
        <p className="section-copy">
          Placeholder entries keep the portfolio structure complete without inventing project
          history, results or links.
        </p>

        <div className={styles.grid}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
