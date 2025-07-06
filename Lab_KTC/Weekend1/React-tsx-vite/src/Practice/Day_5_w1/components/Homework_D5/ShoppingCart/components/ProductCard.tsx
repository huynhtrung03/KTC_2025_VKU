
import  { useState } from "react";
import styles from "../style/ProductCard.module.css";
import type { Product } from "../types/Product";
import  { useCart } from "../Context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
  };

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <div className={styles.card}>
      <img
        src={'images/anh1.jpg'}
        alt={product.name}
        className={styles.image}
      />
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price.toLocaleString("vi-VN")} đ</p>

      <div className={styles.controls}>
        <button onClick={decrease}>−</button>
        <span>{quantity}</span>
        <button onClick={increase}>+</button>
      </div>

      <button onClick={handleAdd} className={styles.addButton}>
        Add to cart
      </button>
    </div>
  );
}