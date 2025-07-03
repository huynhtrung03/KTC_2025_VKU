import React from 'react';
import styles from './renderList.module.css'; 

interface NewsCardProps {
  image: string;
  title: string;
  views: number;
}

function NewsCard({ image, title, views }: NewsCardProps) {
  return (
    <div className={styles['news-card']}>
      <img src={image} alt={title} className={styles['news-card-image']} />
      <div className={styles['news-card-content']}>
        <h3 className={styles['news-card-title']}>{title}</h3>
        <p className={styles['news-card-views']}>{views} lượt xem</p>
      </div>
    </div>
  );
}

export default NewsCard;