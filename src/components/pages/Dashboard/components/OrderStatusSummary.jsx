import OrderStatus from "../../../ui/OrderStatus";
import { ORDER_STATUS } from "../../../../constants/orderStatus";
import { formatNumber } from "../../../../utils/formatNumber";

export default function OrderStatusSummary({
  pendingShipment,
  shipped,
  confirmed,
  canceled,
}) {
  const statuses = [
    {
      status: ORDER_STATUS.PENDING_SHIPMENT,
      count: pendingShipment,
    },
    {
      status: ORDER_STATUS.SHIPPED,
      count: shipped,
    },
    {
      status: ORDER_STATUS.CONFIRMED,
      count: confirmed,
    },
    {
      status: ORDER_STATUS.CANCELED,
      count: canceled,
    },
  ];

  return (
    <div className="grow rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">وضعیت سفارشات</h2>

      <div className="space-y-4">
        {statuses.map(({ status, count }) => (
          <div key={status} className="flex items-center justify-between pb-4 border-b  border-gray-100">
            <OrderStatus status={status} />
            <span className="font-bold">{formatNumber(count)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
