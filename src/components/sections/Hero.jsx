import { lazy, Suspense } from 'react';
import { hero } from '../../data/portfolio.js';
import { ActionLink } from '../ui/ActionLink.jsx';
import { SceneFallback } from '../../experience/SceneFallback.jsx';
import styles from './Hero.module.css';

const Experience = lazy(() =>
  import('../../experience/Experience.jsx').then((module) => ({ default: module.Experience })),
);

export function Hero() {
  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={`section-shell ${styles.heroGrid}`}>
        <div className={styles.content}>
          <p className="section-kicker">Professional portfolio</p>
          <p className={styles.name}>{hero.name}</p>
          <h1 id="hero-title">{hero.role}</h1>
          <p className={styles.intro}>{hero.introduction}</p>
          <div className={styles.actions}>
            <ActionLink href={hero.primaryAction.href}>{hero.primaryAction.label}</ActionLink>
            <ActionLink href={hero.secondaryAction.href} variant="secondary">
              {hero.secondaryAction.label}
            </ActionLink>
          </div>
        </div>

        <div className={styles.visual} aria-label="Original abstract space scene">
          <Suspense fallback={<SceneFallback />}>
            <Experience />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
