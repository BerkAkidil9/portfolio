import { about } from '../../data/portfolio.js';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './AboutSection.module.css';

const aboutFields = [
  ['Biography', about.biography],
  ['Development focus', about.focus],
  ['Learning journey', about.learningJourney],
  ['Career objective', about.careerObjective],
  ['Working principles', about.workingPrinciples],
  ['Current interests', about.currentInterests],
];

export function AboutSection() {
  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={`section-shell ${styles.grid}`}>
        <Reveal>
          <p className="section-kicker">About</p>
          <h2 className="section-heading" id="about-title">
            A polished biography layout without fabricated personal claims.
          </h2>
          <p className="section-copy">
            Each content block is ready to be replaced once Berk provides verified biography,
            objectives and working style notes.
          </p>
        </Reveal>

        <Reveal className={styles.panel} delay={0.12}>
          {aboutFields.map(([label, value]) => (
            <article className={styles.field} key={label}>
              <h3>{label}</h3>
              <p>{value}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
