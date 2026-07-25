import styles from './ActionLink.module.css';

export function ActionLink({ href, children, variant = 'primary', disabled = false, ariaLabel }) {
  if (disabled || !href) {
    return (
      <span className={`${styles.action} ${styles[variant]} ${styles.disabled}`} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a className={`${styles.action} ${styles[variant]}`} href={href} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
