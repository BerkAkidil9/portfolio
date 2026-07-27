import { journeyGroups, journeyIntro } from '../../data/journey.js';
import { Timeline } from '../ui/Timeline.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './JourneySection.module.css';

export function JourneySection() {
  return (
    <section className={styles.section} id="experience" aria-labelledby="experience-title">
      <div className={`section-shell ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <p className="section-kicker">{journeyIntro.eyebrow}</p>
          <h2 className="section-heading" id="experience-title">
            {journeyIntro.title}
          </h2>
          <p className="section-copy">{journeyIntro.description}</p>
        </Reveal>

        <div className={styles.groups}>
          {journeyGroups.map((group, index) => (
            <Reveal
              className={group.id === 'education' ? styles.educationGroup : styles.experienceGroup}
              delay={0.12 + index * 0.08}
              key={group.id}
            >
              <article className={styles.group} aria-labelledby={`${group.id}-title`}>
                <div className={styles.groupHeader}>
                  <h3 id={`${group.id}-title`}>{group.title}</h3>
                  {group.description && <p>{group.description}</p>}
                </div>
                {group.note && <div className={styles.groupNotice}>{group.note}</div>}
                <Timeline items={group.items} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
