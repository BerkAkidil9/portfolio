import { contact, hero, navigationItems } from '../../data/portfolio.js';
import { socialLinks } from '../../data/socialLinks.js';
import styles from './Footer.module.css';

const connectIcons = {
  email: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M4.8 6.8h14.4v10.4H4.8z" />
      <path d="m5.2 7.4 6.8 5 6.8-5" />
    </svg>
  ),
  github: (
    <svg className={styles.brandIcon} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.39-3.9-1.39-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.3-5.27-1.29-5.27-5.72 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.48.11-3.07 0 0 .97-.31 3.18 1.19A11.05 11.05 0 0 1 12 6.04c.98 0 1.96.13 2.88.4 2.2-1.5 3.17-1.19 3.17-1.19.64 1.59.24 2.78.12 3.07.74.81 1.19 1.85 1.19 3.11 0 4.45-2.71 5.42-5.29 5.71.42.36.79 1.07.79 2.16v3.04c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg className={styles.brandIcon} viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  ),
  cv: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M7.2 4.8h7.4l3.2 3.2v11.2H7.2z" />
      <path d="M14.6 4.8V8h3.2" />
      <path d="M9.6 12h4.8" />
      <path d="M9.6 15h3.4" />
    </svg>
  ),
};

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = navigationItems;
  const connectLinks = [
    { id: 'email', label: contact.email, href: `mailto:${contact.email}`, prefix: 'mail' },
    ...socialLinks.map((link) => ({ ...link, href: link.url, prefix: link.id })),
  ].filter((link) => link.href);
  const opensInNewTab = (href, id) => href.startsWith('http') || id === 'cv';

  return (
    <footer className={styles.footer}>
      <div className={`section-shell ${styles.inner}`}>
        <div className={styles.profile}>
          <p className={styles.name}>{hero.name}</p>
          <p className={styles.copy}>
            Software engineer and full-stack developer focused on secure, scalable and
            business-oriented web applications.
          </p>
        </div>

        <nav className={styles.column} aria-label="Footer quick links">
          <h2>Quick Links</h2>
          <div className={styles.links}>
            {quickLinks.map((item) => (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.column}>
          <h2>Connect</h2>
          <div className={styles.iconLinks} aria-label="Contact links">
            {connectLinks.map((link) => (
              <a
                key={link.id}
                aria-label={link.id === 'email' ? `Email ${link.label}` : link.label}
                href={link.href}
                rel={opensInNewTab(link.href, link.id) ? 'noopener noreferrer' : undefined}
                target={opensInNewTab(link.href, link.id) ? '_blank' : undefined}
                title={link.label}
              >
                {connectIcons[link.id]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`section-shell ${styles.bottom}`}>
        <p>© {year} {hero.name}. Built with React, JavaScript and Three.js.</p>
        <a className={styles.backTop} href="#home">
          Back to top
        </a>
      </div>
    </footer>
  );
}
