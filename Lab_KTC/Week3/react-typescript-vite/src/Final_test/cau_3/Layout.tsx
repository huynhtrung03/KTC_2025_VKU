
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './CartProvider';

function ShoppingCart() {
  return (
    <CartProvider>
      <nav className="flex items-center justify-center gap-10 py-4 bg-gray-100 shadow-md">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium text-lg transition"
        >
          Home
        </Link>
        <Link
          to="/cart"
          className="text-blue-600 hover:text-blue-800 font-medium text-lg transition"
        >
          Cart
        </Link>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default ShoppingCart;


