import { Chip } from '../../components/Chip';
import styles from './Gallery.module.css';
import { galleries } from '../../data/mockData';

export const Gallery = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.memory}>
        <img src={galleries.memoryOfWeek.image} alt={galleries.memoryOfWeek.title} />
        <div className={styles.memoryContent}>
          <Chip label="Memory of the Week" variant="primary" />
          <h3>{galleries.memoryOfWeek.title}</h3>
          <p>{galleries.memoryOfWeek.description}</p>
        </div>
      </div>
      <div className={styles.albumGrid}>
        {galleries.albums.map((album) => (
          <div key={album.id} className={styles.albumCard}>
            <strong>{album.title}</strong>
            <span>{album.count} photos · {album.contributors} contributors</span>
            <div className={styles.tags}>
              {album.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
