import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
      <h1 className="text-6xl font-bold text-pink-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Không tìm thấy trang</h2>
      <p className="mb-6 text-gray-500">Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link
        href="/"
        className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}