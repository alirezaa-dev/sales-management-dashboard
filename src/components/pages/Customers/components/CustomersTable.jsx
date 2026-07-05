import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { formatDate } from "../../../../utils/formatDate";

export default function CustomersTable({ customers, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="min-w-[900px] text-right border-collapse w-full">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[70px]">
              ردیف
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[220px]">
              نام
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[170px]">
              موبایل
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[100px]">
              امتیاز
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[150px]">
              تاریخ
            </th>

            <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[110px]">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {customer.rowNumber}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {customer.name}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {customer.phone}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {customer.score}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                {formatDate(customer.joinDate)}
              </td>

              <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-md bg-blue-100 cursor-pointer"
                    onClick={() => onEdit(customer)}
                  >
                    <MdOutlineModeEdit className="text-blue-600" />
                  </button>

                  <button
                    className="p-2 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => onDelete(customer.id)}
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
