import { useContext } from "react";

import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { ProductContext } from "../../../context/ProductContext";

import { ORDER_STATUS } from "../../../constants/orderStatus";

import DashboardStats from "./components/DashboardStats";
import OrderStatusSummary from "./components/OrderStatusSummary";
import LatestOrders from "./components/LatestOrders";
import LatestCustomers from "./components/LatestCustomers";
import TopProducts from "./components/TopProducts";

export default function Dashboard() {
  const { orders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);

  /*  Dashboard Data  */

  const totalSales = orders.reduce((sum, order) => sum + order.orderAmount, 0);

  const pendingShipment = orders.filter(
    (order) => order.orderStatus === ORDER_STATUS.PENDING_SHIPMENT,
  ).length;

  const confirmed = orders.filter(
    (order) => order.orderStatus === ORDER_STATUS.CONFIRMED,
  ).length;

  const shipped = orders.filter(
    (order) => order.orderStatus === ORDER_STATUS.SHIPPED,
  ).length;

  const canceled = orders.filter(
    (order) => order.orderStatus === ORDER_STATUS.CANCELED,
  ).length;

  const productSales = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      productSales[item.productId] =
        (productSales[item.productId] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSales)
    .map(([productId, soldCount]) => {
      const product = products.find((p) => p.id === Number(productId));

      return {
        id: productId,
        name: product?.name || "محصول حذف شده",
        soldCount,
      };
    })
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 5);

  const latestOrders = [...orders].reverse().slice(0, 5);

  const latestCustomers = [...customers].reverse().slice(0, 5);
  console.log(orders);
  console.log(orders.map((order) => order.status));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">داشبورد</h1>

      {/*  Stats  */}

      <DashboardStats
        ordersCount={orders.length}
        customersCount={customers.length}
        productsCount={products.length}
        totalSales={totalSales}
      />

      {/*  Order Status  */}

      <div className="flex gap-8">
        <OrderStatusSummary
          pendingShipment={pendingShipment}
          shipped={shipped}
          confirmed={confirmed}
          canceled={canceled}
        />

        <LatestOrders orders={latestOrders} customers={customers} />
      </div>

      {/*  Customers & Products  */}

      <div className="flex gap-8">
        <LatestCustomers customers={latestCustomers} />

        <TopProducts products={topProducts} />
      </div>
    </div>
  );
}
