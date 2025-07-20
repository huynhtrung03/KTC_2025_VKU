import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="p-8 text-center w-full min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold text-sky-500 mb-4">
        Hello
      </h1>
     

      <div className="bg-white rounded-xl shadow p-6 mx-auto max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-left">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-4">
          <div className="border rounded-lg p-4">
            <p className="text-lg font-semibold">245</p>
            <p className="text-sm text-gray-500">Total Tasks</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-lg font-semibold">30</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-lg font-semibold">18</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/027/735/600/small_2x/3d-pie-chart-on-transparent-background-free-png.png"
            alt="Chart"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}