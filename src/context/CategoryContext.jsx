import { createContext, useState } from "react";

export const CategoryContext = createContext();
export function CategoryProvider({children}) {
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
      title: "شوینده صورت",
      parentId: 2,
      isActive: true,
    },
    {
      id: 4,
      title: "کرم مرطوب کننده",
      parentId: 2,
      isActive: false,
    },
    {
      id: 5,
      title: "شامپو بدن",
      parentId: 1,
      isActive: true,
    },
  ]);
  return(
    <CategoryContext.Provider
    value={{categories , setCategories}}
    >
{children}
    </CategoryContext.Provider>
)
}

