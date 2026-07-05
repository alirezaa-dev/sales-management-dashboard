import { createContext, useState } from "react";

export const CustomerContext = createContext();
export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "علیرضا دهقان بنادکی",
      phone: "09365534123",
      score: 120,
      joinDate: "1405-03-20",
    },
    {
      id: 2,
      name: "مریم احمدی",
      phone: "09123456789",
      score: 80,
      joinDate: "1405-03-15",
    },
    {
      id: 3,
      name: "مبینا علمدار",
      phone: "09351230001",
      score: 210,
      joinDate: "1405-02-01",
    },
    {
      id: 4,
      name: "سید کاظم رضایی",
      phone: "09180001122",
      score: 250,
      joinDate: "1405-02-28",
    },
    {
      id: 5,
      name: "محمد رضایی",
      phone: "09350001122",
      score: 95,
      joinDate: "1405-01-10",
    },
    {
      id: 6,
      name: "هدی سلمانزاده",
      phone: "09121112233",
      score: 60,
      joinDate: "1405-01-18",
    },
    {
      id: 7,
      name: "زهرا کریمی",
      phone: "09352223344",
      score: 330,
      joinDate: "1404-12-25",
    },
    {
      id: 8,
      name: "حمیده قاضی",
      phone: "09214567890",
      score: 310,
      joinDate: "1404-12-25",
    },
    {
      id: 9,
      name: "حسین موسوی",
      phone: "09301112233",
      score: 140,
      joinDate: "1405-03-05",
    },
    {
      id: 10,
      name: "نگار صالحی",
      phone: "09031234567",
      score: 95,
      joinDate: "1405-03-05",
    },
    {
      id: 11,
      name: "آتوسا صالحی",
      phone: "09132223344",
      score: 410,
      joinDate: "1404-11-17",
    },
    {
      id: 12,
      name: "امیرحسین قاسمی",
      phone: "09129876543",
      score: 180,
      joinDate: "1405-02-10",
    },
    {
      id: 13,
      name: "عرفان میرحسینی",
      phone: "09399887766",
      score: 75,
      joinDate: "1405-03-12",
    },
    {
      id: 14,
      name: "فاطمه نادری",
      phone: "09384561234",
      score: 40,
      joinDate: "1405-01-22",
    },
    {
      id: 15,
      name: "سهیلا جهانبازی",
      phone: "09110002233",
      score: 220,
      joinDate: "1404-12-08",
    },
    {
      id: 16,
      name: "علی اکبری",
      phone: "09901234567",
      score: 500,
      joinDate: "1404-11-17",
    },
    {
      id: 17,
      name: "ماهان کمال‌زاده",
      phone: "09357778899",
      score: 125,
      joinDate: "1405-03-25",
    },
    {
      id: 18,
      name: "سمیه ابوتراب",
      phone: "09155667788",
      score: 75,
      joinDate: "1405-03-12",
    },
    {
      id: 19,
      name: "آرزو محمدی",
      phone: "09314445566",
      score: 260,
      joinDate: "1405-02-19",
    },
    {
      id: 20,
      name: "پدرام یوسفی",
      phone: "09227894561",
      score: 145,
      joinDate: "1405-02-06",
    },
  ]);
  return (
    <CustomerContext.Provider value={{ customers, setCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
}
