import React, { useContext, useState } from "react";

import Button from "../../ui/Button";

import OrdersTable from "./components/OrdersTable";
import AddOrderModal from "./components/AddOrderModal";
import EditOrderModal from "./components/EditOrderModal";

import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { ProductContext } from "../../../context/ProductContext";

import { DELIVERY_METHOD } from "../../../constants/deliveryMethod";
import { ORDER_STATUS } from "../../../constants/orderStatus";
import getTodayDate from "../../../utils/getTodayDate";
import OrdersHeader from "./components/OrdersHeader";
import useOrderDraft from "./hooks/useOrderDraft";
import OrdersSearch from "./components/OrdersSearch";

export default function Orders() {
  // Context
  const { orders, setOrders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);

  // UI State
  const [isOpenModalAddOrder, setIsOpenModalAddOrder] = useState(false);
  const [isOpenModalEditOrder, setIsOpenModalEditOrder] = useState(false);
  const [search, setSearch] = useState("");

  const [nextId, setNextId] = useState(2);
  const [nextOrderNumber, setNextOrderNumber] = useState(4002);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Order Draft (FROM HOOK)
  const {
    orderDraft,
    updateDraft,
    resetDraft,

    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
  } = useOrderDraft();

  // Derived Data
  const orderAmount = orderDraft.selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const filteredProducts = products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(orderDraft.productSearch.toLowerCase()),
    )
    .slice(0, 20);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.includes(search),
  );

  // Helpers
  const resetForm = () => {
    resetDraft();
  };

  // Order Handlers
  const handleAddOrder = () => {
    if (!orderDraft.customerId) {
      alert("لطفاً یک مشتری انتخاب کنید.");
      return;
    }

    if (orderDraft.selectedProducts.length === 0) {
      alert("حداقل یک محصول انتخاب کنید.");
      return;
    }

    const newOrder = {
      id: nextId,
      orderNumber: String(nextOrderNumber),
      customerId: orderDraft.customerId,
      items: orderDraft.selectedProducts,
      orderAmount,
      deliveryMethod: orderDraft.deliveryMethod,
      orderStatus:
        orderDraft.deliveryMethod === DELIVERY_METHOD.PICKUP
          ? ORDER_STATUS.CONFIRMED
          : ORDER_STATUS.PENDING_SHIPMENT,
      orderDate: getTodayDate(),
    };

    setOrders([...orders, newOrder]);

    setNextId((prev) => prev + 1);
    setNextOrderNumber((prev) => prev + 1);

    resetDraft();
    setIsOpenModalAddOrder(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrderId(order.id);

    const customer = customers.find((c) => c.id === order.customerId);

    const formattedItems = order.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        id: product?.id,
        name: product?.name,
        price: item.productPrice,
        quantity: item.quantity,
      };
    });

    updateDraft("customerId", order.customerId);
    updateDraft("customerSearch", customer?.name || "");
    updateDraft("productSearch", "");
    updateDraft("selectedProducts", formattedItems);
    updateDraft("deliveryMethod", order.deliveryMethod);
    updateDraft("showCustomers", false);
    updateDraft("showProducts", false);

    setIsOpenModalEditOrder(true);
  };

  const handleUpdateOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrderId
        ? {
            ...order,
            customerId: orderDraft.customerId,
            items: orderDraft.selectedProducts,
            deliveryMethod: orderDraft.deliveryMethod,
            orderAmount,
          }
        : order,
    );

    setOrders(updatedOrders);
    setIsOpenModalEditOrder(false);
  };

  const handleConfirmOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: ORDER_STATUS.SHIPPED }
          : order,
      ),
    );
  };

  // View
  return (
    <>
      {/* Header */}
      <OrdersHeader
        onAddOrder={() => {
          resetDraft();
          setIsOpenModalAddOrder(true);
        }}
      />

      {/* Search */}
      <OrdersSearch search={search} setSearch={setSearch} />

      {/* Table */}
      <OrdersTable
        orders={filteredOrders}
        customers={customers}
        onEdit={handleEditOrder}
        onConfirm={handleConfirmOrder}
      />

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isOpenModalAddOrder}
        onClose={() => setIsOpenModalAddOrder(false)}
        handleAddOrder={handleAddOrder}
        orderDraft={orderDraft}
        updateDraft={updateDraft}
        filteredProducts={filteredProducts}
        addProductToOrder={addProduct}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
      />

      {/* Edit Order Modal */}
      <EditOrderModal
        isOpen={isOpenModalEditOrder}
        onClose={() => setIsOpenModalEditOrder(false)}
        handleUpdateOrder={handleUpdateOrder}
        orderDraft={orderDraft}
        updateDraft={updateDraft}
        filteredProducts={filteredProducts}
        addProductToOrder={addProduct}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
      />
    </>
  );
}
