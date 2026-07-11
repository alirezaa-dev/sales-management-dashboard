import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

import ActiveStatus from "../../../ui/ActiveStatus";
import OutStock from "../../../ui/OutStock";
import { formatNumber } from "../../../../utils/formatNumber";
import { formatPrice } from "../../../../utils/formatPrice";

export default function ProductsTable({
  products,
  categories,
  brands,
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="w-full text-right border-collapse">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              ردیف
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              نام محصول
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              برند
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              شناسه
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              دسته‌بندی
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              قیمت (تومان)
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              موجودی
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              وضعیت
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const category = categories.find(
              (cat) => cat.id === product.categoryId,
            );

            const brand = brands.find(
              (brand) => brand.id === product.brandId,
            );

            return (
              <tr key={product.id}>
                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {formatNumber(product.id)}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {product.name}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {brand?.title}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {formatNumber(product.sku)}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {category?.title}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {formatPrice(product.price)}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {product.stock > 0 ? (
                    formatNumber(product.stock)
                  ) : (
                    <OutStock />
                  )}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  <ActiveStatus status={product.isActive} />
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 border rounded-md border-gray-200 bg-blue-100 shadow-sm cursor-pointer"
                      onClick={() => onEdit(product)}
                    >
                      <MdOutlineModeEdit className="text-primary" />
                    </button>

                    <button
                      className="p-2 border rounded-md border-gray-200 bg-red-100 shadow-sm cursor-pointer"
                      onClick={() => onDelete(product.id)}
                    >
                      <MdDeleteOutline className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}