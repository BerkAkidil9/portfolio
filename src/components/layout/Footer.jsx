import { hero } from '../../data/portfolio.js';
import { socialLinks } from '../../data/socialLinks.js';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`section-shell ${styles.inner}`}>
        <div>
          <p className={styles.name}>{hero.name}</p>
          <p className={styles.copy}>Full-stack software developer focused on scalable web applications.</p>
        </div>

        <div className={styles.meta}>
          <p>© {year} {hero.name}</p>
          <div className={styles.socials} aria-label="Social links">
            {socialLinks.map((link) =>
              link.url ? (
                <a key={link.id} href={link.url}>
                  {link.label}
                </a>
              ) : (
                <span key={link.id} aria-disabled="true">
                  {link.label} coming soon
                </span>
              ),
            )}
          </div>
          <a className={styles.backTop} href="#home">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
