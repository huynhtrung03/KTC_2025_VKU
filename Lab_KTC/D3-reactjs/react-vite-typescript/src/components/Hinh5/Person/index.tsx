import styles from "./Person.module.css";

type PersonProps = {
  bgCorlor: string;
  avatarUrls: string[];
  title: string;
  subtitle?: string;
};

export const Person = ({
  bgCorlor,
  avatarUrls,
  title,
  subtitle,
}: PersonProps) => {
  return (
    <div className={styles.card} style={{ backgroundColor: bgCorlor }}>
      <div className={styles.left}>
        <div className={styles.avatarGroup}>
          {avatarUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              className={styles.avatar}
              style={{ zIndex: index }}
              alt={`Avatar ${index}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.title}>{title}</p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default Person

