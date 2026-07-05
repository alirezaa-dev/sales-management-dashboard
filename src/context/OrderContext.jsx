import { createContext, useState } from "react";
import DeliveryMethod from "../components/ui/DeliveryMethod";
import { DELIVERY_METHOD } from "../constants/deliveryMethod";

export const OrderContext = createContext();
export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "4000",
      customerId: 1,
      items: [
        {
          productId: 1,
          quantity: 2,
          productPrice: 189000,
          totalPrice: 378000,
        },
        {
          productId: 3,
          quantity: 1,
          productPrice: 145000,
          totalPrice: 145000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 523000,
      orderDate: "1405-04-14",
    },
    {
      id: 2,
      orderNumber: "4001",
      customerId: 2,
      items: [
        {
          productId: 2,
          quantity: 1,
          productPrice: 250000,
          totalPrice: 250000,
        },
      ],
      orderStatus: 1,
      deliveryMethod: 1,
      orderAmount: 250000,
      orderDate: "1405-04-10",
    },
    {
      id: 3,
      orderNumber: "4002",
      customerId: 3,
      items: [
        {
          productId: 4,
          quantity: 2,
          productPrice: 120000,
          totalPrice: 240000,
        },
        {
          productId: 9,
          quantity: 1,
          productPrice: 110000,
          totalPrice: 110000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 350000,
      orderDate: "1405-04-09",
    },
    {
      id: 4,
      orderNumber: "4003",
      customerId: 4,
      items: [
        {
          productId: 6,
          quantity: 1,
          productPrice: 160000,
          totalPrice: 160000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 160000,
      orderDate: "1405-03-28",
    },
    {
      id: 5,
      orderNumber: "4004",
      customerId: 5,
      items: [
        {
          productId: 7,
          quantity: 1,
          productPrice: 175000,
          totalPrice: 175000,
        },
        {
          productId: 8,
          quantity: 1,
          productPrice: 220000,
          totalPrice: 220000,
        },
      ],
      orderStatus: 1,
      deliveryMethod: 1,
      orderAmount: 395000,
      orderDate: "1405-03-25",
    },
    {
      id: 6,
      orderNumber: "4005",
      customerId: 6,
      items: [
        {
          productId: 10,
          quantity: 1,
          productPrice: 198000,
          totalPrice: 198000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 198000,
      orderDate: "1405-03-20",
    },
    {
      id: 7,
      orderNumber: "4006",
      customerId: 7,
      items: [
        {
          productId: 11,
          quantity: 1,
          productPrice: 210000,
          totalPrice: 210000,
        },
        {
          productId: 12,
          quantity: 1,
          productPrice: 320000,
          totalPrice: 320000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 530000,
      orderDate: "1405-03-18",
    },
    {
      id: 8,
      orderNumber: "4007",
      customerId: 8,
      items: [
        {
          productId: 13,
          quantity: 1,
          productPrice: 480000,
          totalPrice: 480000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 480000,
      orderDate: "1405-03-15",
    },
    {
      id: 9,
      orderNumber: "4008",
      customerId: 9,
      items: [
        {
          productId: 14,
          quantity: 1,
          productPrice: 550000,
          totalPrice: 550000,
        },
      ],
      orderStatus: 3,
      deliveryMethod: 0,
      orderAmount: 550000,
      orderDate: "1405-03-12",
    },
    {
      id: 10,
      orderNumber: "4009",
      customerId: 10,
      items: [
        {
          productId: 15,
          quantity: 2,
          productPrice: 98000,
          totalPrice: 196000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 196000,
      orderDate: "1405-03-10",
    },
    {
      id: 11,
      orderNumber: "4010",
      customerId: 11,
      items: [
        {
          productId: 16,
          quantity: 1,
          productPrice: 150000,
          totalPrice: 150000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 150000,
      orderDate: "1405-03-08",
    },
    {
      id: 12,
      orderNumber: "4011",
      customerId: 12,
      items: [
        {
          productId: 17,
          quantity: 1,
          productPrice: 165000,
          totalPrice: 165000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 0,
      orderAmount: 165000,
      orderDate: "1405-03-05",
    },
    {
      id: 13,
      orderNumber: "4012",
      customerId: 13,
      items: [
        {
          productId: 18,
          quantity: 1,
          productPrice: 140000,
          totalPrice: 140000,
        },
      ],
      orderStatus: 1,
      deliveryMethod: 1,
      orderAmount: 140000,
      orderDate: "1405-03-03",
    },
    {
      id: 14,
      orderNumber: "4013",
      customerId: 14,
      items: [
        {
          productId: 19,
          quantity: 1,
          productPrice: 185000,
          totalPrice: 185000,
        },
      ],
      orderStatus: 1,
      deliveryMethod: 1,
      orderAmount: 185000,
      orderDate: "1405-03-01",
    },
    {
      id: 15,
      orderNumber: "4014",
      customerId: 15,
      items: [
        {
          productId: 20,
          quantity: 1,
          productPrice: 390000,
          totalPrice: 390000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 390000,
      orderDate: "1405-02-28",
    },
    {
      id: 16,
      orderNumber: "4015",
      customerId: 16,
      items: [
        {
          productId: 21,
          quantity: 2,
          productPrice: 170000,
          totalPrice: 340000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 340000,
      orderDate: "1405-02-25",
    },
    {
      id: 17,
      orderNumber: "4016",
      customerId: 17,
      items: [
        {
          productId: 22,
          quantity: 1,
          productPrice: 125000,
          totalPrice: 125000,
        },
      ],
      orderStatus: 3,
      deliveryMethod: 1,
      orderAmount: 125000,
      orderDate: "1405-02-23",
    },
    {
      id: 18,
      orderNumber: "4017",
      customerId: 18,
      items: [
        {
          productId: 23,
          quantity: 1,
          productPrice: 240000,
          totalPrice: 240000,
        },
      ],
      orderStatus: 2,
      deliveryMethod: 0,
      orderAmount: 240000,
      orderDate: "1405-02-20",
    },
    {
      id: 19,
      orderNumber: "4018",
      customerId: 19,
      items: [
        {
          productId: 24,
          quantity: 1,
          productPrice: 210000,
          totalPrice: 210000,
        },
      ],
      orderStatus: 1,
      deliveryMethod: 1,
      orderAmount: 210000,
      orderDate: "1405-02-18",
    },
    {
      id: 20,
      orderNumber: "4019",
      customerId: 20,
      items: [
        {
          productId: 25,
          quantity: 1,
          productPrice: 195000,
          totalPrice: 195000,
        },
        {
          productId: 26,
          quantity: 1,
          productPrice: 135000,
          totalPrice: 135000,
        },
      ],
      orderStatus: 0,
      deliveryMethod: 1,
      orderAmount: 330000,
      orderDate: "1405-02-15",
    },
  ]);
  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
