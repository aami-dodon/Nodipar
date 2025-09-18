import styles from './Avatar.module.css';

interface AvatarProps {
  src: string;
  alt: string;
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt={alt} />
    </div>
  );
};

interface AvatarGroupProps {
  avatars: Array<{ src: string; alt: string }>;
}

export const AvatarGroup = ({ avatars }: AvatarGroupProps) => {
  return (
    <div className={styles.group}>
      {avatars.map((avatar) => (
        <Avatar key={avatar.alt} {...avatar} />
      ))}
    </div>
  );
};
