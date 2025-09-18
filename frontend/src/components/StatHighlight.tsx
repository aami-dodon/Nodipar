import styles from './StatHighlight.module.css';

interface StatItem {
  label: string;
  value: string;
}

interface StatHighlightProps {
  items: StatItem[];
}

export const StatHighlight = ({ items }: StatHighlightProps) => {
  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
};
