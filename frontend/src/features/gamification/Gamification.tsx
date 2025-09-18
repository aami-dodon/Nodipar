import styles from './Gamification.module.css';
import { gamification } from '../../data/mockData';
import { StatHighlight } from '../../components/StatHighlight';

export const Gamification = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.stats}>
        <strong>Fun Zone</strong>
        <StatHighlight
          items={[
            { label: 'Points', value: gamification.points.toString() },
            { label: 'Current rank', value: `#${gamification.rank}` },
            { label: 'Badges', value: gamification.badges.length.toString() },
          ]}
        />
      </div>
      <div>
        <h4>Badges unlocked</h4>
        <div className={styles.badgeList}>
          {gamification.badges.map((badge) => (
            <div key={badge.id} className={styles.badge}>
              <strong>{badge.label}</strong>
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4>Leaderboard highlights</h4>
        <div className={styles.leaderboard}>
          {gamification.leaderboard.map((entry, index) => (
            <div key={entry.id} className={styles.leaderRow}>
              <span>
                #{index + 1} {entry.name}
              </span>
              <strong>{entry.score} pts</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
