import { createContext, useState } from "react";

export const CategoryContext = createContext();
export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "بهداشت شخصی و حمام",
      parentId: null,
      isActive: true,
    },
    {
      id: 2,
      title: "مراقبت از پوست",
      parentId: null,
      isActive: true,
    },
    {
      id: 3,
      title: "مراقبت از مو",
      parentId: null,
      isActive: true,
    },
    {
      id: 4,
      title: "شوینده صورت",
      parentId: 2,
      isActive: true,
    },
    {
      id: 5,
      title: "کرم مرطوب‌کننده",
      parentId: 2,
      isActive: true,
    },
    {
      id: 6,
      title: "ضد آفتاب",
      parentId: 2,
      isActive: true,
    },
    {
      id: 7,
      title: "ماسک صورت",
      parentId: 2,
      isActive: true,
    },
    {
      id: 8,
      title: "سرم پوست",
      parentId: 2,
      isActive: true,
    },
    {
      id: 9,
      title: "شامپو بدن",
      parentId: 1,
      isActive: true,
    },
    {
      id: 10,
      title: "ژل حمام",
      parentId: 1,
      isActive: true,
    },
    {
      id: 11,
      title: "صابون",
      parentId: 1,
      isActive: true,
    },
    {
      id: 12,
      title: "شامپو مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 13,
      title: "ماسک مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 14,
      title: "نرم‌کننده مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 15,
      title: "روغن مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 16,
      title: "محصولات ضد جوش",
      parentId: 2,
      isActive: true,
    },
    {
      id: 17,
      title: "محصولات روشن‌کننده پوست",
      parentId: 2,
      isActive: false,
    },
    {
      id: 18,
      title: "بادی اسپلش",
      parentId: 1,
      isActive: true,
    },
    {
      id: 19,
      title: "دئودورانت",
      parentId: 1,
      isActive: true,
    },
    {
      id: 20,
      title: "اسکراب بدن",
      parentId: 1,
      isActive: true,
    },
    {
      id: 21,
      title: "لوسیون بدن",
      parentId: 1,
      isActive: true,
    },
    {
      id: 22,
      title: "تونر صورت",
      parentId: 2,
      isActive: true,
    },
    {
      id: 23,
      title: "پاک‌کننده آرایش",
      parentId: 2,
      isActive: true,
    },
    {
      id: 24,
      title: "کرم دور چشم",
      parentId: 2,
      isActive: true,
    },
    {
      id: 25,
      title: "محصولات ترمیم مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 26,
      title: "اسپری مو",
      parentId: 3,
      isActive: true,
    },
    {
      id: 27,
      title: "شامپو ضد ریزش",
      parentId: 3,
      isActive: true,
    },
    {
      id: 28,
      title: "شوینده بدن کودک",
      parentId: 1,
      isActive: true,
    },
    {
      id: 29,
      title: "مراقبت پوست کودک",
      parentId: 2,
      isActive: true,
    },
    {
      id: 30,
      title: "مراقبت مو کودک",
      parentId: 3,
      isActive: true,
    },
  ]);
  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}
