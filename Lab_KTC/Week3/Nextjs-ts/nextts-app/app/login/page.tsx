export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-200">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">Đăng nhập</h1>
        <form className="space-y-5">
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
            <label className="block mb-1 font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}