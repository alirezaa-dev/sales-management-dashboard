import Button from "../../ui/Button";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";

export default function Products() {
  const { categories } = useContext(CategoryContext);
  const products = [
    {
      id: 1,
      name: "شامپو بدن مخصوص پوست چرب",
      sku: "P001",
      price: 189000,
      stock: 25,
      status: "فعال",
      categoryId: 5,
    },
    {
      id: 2,
      name: "کرم آبرسان",
      sku: "P002",
      price: 250000,
      stock: 12,
      status: "فعال",
      categoryId: 4,
    },
    {
      id: 3,
      name: "ژل شستشوی صورت",
      sku: "P003",
      price: 145000,
      stock: 0,
      status: "ناموجود",
      categoryId: 3,
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>محصولات</h2>
        <Button className="p-2 border rounded-sm mx-1 border-gray-300">
          {" "}
          <span className="text-lg pl-2 ">+</span>افزودن محصول جدید
        </Button>
      </div>

      <table className="w-full text-right bg-white rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-4 border-b border-border text-sm">
              نام محصول
            </th>
            <th className="px-4 py-4 border-b border-border text-sm">کد</th>
            <th className="px-4 py-4 border-b border-border text-sm">
              دسته‌بندی
            </th>
            <th className="px-4 py-4 border-b border-border text-sm">
              قیمت (تومان)
            </th>
            <th className="px-4 py-4 border-b border-border text-sm">موجودی</th>
            <th className="px-4 py-4 border-b border-border text-sm">وضعیت</th>
            <th className="px-4 py-4 border-b border-border text-sm">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const category = categories.find(
              (cat) => cat.id === product.categoryId,
            );
            return (
              <tr key={product.id}>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {product.name}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {product.sku}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {category?.title}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {product.price}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {product.stock}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  {product.status}
                </td>

                <td className="px-4 py-4 border-b border-border text-sm">
                  <button className="p-2 border rounded-md mx-1 border-gray-200 shadow-sm">
                    <IoEyeOutline />
                  </button>
                  <button className="p-2 border rounded-md mx-1 border-gray-200 bg-blue-100 shadow-sm">
                    <MdOutlineModeEdit className="text-primary" />
                  </button>
                  <button className="p-2 border rounded-md mx-1 border-gray-200 bg-red-100 shadow-sm">
                    <MdDeleteOutline className="text-red-400" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
