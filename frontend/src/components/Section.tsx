import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  icon: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const Section = ({ id, icon, title, subtitle, actions, children }: SectionProps) => {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>
            {icon}
            {title}
          </h2>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      <div>{children}</div>
    </section>
  );
};
