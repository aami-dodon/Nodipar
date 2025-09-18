import { ActionButton } from '../../components/ActionButton';
import { Card } from '../../components/Card';
import styles from './EventsCenter.module.css';
import { events } from '../../data/mockData';

export const EventsCenter = () => {
  return (
    <div className={styles.events}>
      {events.map((event) => (
        <Card
          key={event.id}
          title={event.name}
          meta={
            <div className={styles.meta}>
              <span>{event.date}</span>
              <span>{event.location}</span>
              <span>{event.going} going</span>
              <span>{event.interested} interested</span>
            </div>
          }
          actions={<ActionButton>RSVP</ActionButton>}
        >
          <div className={styles.statsRow}>
            <span>Reminders: {event.reminders ? 'Enabled' : 'Off'}</span>
            <span>{event.discussionCount} discussion posts</span>
            <span>{event.galleryCount} gallery moments</span>
          </div>
          <div className={styles.poll}>
            <strong>{event.pollQuestion}</strong>
            {event.pollOptions.map((option) => (
              <div key={option.label} className={styles.option}>
                {option.label}
                <span> · {option.votes} votes</span>
              </div>
            ))}
          </div>
          <div className={styles.galleryPreview}>
            {Array.from({ length: 4 }).map((_, index) => (
              <img
                key={`${event.id}-gallery-${index}`}
                src={`https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=${240 + index * 40}&q=80`}
                alt={`${event.name} gallery ${index + 1}`}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
