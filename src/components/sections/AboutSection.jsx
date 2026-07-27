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
        <Reveal className={styles.intro}>
          <p className="section-kicker">About</p>
          <h2 className="section-heading" id="about-title">
            Full-stack developer focused on secure, scalable business applications.
          </h2>
          <p className="section-copy">
            I work across web interfaces, backend systems, databases and deployment workflows with a
            focus on maintainable software and practical business value.
          </p>
        </Reveal>

        {aboutFields.map(([label, value], index) => {
          const isWorkingPrinciples = label === 'Working principles';
          const isCurrentInterests = label === 'Current interests';
          const fieldClassName = [
            styles.field,
            isWorkingPrinciples ? styles.workingField : '',
            isCurrentInterests ? styles.wideField : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <Reveal
              as="article"
              className={fieldClassName}
              delay={0.08 + index * 0.04}
              key={label}
            >
              <h3>{label}</h3>
              <p>{value}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
