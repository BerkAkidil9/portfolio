import { motion, useReducedMotion } from 'framer-motion';
import { ActionLink } from './ActionLink.jsx';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const visualTheme = project.visualTheme ? styles[project.visualTheme] : '';

  return (
    <motion.article
      className={styles.card}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 38, rotateX: 2 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.64, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -8, rotateX: 1.2, rotateY: -1.2 }}
    >
      <div className={`${styles.media} ${visualTheme}`} aria-label={project.screenshotAlt}>
        {project.screenshot ? (
          <img src={project.screenshot} alt={project.screenshotAlt} />
        ) : (
          <div className={styles.mediaPlaceholder}>
            <span className={styles.visualMark} aria-hidden="true" />
            <span>{project.screenshotAlt}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.status}>{project.status}</span>
          {project.featured && <span className={styles.featured}>Featured</span>}
        </div>

        <h3>{project.name}</h3>
        <p className={styles.summary}>{project.shortDescription}</p>

        <dl className={styles.details}>
          <div>
            <dt>Challenge</dt>
            <dd>{project.mainChallenge}</dd>
          </div>
          <div>
            <dt>Solution</dt>
            <dd>{project.mainSolution}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.developerRole}</dd>
          </div>
        </dl>

        <ul className={styles.features} aria-label={`${project.name} key features`}>
          {project.keyFeatures.map((feature, index) => (
            <li key={`${project.id}-feature-${index}`}>{feature}</li>
          ))}
        </ul>

        <div className={styles.techList} aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology, index) => (
            <span key={`${project.id}-technology-${index}`}>{technology}</span>
          ))}
        </div>

        <div className={styles.actions}>
          <ActionLink href={project.githubUrl} variant="ghost" disabled={!project.githubUrl}>
            GitHub coming soon
          </ActionLink>
          <ActionLink href={project.liveDemoUrl} variant="secondary" disabled={!project.liveDemoUrl}>
            Live demo coming soon
          </ActionLink>
        </div>
      </div>
    </motion.article>
  );
}
