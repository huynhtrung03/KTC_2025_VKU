import React, { useState } from 'react';
import styles from './StarRating.module.css'; // Import CSS Modules

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const starDescriptions: string[] = [
    'Rất tệ',      // 1 sao
    'Tệ',          // 2 sao
    'Bình thường', // 3 sao
    'Tốt',         // 4 sao
    'Rất tốt'      // 5 sao
  ];

  const handleStarClick = (index: number) => {
    setRating(index + 1);
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const currentRatingDescription = (hoverRating > 0 ? hoverRating : rating) > 0
    ? starDescriptions[(hoverRating > 0 ? hoverRating : rating) - 1]
    : '';

  return (
    <div className={styles.starRatingContainer}>
      <span className={styles.ratingText}>Chọn đánh giá của bạn</span>
      <div className={styles.stars} onMouseLeave={handleMouseLeave}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = (hoverRating > 0 ? starValue <= hoverRating : starValue <= rating);
          return (
            <span
              key={index}
              className={`${styles.star} ${isFilled ? styles.filled : ''}`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => handleStarHover(index)}
            >
              &#9733;
            </span>
          );
        })}
      </div>
      <button className={styles.statusButton}>
        {currentRatingDescription || 'Chưa đánh giá'}
      </button>
    </div>
  );
};

export default StarRating;