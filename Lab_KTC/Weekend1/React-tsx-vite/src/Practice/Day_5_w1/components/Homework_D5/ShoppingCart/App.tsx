

import React, { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import CartIcon from "./components/CartIcon";
import CartDropdown from "./components/CartDropdown"; // Đảm bảo đúng tên component
import { CartProvider } from "./Context/CartContext";
import { products } from "./data/products";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDropdown = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartProvider>
      <div style={{ position: "relative" }}>
        <header style={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
          <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
            <CartIcon toggleDropdown={toggleDropdown}/> {/* CartIcon cũng cần toggleDropdown */}
          </div>
          {/* Sửa lỗi ở đây: Truyền props isVisible và onClose */}
          {isCartOpen && (
            <CartDropdown
              isVisible={isCartOpen}
              onClose={toggleDropdown} // Khi nhấn đóng, sẽ gọi toggleDropdown để setIsCartOpen về false
            />
          )}
        </header>

        <main style={{ padding: "16px" }}>
          <ProductGrid products={products}/>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;