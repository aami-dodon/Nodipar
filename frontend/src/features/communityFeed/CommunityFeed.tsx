import { Card } from '../../components/Card';
import { Avatar } from '../../components/Avatar';
import { Chip } from '../../components/Chip';
import styles from './CommunityFeed.module.css';
import { communityPosts } from '../../data/mockData';

export const CommunityFeed = () => {
  return (
    <div className={styles.feed}>
      {communityPosts.map((post) => {
        const reactionSummary = Object.entries(post.reactions ?? {}).map(([key, value]) => (
          <span key={key}>
            {key} · {value}
          </span>
        ));

        return (
          <Card
            key={post.id}
            title={post.author}
            avatar={<Avatar src={post.avatar} alt={post.author} />}
            meta={
              <div className={styles.postMeta}>
                <span>{post.timestamp}</span>
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
                {post.pinned ? <span className={styles.pin}>Pinned</span> : null}
              </div>
            }
          >
            <p>{post.content}</p>
            {post.media?.type === 'photo' && (
              <div className={styles.mediaPreview}>
                <img src={post.media.url} alt="Community post visual" />
              </div>
            )}
            {post.media?.type === 'video' && (
              <div className={styles.mediaPreview}>
                <img src={post.media.url} alt="Video highlight" />
              </div>
            )}
            {post.media?.type === 'poll' && Array.isArray(post.media.options) && (
              <div className={styles.pollOptions}>
                {post.media.options.map((option) => (
                  <div key={option.label} className={styles.pollOption}>
                    <strong>{option.label}</strong>
                    <p>{option.votes} votes</p>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.tags}>
              {post.hashtags.map((tag) => (
                <Chip key={tag} label={tag} variant="accent" />
              ))}
            </div>
            {reactionSummary.length ? <div className={styles.reactions}>{reactionSummary}</div> : null}
          </Card>
        );
      })}
    </div>
  );
};
