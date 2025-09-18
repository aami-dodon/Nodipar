import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './ActionButton.module.css';

type Variant = 'solid' | 'ghost';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: Variant;
}

export const ActionButton = ({ icon, children, variant = 'solid', ...props }: ActionButtonProps) => (
  <button type="button" className={styles.button} data-variant={variant === 'solid' ? undefined : variant} {...props}>
    {icon}
    {children}
  </button>
);
