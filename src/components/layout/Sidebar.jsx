import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-l border-gray-200 shadow-sm p-4">
      <h1 className="text-lg font-bold mb-6">فروشگاه دهقان</h1>

      <ul className="space-y-3">
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer text-right">
          داشبورد
        </li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer text-right">
          <Link to="/customers">مشتریان</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer text-right">
          <Link to="/products">محصولات</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer text-right">
          <Link to="/categories">دسته‌بندی‌ها</Link>
        </li>
        <li className="p-2 rounded hover:bg-gray-100 cursor-pointer text-right">
          سفارشات
        </li>
      </ul>
    </div>
  );
}
