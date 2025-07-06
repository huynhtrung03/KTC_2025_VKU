import React, { useState } from 'react'; 
import styles from './Hover_Highlight.module.css'; 


const Hover_Highlight: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false); // Khởi tạo là không rê chuột
    const handleMouseEnter = () => {
    setIsHovered(true);
};

const handleMouseLeave = () => {
    setIsHovered(false);
  };

return (
    <div
      className={`${styles.box} ${isHovered ? styles.highlight : ''}`}
      // Khi chuột rê vào, gọi hàm `handleMouseEnter`
      onMouseEnter={handleMouseEnter}
      // Khi chuột rời đi, gọi hàm `handleMouseLeave`
      onMouseLeave={handleMouseLeave}
    >
      <p className={styles.text}>Come here!!</p>
    </div>
  );
};

export default Hover_Highlight





