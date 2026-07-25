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
            Contact paths are prepared, but final links are still placeholders.
          </h2>
          <p className="section-copy">{contact.message}</p>

          <div className={styles.links}>
            <ActionLink disabled={!contact.email} variant="secondary">
              {contact.email}
            </ActionLink>
            {socialLinks.map((link) => (
              <ActionLink key={link.id} href={link.url} disabled={!link.url} variant="ghost">
                {link.label} coming soon
              </ActionLink>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.form} as="form" delay={0.12} viewportAmount={0.16}>
          <div className={styles.formRow}>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" placeholder="[PLACEHOLDER: Sender name]" />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" placeholder="[PLACEHOLDER: Sender email]" />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              placeholder="[PLACEHOLDER: Contact form message]"
            />
          </div>
          <p className={styles.notice} id="form-notice">
            {contact.formNotice}
          </p>
          <button className={styles.submit} type="button" disabled>
            Sending not configured
          </button>
        </Reveal>
      </div>
    </section>
  );
}
