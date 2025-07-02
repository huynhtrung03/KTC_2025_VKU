import styles from "./Score.module.css";
import { IoIosMore } from "react-icons/io";
export const ScoreCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.rowOne}>
        <span className={styles.number}>7'</span>
        <span>
          <IoIosMore />
        </span>
      </div>
      <div className={styles.rowTwo}>
        <div className={styles.colLeft}>
          <span>Spain</span>
          <img src="/images/spanish.png" className={styles.img} />
        </div>
        <span className={styles.ratio}>0 : 0</span>
        <div className={styles.colRight}>
          <span>France</span>
          <img src="/images/france.png" className={styles.img} />
        </div>
      </div>
    </div>
  );
};

export default ScoreCard