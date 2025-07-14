import { useCart } from './CartProvider';

const products = [
  { id: 1, name: 'Tủ lạnh', price: 1000 },
  { id: 2, name: 'Điều hoà', price: 500 },
  { id: 3, name: 'Tivi', price: 200 },
];

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid gray', padding: '10px' }}>
            <h3>{p.name}</h3>
            <p>Price: ${p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
