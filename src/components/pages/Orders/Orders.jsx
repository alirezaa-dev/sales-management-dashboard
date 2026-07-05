import React, { useContext, useState } from "react";

import Button from "../../ui/Button";
import DeliveryMethod from "../../ui/DeliveryMethod";

import OrdersTable from "./components/OrdersTable";
import AddOrderModal from "./components/AddOrderModal";
import EditOrderModal from "./components/EditOrderModal";

import { OrderContext } from "../../../context/OrderContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { ProductContext } from "../../../context/ProductContext";

import useOrderForm from "./hooks/useOrderForm";

import { DELIVERY_METHOD } from "../../../constants/deliveryMethod";
import { ORDER_STATUS } from "../../../constants/orderStatus";
import getTodayDate from "../../../utils/getTodayDate";

export default function Orders() {
  // =========================
  // Context
  // =========================

  const { orders, setOrders } = useContext(OrderContext);
  const { customers } = useContext(CustomerContext);
  const { products } = useContext(ProductContext);

  // =========================
  // Custom Hook
  // =========================

  const {
    customerSearch,
    setCustomerSearch,
    customerId,
    setCustomerId,
    showCustomers,
    setShowCustomers,

    productSearch,
    setProductSearch,
    showProducts,
    setShowProducts,

    selectedProducts,
    setSelectedProducts,

    filteredCustomers,
  } = useOrderForm(products, customers);

  // =========================
  // State
  // =========================

  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHOD.PICKUP);

  const [isOpenModalAddOrder, setIsOpenModalAddOrder] = useState(false);
  const [isOpenModalEditOrder, setIsOpenModalEditOrder] = useState(false);
  const [isOpenModalDeleteOrder, setIsOpenModalDeleteOrder] = useState(false);

  const [search, setSearch] = useState("");

  const [orderNumber, setOrderNumber] = useState("");
  const [nextOrderNumber, setNextOrderNumber] = useState(4002);

  const [items, setItems] = useState([]);

  const [orderStatus, setOrderStatus] = useState(0);
  const [orderDate, setOrderDate] = useState("");

  const [nextId, setNextId] = useState(2);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // =========================
  // Derived Data
  // =========================

  const orderAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(productSearch.toLowerCase()),
    )
    .slice(0, 20);

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.includes(search),
  );

  // =========================
  // Helper Functions
  // =========================

  const resetForm = () => {
    setCustomerSearch("");
    setCustomerId(null);
    setProductSearch("");
    setSelectedProducts([]);
    setShowCustomers(false);
    setShowProducts(false);
    setDeliveryMethod(DELIVERY_METHOD.PICKUP);
  };

  // =========================
  // Product Functions
  // =========================

  const addProductToOrder = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);

    if (exists) return;

    setSelectedProducts([
      ...selectedProducts,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id),
    );
  };

  const updateQuantity = (id, quantity) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product,
      ),
    );
  };

  const increaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity - 1),
            }
          : product,
      ),
    );
  };

  // =========================
  // Order Handlers
  // =========================

  const handleViewOrder = (order) => {
    console.log(order);
  };

  const handleAddOrder = () => {
    if (!customerId) {
      alert("لطفاً یک مشتری انتخاب کنید.");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("حداقل یک محصول انتخاب کنید.");
      return;
    }

    const newOrder = {
      id: nextId,
      orderNumber: String(nextOrderNumber),
      customerId,
      items: selectedProducts,
      orderAmount,
      deliveryMethod,
      orderStatus:
        deliveryMethod === DELIVERY_METHOD.PICKUP
          ? ORDER_STATUS.CONFIRMED
          : ORDER_STATUS.PENDING_SHIPMENT,
      orderDate: getTodayDate(),
    };

    setOrders([...orders, newOrder]);

    setNextId((prev) => prev + 1);
    setNextOrderNumber((prev) => prev + 1);

    resetForm();

    setIsOpenModalAddOrder(false);
  };

  const handleEditOrder = (order) => {
    setSelectedOrderId(order.id);

    setCustomerId(order.customerId);
    setDeliveryMethod(order.deliveryMethod);

    setCustomerSearch(
      customers.find((c) => c.id === order.customerId)?.name || "",
    );

    const formattedItems = order.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      return {
        id: product?.id,
        name: product?.name,
        price: item.productPrice,
        quantity: item.quantity,
      };
    });

    setSelectedProducts(formattedItems);

    setIsOpenModalEditOrder(true);
  };

  const handleUpdateOrder = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrderId
        ? {
            ...order,
            customerId,
            items: selectedProducts,
            deliveryMethod,
            orderAmount,
          }
        : order,
    );

    setOrders(updatedOrders);

    setIsOpenModalEditOrder(false);
  };

  const handleConfirmOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, orderStatus: ORDER_STATUS.SHIPPED }
          : order,
      ),
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>سفارشات</h2>

        <Button
          className="p-2 border rounded-sm mx-1 border-gray-300"
          onClick={() => {
            setIsOpenModalAddOrder(true);
            resetForm();
          }}
        >
          <span className="text-lg pl-2">+</span>
          ثبت سفارش جدید
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-row gap-4">
        <input
          className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
          type="text"
          placeholder="جستجوی شماره سفارش"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <OrdersTable
        orders={filteredOrders}
        customers={customers}
        onView={handleViewOrder}
        onEdit={handleEditOrder}
        onConfirm={handleConfirmOrder}
      />

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isOpenModalAddOrder}
        onClose={() => {
          setIsOpenModalAddOrder(false);
        }}
        handleAddOrder={handleAddOrder}
        customerSearch={customerSearch}
        setCustomerSearch={setCustomerSearch}
        customerId={customerId}
        setCustomerId={setCustomerId}
        showCustomers={showCustomers}
        setShowCustomers={setShowCustomers}
        filteredCustomers={filteredCustomers}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        addProductToOrder={addProductToOrder}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
      />
      {/* Edit Order Modal */}
      <EditOrderModal
        isOpen={isOpenModalEditOrder}
        onClose={() => {
          setIsOpenModalEditOrder(false);
        }}
        handleUpdateOrder={handleUpdateOrder}
        customerSearch={customerSearch}
        setCustomerSearch={setCustomerSearch}
        customerId={customerId}
        setCustomerId={setCustomerId}
        showCustomers={showCustomers}
        setShowCustomers={setShowCustomers}
        filteredCustomers={filteredCustomers}
        productSearch={productSearch}
        setProductSearch={setProductSearch}
        showProducts={showProducts}
        setShowProducts={setShowProducts}
        filteredProducts={filteredProducts}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        addProductToOrder={addProductToOrder}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        updateQuantity={updateQuantity}
        orderAmount={orderAmount}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
      />
    </>
  );
}
