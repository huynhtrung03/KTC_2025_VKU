

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const productId = params.id; 
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      setError(null);
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(res => {
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("Sản phẩm không tìm thấy.");
            }
            throw new Error(`Lỗi HTTP! Trạng thái: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
          setError(err.message || "Không thể tải chi tiết sản phẩm.");
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return <div className="text-center mt-8 text-lg font-medium">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600 text-lg font-medium">Lỗi: {error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-8 text-gray-700 text-lg">Không tìm thấy sản phẩm. 😔</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:underline text-lg font-medium transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại danh sách sản phẩm
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2 flex justify-center items-center p-4 border rounded-lg bg-gray-50">
          <Image
            src={product.images?.[0] || "/images/no-image.png"}
            alt={product.title}
            width={450}
            height={450}
            className="object-contain rounded-lg max-h-[450px]"
            priority
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900 leading-tight">{product.title}</h1>
            <p className="text-3xl font-bold text-red-700 mb-5">{product.price} $</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mô tả sản phẩm:</h3>
              <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
            </div>

            {product.category && (
              <div className="mb-6 text-gray-700 text-lg">
                <span className="font-semibold">Danh mục: </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{product.category.name}</span>
              </div>
            )}
          </div>

          <button className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105">
            Thêm vào giỏ hàng 🛒
          </button>
        </div>
      </div>

      {product.images && product.images.length > 1 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-5 text-gray-800">Các hình ảnh khác:</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {product.images.slice(1).map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                alt={`${product.title} - Hình ảnh ${index + 2}`}
                width={120}
                height={120}
                className="object-cover rounded-md border border-gray-200 cursor-pointer hover:border-blue-500 transition-all duration-200"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}