"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 12)); // lấy 12 sản phẩm đầu
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-pink-500 text-xl font-semibold">Đang tải sản phẩm...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-40 h-40 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-pink-500 font-bold mb-2">
              {product.price.toLocaleString()}₫
            </p>
            <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}