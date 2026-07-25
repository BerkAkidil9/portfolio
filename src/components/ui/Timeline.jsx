import styles from './Timeline.module.css';

export function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li className={styles.item} key={item.id}>
          <span className={styles.marker} aria-hidden="true" />
          <div className={styles.content}>
            <p className={styles.period}>{item.period}</p>
            <h3>{item.title}</h3>
            <p className={styles.organization}>{item.organization}</p>
            <p>{item.description}</p>
            <span className={styles.type}>{item.type}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
