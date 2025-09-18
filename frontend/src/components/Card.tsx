import type { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  meta?: ReactNode;
  avatar?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}

export const Card = ({ title, meta, avatar, actions, children }: CardProps) => {
  return (
    <article className={styles.card}>
      {(title || meta || avatar || actions) && (
        <header className={styles.header}>
          {avatar}
          <div>
            {title ? <h3 className={styles.title}>{title}</h3> : null}
            {meta ? <div className={styles.meta}>{meta}</div> : null}
          </div>
          {actions}
        </header>
      )}
      <div className={styles.content}>{children}</div>
    </article>
  );
};
