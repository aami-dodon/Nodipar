import styles from './Notifications.module.css';
import { notificationSettings } from '../../data/mockData';
import { ProgressBadge } from '../../components/ProgressBadge';

export const Notifications = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        {notificationSettings.categories.map((category) => (
          <div key={category.label} className={styles.category}>
            <div>
              <strong>{category.label}</strong>
              <p>In-app: {category.inApp ? 'On' : 'Off'} · Email: {category.email}</p>
            </div>
            <ProgressBadge label="Engagement" value={category.inApp ? 85 : 45} target={100} />
          </div>
        ))}
      </div>
      <div className={styles.dnd}>
        <strong>Do not disturb</strong>
        <span>{notificationSettings.dnd.window}</span>
        <p>{notificationSettings.dnd.enabled ? 'Active' : 'Currently off'}</p>
      </div>
    </div>
  );
};
