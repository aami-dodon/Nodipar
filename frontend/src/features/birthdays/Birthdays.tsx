import styles from './Birthdays.module.css';
import { birthdays } from '../../data/mockData';

export const Birthdays = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.wall}>
        <strong>Birthday wall</strong>
        {birthdays.today.map((person) => (
          <div key={person.id} className={styles.card}>
            <strong>{person.name}</strong>
            <span>{person.batch}</span>
            <p>Send a greeting 💌</p>
          </div>
        ))}
      </div>
      <div>
        <strong>Upcoming celebrations</strong>
        <div className={styles.upcoming}>
          {birthdays.upcoming.map((person) => (
            <div key={person.id}>
              <strong>{person.name}</strong>
              <span> · {person.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
