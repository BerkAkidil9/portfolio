import { motion, useReducedMotion } from 'framer-motion';
import { skillCategories } from '../../data/skills.js';
import { Reveal } from '../ui/Reveal.jsx';
import styles from './TechnologiesSection.module.css';

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function TechnologiesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.section} id="technologies" aria-labelledby="technologies-title">
      <div className="section-shell">
        <Reveal>
          <p className="section-kicker">Technical map</p>
          <h2 className="section-heading" id="technologies-title">
            A categorized technology area prepared for source-backed skills.
          </h2>
          <p className="section-copy">
            No skill percentages or unsupported seniority labels are used. Verified technologies can
            be connected to projects later.
          </p>
        </Reveal>

        <motion.div
          className={styles.grid}
          variants={prefersReducedMotion ? undefined : gridVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skillCategories.map((category) => (
            <motion.article
              className={styles.category}
              key={category.id}
              variants={prefersReducedMotion ? undefined : cardVariants}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              whileHover={prefersReducedMotion ? undefined : { y: -7, scale: 1.015 }}
            >
              <h3>{category.label}</h3>
              <p>{category.description}</p>
              <div className={styles.badges}>
                {category.items.map((item, index) => (
                  <span key={`${category.id}-${index}`}>{item}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
