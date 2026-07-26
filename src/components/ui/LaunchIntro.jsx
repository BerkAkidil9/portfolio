import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { hero, introHighlights } from '../../data/portfolio.js';
import styles from './LaunchIntro.module.css';

const INTRO_STORAGE_KEY = 'berk-portfolio-launch-intro-seen-v7';
const AUTO_DISMISS_MS = 7350;
const EXIT_MS = 900;

function hasSeenIntro() {
  if (import.meta.env.DEV) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  if (import.meta.env.DEV) {
    return;
  }

  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
  } catch {
    // Session storage can be unavailable in strict privacy modes; the intro remains dismissible.
  }
}

export function LaunchIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return !hasSeenIntro();
  });
  const [isLeaving, setIsLeaving] = useState(false);

  const dismiss = useCallback(() => {
    if (!isVisible || isLeaving) {
      return;
    }

    markIntroSeen();
    setIsLeaving(true);

    window.setTimeout(() => {
      setIsVisible(false);
    }, EXIT_MS);
  }, [isLeaving, isVisible]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    if (prefersReducedMotion) {
      markIntroSeen();
      return undefined;
    }

    document.body.classList.add('launch-intro-open');

    const autoDismiss = window.setTimeout(dismiss, AUTO_DISMISS_MS);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(autoDismiss);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('launch-intro-open');
    };
  }, [dismiss, isVisible, prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`${styles.overlay} ${isLeaving ? styles.leaving : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Portfolio launch intro"
    >
      <span className={styles.backgroundVideo} aria-hidden="true">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 1.8;
          }}
        >
          <source src="/videos/intro-space-atmosphere.mp4" type="video/mp4" />
        </video>
      </span>
      <div className={styles.watermarkCover} aria-hidden="true" />
      <div className={styles.starfield} />
      <div className={styles.nebula} />
      <div className={styles.panel}>
        <div className={styles.galaxyMark} />
        <strong className={styles.name}>{hero.name}</strong>
        <span className={styles.role}>{hero.role} Portfolio</span>
        <div className={styles.progress} aria-hidden="true">
          <span />
        </div>
        <ol className={styles.statusList} aria-label="Portfolio intro highlights">
          {introHighlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ol>
      </div>
      <button
        className={styles.skip}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          dismiss();
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
