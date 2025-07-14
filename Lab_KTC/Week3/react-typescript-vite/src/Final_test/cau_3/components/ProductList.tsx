


import { useCart } from '../CartProvider';

const products = [
  { id: 1, name: 'Tivi', price: 1000 },
  { id: 2, name: 'IPhone', price: 500 },
  { id: 3, name: 'Headphones', price: 200 },
];

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🛍️ Product List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-700">{p.name}</h3>
            <p className="text-gray-500 mb-4">Price: ${p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
