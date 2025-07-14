export default function ContactPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Liên hệ</h1>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nội dung</label>
            <textarea
              className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              rows={4}
              placeholder="Bạn muốn nhắn gì?"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded transition"
          >
            Gửi liên hệ
          </button>
        </form>
      </div>
    </div>
  );
}