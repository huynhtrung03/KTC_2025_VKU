import React from 'react';
import styles from './ProductGrid.module.css';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className={styles.noProducts}>Không có sản phẩm nào để hiển thị.</p>;
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.imageContainer}>
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/150?text=No+Image'}
              alt={product.title}
              className={styles.productImage}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Image+Error'; }}
            />
          </div>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <p className={styles.productCategory}>{product.category ? product.category.name : 'N/A'}</p>
          <p className={styles.productPrice}>{product.price.toLocaleString('vi-VN')}₫</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;