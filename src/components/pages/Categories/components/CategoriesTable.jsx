import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import ActiveStatus from "../../../ui/ActiveStatus";

export default function CategoriesTable({
  categories,
  getParentCategory,
  countProducts,
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="w-full text-right border-collapse">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              ردیف
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              نام دسته‌بندی
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              دسته‌بندی اصلی
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              تعداد محصولات
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              وضعیت
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {category.rowNumber}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {category.title}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {getParentCategory(category.parentId)?.title || "-"}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {countProducts(category.id)}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                <ActiveStatus status={category.isActive} />
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-md bg-blue-100 cursor-pointer"
                    onClick={() => onEdit(category)}
                  >
                    <MdOutlineModeEdit className="text-blue-600" />
                  </button>

                  <button
                    className="p-2 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => onDelete(category.id)}
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
