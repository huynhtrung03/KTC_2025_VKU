import React, { useState } from 'react';
import styles from './ImageGallery.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import icons mũi tên từ Lucide

// Dữ liệu giả định về các đường dẫn ảnh
// Đảm bảo các ảnh này tồn tại trong thư mục public/images/ của bạn
const images: string[] = [
  '/images/1.jpg', // Đường dẫn tương đối từ thư mục public
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
];

const ImageGallery: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State để theo dõi index của ảnh hiện tại

  // Xử lý khi bấm nút mũi tên trái
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Xử lý khi bấm nút mũi tên phải
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Xử lý khi bấm vào ảnh thumbnail
  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.galleryContainer}>
      <h1 className={styles.title}>Slide with Thumb</h1>

      {/* Phần hiển thị ảnh chính */}
      <div className={styles.mainImageWrapper}>
        <button onClick={goToPrevious} className={styles.navButton}>
          <ChevronLeft size={32} /> {/* Icon mũi tên trái */}
        </button>
        <img
          src={images[currentImageIndex]} // Nguồn ảnh là ảnh tại index hiện tại
          alt={`Gallery image ${currentImageIndex + 1}`}
          className={styles.mainImage}
        />
        <button onClick={goToNext} className={styles.navButton}>
          <ChevronRight size={32} /> {/* Icon mũi tên phải */}
        </button>
      </div>

      {/* Phần hiển thị các ảnh thumbnail */}
      <div className={styles.thumbnails}>
        {images.map((imagePath, index) => (
          <div
            key={index} // Key là index của ảnh
            className={`${styles.thumbnailWrapper} ${
              index === currentImageIndex ? styles.activeThumbnail : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={imagePath}
              alt={`Thumbnail ${index + 1}`}
              className={styles.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;