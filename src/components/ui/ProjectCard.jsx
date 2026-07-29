import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ActionLink } from './ActionLink.jsx';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const visualTheme = project.visualTheme ? styles[project.visualTheme] : '';
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <>
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
            <button
              className={styles.mediaButton}
              type="button"
              aria-label={`View larger screenshot for ${project.name}`}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img src={project.screenshot} alt={project.screenshotAlt} />
              <span className={styles.zoomHint}>View larger</span>
            </button>
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
            {project.featured && <span className={styles.featured}>Featured Project</span>}
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

          <div className={styles.skillList} aria-label={`${project.name} skills`}>
            {project.skills.map((skill, index) => (
              <span key={`${project.id}-skill-${index}`}>{skill}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <ActionLink href={project.githubUrl} variant="ghost" disabled={!project.githubUrl}>
              {project.githubUrl ? 'GitHub' : 'GitHub coming soon'}
            </ActionLink>
            {project.liveDemoUrl && (
              <ActionLink href={project.liveDemoUrl} variant="secondary">
                Live demo
              </ActionLink>
            )}
          </div>
        </div>
      </motion.article>

      {isLightboxOpen &&
        createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} screenshot preview`}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className={styles.lightboxPanel} onClick={(event) => event.stopPropagation()}>
              <div className={styles.lightboxHeader}>
                <div>
                  <p>Project Screenshot</p>
                  <h3>{project.name}</h3>
                </div>
                <button
                  className={styles.closeButton}
                  type="button"
                  aria-label="Close screenshot preview"
                  onClick={() => setIsLightboxOpen(false)}
                >
                  X
                </button>
              </div>
              <img src={project.screenshot} alt={project.screenshotAlt} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
