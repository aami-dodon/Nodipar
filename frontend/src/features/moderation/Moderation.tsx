import styles from './Moderation.module.css';
import { moderation } from '../../data/mockData';

export const Moderation = () => {
  return (
    <div className={styles.layout}>
      <div>
        <strong>Live reports</strong>
        <div className={styles.reports}>
          {moderation.reports.map((report) => (
            <div key={report.id} className={styles.report}>
              <strong>{report.reason}</strong>
              <p>Reported by {report.reporter}</p>
              <span>{report.submitted}</span>
              <span>Status: {report.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.tips}>
        <strong>Safety checklist</strong>
        {moderation.safetyTips.map((tip) => (
          <span key={tip}>{tip}</span>
        ))}
      </div>
    </div>
  );
};
