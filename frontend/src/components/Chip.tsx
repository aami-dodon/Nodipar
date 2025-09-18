import type { ReactNode } from 'react';
import styles from './Chip.module.css';

type ChipVariant = 'default' | 'accent' | 'primary';

interface ChipProps {
  icon?: ReactNode;
  label: string;
  variant?: ChipVariant;
}

export const Chip = ({ icon, label, variant = 'default' }: ChipProps) => {
  return (
    <span className={styles.chip} data-variant={variant === 'default' ? undefined : variant}>
      {icon}
      {label}
    </span>
  );
};
