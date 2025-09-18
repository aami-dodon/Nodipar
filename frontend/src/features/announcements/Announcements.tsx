import { ActionButton } from '../../components/ActionButton';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import styles from './Announcements.module.css';
import { announcements, newsroom } from '../../data/mockData';

export const Announcements = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.announcements}>
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            title={announcement.title}
            meta={
              <div className={styles.badges}>
                <Chip label={announcement.category} variant="primary" />
                <span>Scheduled · {announcement.scheduledFor}</span>
                <span>Alerts: {announcement.channel.join(', ')}</span>
                <span>Priority: {announcement.priority}</span>
              </div>
            }
            actions={<ActionButton variant="ghost">Manage Notice</ActionButton>}
          >
            <p>{announcement.description}</p>
          </Card>
        ))}
      </div>
      <div className={styles.newsBoard}>
        {newsroom.map((news) => (
          <div key={news.id} className={styles.newsItem}>
            <strong>{news.title}</strong>
            <span>{news.date}</span>
            <a href={news.url}>Read more →</a>
          </div>
        ))}
      </div>
    </div>
  );
};
