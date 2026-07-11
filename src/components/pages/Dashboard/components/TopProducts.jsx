import { formatNumber } from "../../../../utils/formatNumber";
export default function TopProducts({ products }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow grow">
      <h2 className="mb-6 text-xl font-bold">پرفروش‌ترین محصولات</h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <p className="w-3/5 text-sm">{product.name}</p>

            <span className=" px-3 py-1 text-sm font-bold text-indigo-700">
              {formatNumber(product.soldCount)} عدد
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
