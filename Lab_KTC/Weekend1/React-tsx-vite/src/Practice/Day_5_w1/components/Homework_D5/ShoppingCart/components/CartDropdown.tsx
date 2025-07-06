

import styles from '../style/CartDropdown.module.css';
import { useCart } from '../Context/CartContext';
import type { CartItem } from '../types/Product'; // Cần import CartItem nếu dùng ở đây

interface CartDropdownProps { 
  isVisible: boolean;
  onClose: () => void; 
}

const formatPrice = (price: number) => {
  return price.toLocaleString("vi-VN") + " ₫";
};

export default function CartDropdown({ isVisible, onClose }: CartDropdownProps) {
  const {
    cart, // Đổi từ cartItems thành cart
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotalPrice,
  } = useCart();

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dropdown} onClick={e => e.stopPropagation()}>
        <h3>🛒 Giỏ hàng</h3>
        {cart.length === 0 ? (
          <p className={styles.emptyCartMessage}>Chưa có sản phẩm nào.</p>
        ) : (
          <>
            <ul className={styles.itemList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.controls}>
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <div className={styles.price}>
                      {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeFromCart(item.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              Tổng cộng: {formatPrice(getTotalPrice())}
            </div>
            <button className={styles.viewCart}>Xem giỏ hàng</button>
          </>
        )}
      </div>
    </div>
  );
}