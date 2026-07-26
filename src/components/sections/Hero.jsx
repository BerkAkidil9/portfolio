import { motion, useReducedMotion } from 'framer-motion';
import { hero } from '../../data/portfolio.js';
import { ActionLink } from '../ui/ActionLink.jsx';
import styles from './Hero.module.css';

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -42 },
  visible: { opacity: 1, x: 0 },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-title">
      <div className={styles.heroAtmosphere} aria-hidden="true" />

      <div className={`section-shell ${styles.heroGrid}`}>
        <motion.div
          className={styles.content}
          variants={prefersReducedMotion ? undefined : heroVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
        >
          <motion.p
            className="section-kicker"
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Home
          </motion.p>
          <motion.p
            className={styles.name}
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.name}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.role}
          </motion.h1>
          <motion.p
            className={styles.intro}
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.introduction}
          </motion.p>
          <motion.div
            className={styles.actions}
            variants={prefersReducedMotion ? undefined : itemVariants}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActionLink href={hero.primaryAction.href}>{hero.primaryAction.label}</ActionLink>
            <ActionLink href={hero.secondaryAction.href} variant="secondary">
              {hero.secondaryAction.label}
            </ActionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
