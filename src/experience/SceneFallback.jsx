import styles from './SceneFallback.module.css';

export function SceneFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <span className={styles.starOne} />
      <span className={styles.starTwo} />
      <span className={styles.starThree} />
    </div>
  );
}
