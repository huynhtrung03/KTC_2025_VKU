import { FaEyeSlash } from "react-icons/fa";
import styles from "./Info.module.css";
export const InfoCard = () => {
  return (
    <div className={styles.cardContainer}>
      <img className={styles.img} src="/images/avatar.png"></img>
      <div className={styles.cRightCol}>
        <span className={styles.name}>Wade Warren</span>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <span className={styles.visa}>VISA</span>
            <span>4293 3242 ***</span>
          </div>
          <div className={styles.rightCol}>
            <span>
              <FaEyeSlash />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InfoCard