
// import React from 'react'
import styles from '../style/ProductGrid.module.css'
import type { Product } from '../types/Product'
import ProductCard from './ProductCard';

type Props = {
    products: Product[];
}

export default function ProductGrid({products}: Props) {
  return (
    <div className={styles.grid}>
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}