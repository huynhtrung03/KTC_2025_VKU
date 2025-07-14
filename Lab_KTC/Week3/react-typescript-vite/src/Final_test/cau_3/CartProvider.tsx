import  { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu cho một sản phẩm trong giỏ
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Kiểu dữ liệu cho context
interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
}

// Tạo context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook để sử dụng giỏ hàng
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Props cho CartProvider
interface CartProviderProps {
  children: ReactNode;
}

// Component CartProvider để bọc toàn bộ app
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
