import styles from './Engagement.module.css';
import { engagement } from '../../data/mockData';

export const Engagement = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.card}>
        <strong>Throwback of the day</strong>
        <p>{engagement.throwback.prompt}</p>
        <span>{engagement.throwback.submissions} submissions</span>
      </div>
      <div className={styles.card}>
        <strong>Trivia</strong>
        <p>{engagement.trivia.question}</p>
        <span>{engagement.trivia.reveal}</span>
      </div>
      <div className={styles.card}>
        <strong>Challenges</strong>
        <div className={styles.challengeList}>
          {engagement.challenges.map((challenge) => (
            <div key={challenge.id} className={styles.challenge}>
              <strong>{challenge.title}</strong>
              <p>{challenge.description}</p>
              <span>{challenge.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
