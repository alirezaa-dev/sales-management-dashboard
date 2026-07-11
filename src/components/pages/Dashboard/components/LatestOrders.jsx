import { formatPrice } from "../../../../utils/formatPrice";
import OrderStatus from "../../../ui/OrderStatus";

export default function LatestOrders({ orders, customers }) {
  return (
    <div className="grow rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">آخرین سفارش‌ها</h2>

      <div className="space-y-4">
        {orders.map((order) => {
          const customer = customers.find(
            (customer) => customer.id === order.customerId,
          );

          return (
            <div
              key={order.id}
              className="grid grid-cols-3 items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0"
            >
              <p className="justify-self-start text-sm font-medium">
                {customer?.name || "مشتری نامشخص"}
              </p>

              <p className="justify-self-center text-sm text-gray-500">
                {formatPrice(order.orderAmount)} تومان
              </p>

              <div className="justify-self-end">
                <OrderStatus status={order.orderStatus} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
