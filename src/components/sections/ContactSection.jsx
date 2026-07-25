import { contact } from '../../data/portfolio.js';
import { socialLinks } from '../../data/socialLinks.js';
import { ActionLink } from '../ui/ActionLink.jsx';
import styles from './ContactSection.module.css';

export function ContactSection() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="contact-title">
      <div className={`section-shell ${styles.grid}`}>
        <div>
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
        </div>

        <form className={styles.form} aria-describedby="form-notice">
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
        </form>
      </div>
    </section>
  );
}
