import styles from './ActionLink.module.css';

export function ActionLink({ href, children, variant = 'primary', disabled = false, ariaLabel }) {
  if (disabled || !href) {
    return (
      <span className={`${styles.action} ${styles[variant]} ${styles.disabled}`} aria-disabled="true">
        {children}
      </span>
    );
  }

  const opensInNewTab = href.startsWith('http') || href.endsWith('.pdf');

  return (
    <a
      className={`${styles.action} ${styles[variant]}`}
      href={href}
      aria-label={ariaLabel}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      target={opensInNewTab ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
