import { Chip } from '../../components/Chip';
import styles from './SearchArchive.module.css';
import { archives, searchIndex } from '../../data/mockData';

export const SearchArchive = () => {
  return (
    <div className={styles.layout}>
      <div>
        <h4>Quick filters</h4>
        <div className={styles.filters}>
          {searchIndex.quickFilters.map((filter) => (
            <Chip key={filter} label={filter} />
          ))}
        </div>
      </div>
      <div className={styles.trending}>
        <div>
          <strong>Trending tags</strong>
          <div className={styles.filters}>
            {searchIndex.trendingTags.map((tag) => (
              <Chip key={tag} label={tag} variant="accent" />
            ))}
          </div>
        </div>
        <div>
          <strong>Recent searches</strong>
          <p>{searchIndex.recentSearches.join(' · ')}</p>
        </div>
      </div>
      <div>
        <h4>Archive highlights</h4>
        <p>
          {archives.upcomingThrowback.title} – {archives.upcomingThrowback.description}
        </p>
        <div className={styles.archiveList}>
          {archives.items.map((item) => (
            <div key={item.id} className={styles.archiveCard}>
              <div>
                <strong>{item.title}</strong>
                <p>{item.type}</p>
              </div>
              <span>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
