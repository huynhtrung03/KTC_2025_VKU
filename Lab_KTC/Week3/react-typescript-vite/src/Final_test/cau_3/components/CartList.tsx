
import React from 'react';
import { useCart } from '../CartProvider';

export default function CartList() {
  const { cart } = useCart();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border border-gray-300 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">No items in cart</p>
      ) : (
        <ul className="space-y-3">
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <span className="font-medium text-gray-700">{item.name}</span>
              <span className="text-blue-600 font-semibold">${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
