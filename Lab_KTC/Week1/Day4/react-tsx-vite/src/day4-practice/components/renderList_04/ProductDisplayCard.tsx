import React from 'react';
// Đường dẫn vẫn giữ nguyên vì styles.module.css cùng cấp với ProductDisplayCard.tsx trong thư mục components
import styles from './renderList_04.module.css'; 

export interface ProductDisplayCardProps {
  image: string;
  name: string;
  originalPrice: number;
  discountedPrice?: number;
  discountPercentage?: number;
}

function ProductDisplayCard({
  image,
  name,
  originalPrice,
  discountedPrice,
  discountPercentage,
}: ProductDisplayCardProps) {
  return (
    <div className={styles['product-display-card']}>
      {discountPercentage && (
        <div className={styles['discount-badge']}>
          -{discountPercentage}%
        </div>
      )}
      <img src={image} alt={name} className={styles['product-image']} />
      <h3 className={styles['product-name']}>{name}</h3>
      <div className={styles['product-prices']}>
        {discountedPrice ? (
          <div className={styles['price']}>
            <span className={styles['discounted-price']}>
              {discountedPrice.toLocaleString('vi-VN')}₫
            </span>
            <span className={styles['original-price']}>
              {originalPrice.toLocaleString('vi-VN')}₫
            </span>
          </div>
        ) : (
          <span className={styles['single-price']}>
            {originalPrice.toLocaleString('vi-VN')}₫
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductDisplayCard;

// ... trong ProductDisplayCard.tsx

