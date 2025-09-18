import styles from './Resources.module.css';
import { resources } from '../../data/mockData';

export const Resources = () => {
  return (
    <div className={styles.list}>
      {resources.map((resource) => (
        <div key={resource.id} className={styles.resource}>
          <strong>{resource.title}</strong>
          <span className={styles.meta}>
            {resource.type} · {resource.size}
          </span>
          <span className={styles.meta}>Maintained by {resource.owner}</span>
        </div>
      ))}
    </div>
  );
};
