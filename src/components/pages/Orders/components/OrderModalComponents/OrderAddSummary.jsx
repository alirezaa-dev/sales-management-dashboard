import Button from "../../../../ui/Button";
import { formatPrice } from "../../../../../utils/formatPrice";

export default function OrderAddSummary({
  orderAmount,
  onClose,
  handleAddOrder,
}) {
  return (
    <>
      <div className="flex items-center justify-between mt-6 border-t pt-4">
        <p className="font-medium">مبلغ کل</p>

        <div className="text-lg font-bold text-green-600">
          <div className="text-lg font-bold text-green-600">
            {formatPrice(orderAmount)} تومان
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3 border-t pt-4">
        <button
          className="px-6 py-2 bg-transparent rounded-md cursor-pointer hover:text-red-500 text-gray-400"
          onClick={onClose}
        >
          انصراف
        </button>

        <Button
          className="px-6 py-2 bg-primary text-white"
          onClick={handleAddOrder}
        >
          ثبت سفارش
        </Button>
      </div>
    </>
  );
}
