import { useEffect, useMemo, useState } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import { hero } from '../../data/portfolio.js';
import styles from './Navigation.module.css';

export function Navigation({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(
    () => items.filter((item) => item.href.startsWith('#')).map((item) => item.id),
    [items],
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);

    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a className={styles.brand} href="#home" onClick={() => setIsOpen(false)}>
          <img className={styles.brandIcon} src="/logo-mark.png" alt="" aria-hidden="true" />
          <span>{hero.name}</span>
        </a>

        <button
          className={styles.menuButton}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="visually-hidden">Toggle navigation menu</span>
          <span className={styles.menuLine} aria-hidden="true" />
          <span className={styles.menuLine} aria-hidden="true" />
        </button>

        <div className={`${styles.links} ${isOpen ? styles.open : ''}`} id="primary-navigation">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? styles.active : ''}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
              rel={item.external ? 'noopener noreferrer' : undefined}
              target={item.external ? '_blank' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
