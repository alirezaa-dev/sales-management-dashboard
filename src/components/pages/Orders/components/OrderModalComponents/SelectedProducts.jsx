import { formatPrice } from "../../../../../utils/formatPrice";
export default function SelectedProducts({
  selectedProducts,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  updateQuantity,
}) {
  return (
    <div className="space-y-3">
      {selectedProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-md p-3"
        >
          <div className="font-medium w-[45%]">{product.name}</div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="w-8 h-8 rounded border border-gray-200 shadow-xs hover:bg-gray-100 cursor-pointer"
            >
              -
            </button>

            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                updateQuantity(product.id, Number(e.target.value))
              }
              className="w-14 text-center border rounded h-8 border-gray-200 shadow-xs"
            />

            <button
              onClick={() => increaseQuantity(product.id)}
              className="w-8 h-8 rounded border hover:bg-gray-100 cursor-pointer border-gray-200 shadow-xs"
            >
              +
            </button>
          </div>

          <div className="text-sm">
            {formatPrice(product.price * product.quantity)} تومان
          </div>

          <button
            onClick={() => removeProduct(product.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
}
