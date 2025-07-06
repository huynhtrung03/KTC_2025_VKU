



// import React from 'react'
import styles from '../style/CartIcon.module.css'
import  { useCart } from '../Context/CartContext';

type Props = {
  toggleDropdown: () => void;
}

export default function CartIcon({toggleDropdown}: Props) {
  const { getTotalItems } = useCart();

  return (
    <div className={styles.cartIcon} onClick={toggleDropdown}>
      🛒
      <span className={styles.badge}>{getTotalItems()}</span>
    </div>
  );
}