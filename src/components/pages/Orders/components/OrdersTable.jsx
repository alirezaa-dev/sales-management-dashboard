import { MdOutlineModeEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import OrderStatus from "../../../ui/OrderStatus";
import DeliveryMethod from "../../../ui/DeliveryMethod";
import { DELIVERY_METHOD } from "../../../../constants/deliveryMethod";
import { ORDER_STATUS } from "../../../../constants/orderStatus";
import { formatDate } from "../../../../utils/formatDate";

export default function OrdersTable({
  orders,
  customers,
  onView,
  onEdit,
  onConfirm,
}) {
  return (
    <div className="w-full overflow-x-auto rounded-md bg-white">
      <table className="min-w-[1200px] text-right border-collapse w-full">
        <thead className="bg-gray-200 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              شماره
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              شماره سفارش
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              نام مشتری
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              تعداد محصولات
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              مبلغ سفارش(تومان)
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              روش تحویل
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              وضعیت سفارش
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              تاریخ سفارش
            </th>

            <th className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
              عملیات
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const customer = customers.find(
              (customer) => customer.id === order.customerId,
            );

            return (
              <tr key={order.id}>
                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {order.id}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {order.orderNumber}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {customer?.name}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {order.items.length}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {order.orderAmount.toLocaleString()}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  <DeliveryMethod method={order.deliveryMethod} />
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  <OrderStatus status={order.orderStatus} />
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  {formatDate(order.orderDate)}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 border rounded-md border-gray-200 bg-gray-100 shadow-sm cursor-pointer"
                      onClick={() => onView(order)}
                    >
                      <IoEyeOutline />
                    </button>

                    <button
                      className="p-2 border rounded-md border-gray-200 bg-blue-100 shadow-sm cursor-pointer"
                      onClick={() => {
                        onEdit(order);
                      }}
                    >
                      <MdOutlineModeEdit className="text-primary" />
                    </button>
                    {order.deliveryMethod === DELIVERY_METHOD.SHIPPING &&
                      order.orderStatus === ORDER_STATUS.PENDING_SHIPMENT && (
                        <button
                          className="p-2 border rounded-md border-gray-200 bg-green-100 shadow-sm cursor-pointer"
                          onClick={() => onConfirm(order.id)}
                        >
                          <MdCheckCircleOutline className="text-green-600" />
                        </button>
                      )}
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
