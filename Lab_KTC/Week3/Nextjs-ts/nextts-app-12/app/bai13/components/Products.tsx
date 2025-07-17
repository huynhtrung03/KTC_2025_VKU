"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=10")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Sản phẩm nổi bật</h2>
      <div className="grid grid-cols-5 gap-6">
        {products.map(product => (
  <div
    key={product.id}
    className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:ring-2 hover:ring-blue-400"
  >
    <Image
      src={product.images?.[0] || "/images/no-image.png"}
      alt={product.title}
      width={180}
      height={180}
      className="object-cover rounded mb-2"
    />
    <div className="font-semibold text-center">{product.title}</div>
    <div className="text-red-600 font-bold mt-1">{product.price} $</div>
    <Link href={`/detail/${product.id}`}>Xem chi tiết</Link>  
  </div>
))}
      </div>
    </div>
  );
}