import { motion, useReducedMotion } from 'framer-motion';

const baseVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({ children, className, delay = 0, as = 'div', viewportAmount = 0.22 }) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
