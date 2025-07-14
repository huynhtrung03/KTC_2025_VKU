// import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      
      <h1 className="text-4xl font-bold text-pink-600 mb-6">Blog</h1>
      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Lập trình với Next.js</h2>
        <p className="text-gray-700 mb-2">
          Next.js là một framework React mạnh mẽ giúp xây dựng ứng dụng web hiện đại, tối ưu SEO và hiệu suất cao.
        </p>
        <span className="text-sm text-gray-400">14/07/2025</span>
      </article>
      <article className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tại sao nên dùng TypeScript?</h2>
        <p className="text-gray-700 mb-2">
          TypeScript giúp phát hiện lỗi sớm, tăng năng suất lập trình và dễ bảo trì code hơn so với JavaScript thuần.
        </p>
        <span className="text-sm text-gray-400">10/07/2025</span>
      </article>
      <article>
        <h2 className="text-2xl font-semibold mb-2">Tailwind CSS - Viết CSS nhanh chóng</h2>
        <p className="text-gray-700 mb-2">
          Tailwind CSS giúp bạn xây dựng giao diện đẹp, hiện đại mà không cần viết nhiều CSS truyền thống.
        </p>
        <span className="text-sm text-gray-400">05/07/2025</span>
      </article>
    </div>
  );
}