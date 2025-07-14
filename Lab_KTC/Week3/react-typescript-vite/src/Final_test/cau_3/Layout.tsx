import { Routes, Route, Link } from 'react-router';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './CartProvider';

function ShoppingCart() {
  return (
    <CartProvider>
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
}

export default ShoppingCart;
