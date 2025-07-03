import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react'; // Import icon ThumbsUp từ lucide-react
import styles from './LikeButton.module.css';

const LikeButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false); // State để theo dõi trạng thái like

  const handleClick = () => {
    setIsLiked(prevIsLiked => !prevIsLiked); // Toggle trạng thái: true -> false, false -> true
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>LikeButton</h1>
      <p className={styles.text}>
        {/* Sử dụng component ThumbsUp từ lucide-react */}
        <ThumbsUp
          className={`${styles.icon} ${isLiked ? styles.iconLiked : ''}`}
          onClick={handleClick}
          size={24} // Kích thước của icon, bạn có thể điều chỉnh
          strokeWidth={2} // Độ dày của nét vẽ icon
          aria-label="Thích hoặc bỏ thích"
        />
        {isLiked ? 'Thank you!' : 'Click like if this post is useful to you !'}
      </p>
    </div>
  );
};

export default LikeButton;