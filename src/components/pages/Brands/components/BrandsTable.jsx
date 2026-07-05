import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";

export default function BrandsTable({
  brands,
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
              نام برند
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              نام انگلیسی برند
            </th>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              تعداد محصولات
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {brand.rowNumber}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {brand.title}
              </td>
              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap text-gray-500">
                {brand.enTitle}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {countProducts(brand.id)}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-md bg-blue-100 cursor-pointer"
                    onClick={() => onEdit(brand)}
                  >
                    <MdOutlineModeEdit className="text-blue-600" />
                  </button>

                  <button
                    className="p-2 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => onDelete(brand.id)}
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
