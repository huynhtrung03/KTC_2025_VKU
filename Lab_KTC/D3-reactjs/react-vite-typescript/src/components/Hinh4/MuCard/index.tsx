import { IoIosMore } from "react-icons/io";
import styles from "./Mu.module.css";
export const MuCard = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.leftCol}>
        <img src="/images/mu.png" className={styles.img}></img>
        <span>Manchester United</span>
      </div>
      <span className={styles.rightCol}>
        <IoIosMore />
      </span>
    </div>
  );
};
export default MuCard