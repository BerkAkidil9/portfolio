import { journeyIntro, journeyItems } from '../../data/journey.js';
import { Timeline } from '../ui/Timeline.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './JourneySection.module.css';

export function JourneySection() {
  return (
    <section className={styles.section} aria-labelledby="journey-title">
      <div className={`section-shell ${styles.grid}`}>
        <Reveal>
          <p className="section-kicker">{journeyIntro.eyebrow}</p>
          <h2 className="section-heading" id="journey-title">
            {journeyIntro.title}
          </h2>
          <p className="section-copy">{journeyIntro.description}</p>
          <div className={styles.emptyState}>
            Verified work, education or certificate details have not been supplied yet.
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <Timeline items={journeyItems} />
        </Reveal>
      </div>
    </section>
  );
}
