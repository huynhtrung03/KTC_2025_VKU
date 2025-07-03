import React from 'react'; // <-- Bỏ comment dòng này!
import NewsCard from './NewsCard';
import styles from './renderList.module.css';

interface NewsItem {
  image: string;
  title: string;
  views: number;
  id?: string | number;
}

interface NewsSectionProps {
  title: string;
  newsItems: NewsItem[];
}

function NewsSection({ title, newsItems }: NewsSectionProps) {
  return (
    // Đảm bảo bạn cũng đã thay đổi các className để sử dụng CSS Modules
    // như đã thảo luận ở các câu trả lời trước!
    <div className={styles['news-section']}>
      <div className={styles['news-section-header']}>
        <h2 className={styles['news-section-title']}>{title}</h2>
        <a href="#" className={styles['news-section-view-more']}>Xem thêm</a>
      </div>
      <div className={styles['news-cards-container']}>
        {newsItems.map((item: NewsItem) => (
          <NewsCard
            key={item.id || item.title}
            image={item.image}
            title={item.title}
            views={item.views}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsSection;