import { Avatar } from '../../components/Avatar';
import styles from './Profiles.module.css';
import { profiles } from '../../data/mockData';

export const Profiles = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.profileGrid}>
        {profiles.featured.map((profile) => (
          <div key={profile.id} className={styles.card}>
            <Avatar src={profile.avatar} alt={profile.name} />
            <div>
              <strong>{profile.name}</strong>
              <p>{profile.batch}</p>
              <span>{profile.location}</span>
            </div>
            <p>{profile.bio}</p>
            <div className={styles.socials}>
              {profile.socials.linkedin ? <a href={profile.socials.linkedin}>LinkedIn</a> : null}
              {profile.socials.instagram ? <a href={profile.socials.instagram}>Instagram</a> : null}
              {profile.socials.website ? <a href={profile.socials.website}>Website</a> : null}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.directoryStats}>
        <strong>Directory snapshot</strong>
        <p>{profiles.directoryStats.totalMembers} alumni connected</p>
        <span>{profiles.directoryStats.batches} batches represented</span>
        <span>Updated {profiles.directoryStats.lastUpdated}</span>
      </div>
    </div>
  );
};
