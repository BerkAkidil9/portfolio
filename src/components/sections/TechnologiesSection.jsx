import { skillCategories } from '../../data/skills.js';
import styles from './TechnologiesSection.module.css';

export function TechnologiesSection() {
  return (
    <section className={styles.section} id="technologies" aria-labelledby="technologies-title">
      <div className="section-shell">
        <p className="section-kicker">Technical map</p>
        <h2 className="section-heading" id="technologies-title">
          A categorized technology area prepared for source-backed skills.
        </h2>
        <p className="section-copy">
          No skill percentages or unsupported seniority labels are used. Verified technologies can
          be connected to projects later.
        </p>

        <div className={styles.grid}>
          {skillCategories.map((category) => (
            <article className={styles.category} key={category.id}>
              <h3>{category.label}</h3>
              <p>{category.description}</p>
              <div className={styles.badges}>
                {category.items.map((item, index) => (
                  <span key={`${category.id}-${index}`}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
