import { CartProvider } from './components/CartProvider';
import ProductList from './components/ProductList';
import CartList from './components/CartList';

export default function App() {
  return (
    <CartProvider>
      <h1>Shopping App</h1>
      <ProductList />
      {/* <hr /> */}
      <CartList />
    </CartProvider>
  );
}
