import styles from './Polls.module.css';
import { polls } from '../../data/mockData';

export const Polls = () => {
  return (
    <div className={styles.list}>
      {polls.map((poll) => (
        <div key={poll.id} className={styles.card}>
          <div>
            <strong>{poll.title}</strong>
            <div className={styles.meta}>
              <span>Closes in {poll.expiresIn}</span> ·{' '}
              <span>{poll.anonymous ? 'Anonymous voting' : 'Visible voters'}</span>
            </div>
          </div>
          <div className={styles.options}>
            {poll.options.map((option) => (
              <div key={option.label} className={styles.option}>
                <span>{option.label}</span>
                <strong>{option.votes}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
