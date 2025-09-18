import styles from './ProgressBadge.module.css';

interface ProgressBadgeProps {
  label: string;
  value: number;
  target: number;
}

export const ProgressBadge = ({ label, value, target }: ProgressBadgeProps) => {
  const percent = Math.min(100, Math.round((value / target) * 100));
  return (
    <div className={styles.badge}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueRow}>
        <strong>{value}</strong>
        <span>{percent}%</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
