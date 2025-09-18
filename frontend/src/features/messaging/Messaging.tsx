import styles from './Messaging.module.css';
import { chats } from '../../data/mockData';

export const Messaging = () => {
  return (
    <div className={styles.grid}>
      <div>
        <h4 className={styles.sectionTitle}>One-to-one</h4>
        <div className={styles.chatList}>
          {chats.direct.map((chat) => (
            <div key={chat.id} className={styles.chatCard}>
              <div className={styles.chatInfo}>
                <strong>{chat.name}</strong>
                <span>{chat.lastMessage}</span>
              </div>
              <div>
                <span>{chat.time}</span>
                {chat.unread ? <span className={styles.unread}>{chat.unread}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className={styles.sectionTitle}>Group chats</h4>
        <div className={styles.chatList}>
          {chats.groups.map((group) => (
            <div key={group.id} className={styles.chatCard}>
              <div className={styles.chatInfo}>
                <strong>{group.name}</strong>
                <span>{group.members} members · {group.lastMessage}</span>
              </div>
              <span>{group.time}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className={styles.sectionTitle}>Event auto-chats</h4>
        <div className={styles.chatList}>
          {chats.events.map((chat) => (
            <div key={chat.id} className={styles.chatCard}>
              <div className={styles.chatInfo}>
                <strong>{chat.name}</strong>
                <span>{chat.members} RSVPs connected</span>
              </div>
              <span>{chat.lastMessage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
