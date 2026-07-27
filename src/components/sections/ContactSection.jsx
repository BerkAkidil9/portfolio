import { contact } from '../../data/portfolio.js';
import { socialLinks } from '../../data/socialLinks.js';
import { ActionLink } from '../ui/ActionLink.jsx';
import { PingPongVideo } from '../ui/PingPongVideo.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './ContactSection.module.css';

export function ContactSection() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={styles.blackHole} aria-hidden="true">
        <span className={styles.blackHoleFallback} />
        <PingPongVideo
          className={styles.blackHoleVideo}
          endTrimSeconds={4.1}
          reverseSpeed={0.82}
          src="/videos/contact-black-hole.mp4"
          startTrimSeconds={0.25}
          type="video/mp4"
        />
      </div>
      <div className={`section-shell ${styles.grid}`}>
        <Reveal>
          <p className="section-kicker">Contact</p>
          <h2 className="section-heading" id="contact-title">
            Open to software engineering opportunities and project conversations.
          </h2>
          <p className="section-copy">{contact.message}</p>

          <div className={styles.links}>
            <ActionLink href={`mailto:${contact.email}`} disabled={!contact.email} variant="secondary">
              {contact.email}
            </ActionLink>
            {socialLinks.map((link) => (
              <ActionLink key={link.id} href={link.url} disabled={!link.url} variant="ghost">
                {link.url ? link.label : `${link.label} coming soon`}
              </ActionLink>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
