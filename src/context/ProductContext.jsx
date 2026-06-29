import { createContext, useState } from "react";

export const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "شامپو بدن مخصوص پوست چرب",
      sku: "P001",
      price: 189000,
      stock: 25,
      isActive: true,
      categoryId: 5,
    },
    {
      id: 2,
      name: "کرم آبرسان",
      sku: "P002",
      price: 250000,
      stock: 12,
      isActive: true,
      categoryId: 4,
    },
    {
      id: 3,
      name: "ژل شستشوی صورت",
      sku: "P003",
      price: 145000,
      stock: 0,
      isActive: false,
      categoryId: 3,
    },
  ]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
