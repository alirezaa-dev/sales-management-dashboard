import Button from "../../ui/Button";
import React, { useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";
import { ProductContext } from "../../../context/ProductContext";
import ActiveStatus from "../../ui/ActiveStatus";
import OutStock from "../../ui/OutStock";
import DeleteButton from "../../ui/DeleteButton";

export default function Products() {
  const { categories } = useContext(CategoryContext);
  const { products, setProducts } = useContext(ProductContext);
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
  const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] =
    useState(false);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [nextId, setNextId] = useState(4);
  const [selectedProductId, setSelectedProductId] = useState(null);

  function addProduct() {
    if (!name.trim() || !sku.trim() || !price || !stock || !categoryId) {
      alert("لطفاً همه فیلدها را تکمیل کنید.");
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        id: nextId,
        name: name.trim(),
        sku: sku.trim(),
        price: Number(price),
        stock: Number(stock),
        isActive: true,
        categoryId: Number(categoryId),
      },
    ]);

    setNextId((prev) => prev + 1);

    setName("");
    setSku("");
    setPrice("");
    setStock("");
    setCategoryId(categories[0]?.id || "");

    setIsOpenModalAddProduct(false);
  }
  function updateProduct() {
    if (!name.trim() || !sku.trim() || !price || !stock || !categoryId) {
      alert("لطفاً همه فیلدها را تکمیل کنید.");
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProductId
          ? {
              ...product,
              name: name.trim(),
              sku: sku.trim(),
              price: Number(price),
              stock: Number(stock),
              categoryId: Number(categoryId),
              isActive,
            }
          : product,
      ),
    );

    setName("");
    setSku("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setIsActive(true);
    setSelectedProductId(null);

    setIsOpenModalEditProduct(false);
  }
  function deleteProduct() {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));

    setSelectedProductId(null);
    setIsOpenModalDeleteProduct(false);
  }
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>محصولات</h2>
        <Button
          className="p-2 border rounded-sm mx-1 border-gray-300"
          onClick={() => setIsOpenModalAddProduct(true)}
        >
          {" "}
          <span className="text-lg pl-2 ">+</span>افزودن محصول جدید
        </Button>
      </div>

      <table className="w-full text-right bg-white rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-4 border-b border-border text-sm">شماره </th>
            <th className="px-4 py-4 border-b border-border text-sm">
              نام محصول
            </th>
            <th className="px-4 py-4 border-b border-border text-sm">شناسه</th>
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
                  {product.id}
                </td>
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
                  {product.stock > 0 ? product.stock : <OutStock />}
                </td>
                <td className="px-4 py-4 border-b border-border text-sm">
                  <ActiveStatus status={product.isActive} />
                </td>

                <td className="px-4 py-4 border-b border-border text-sm">
                  <button
                    className="p-2 border rounded-md mx-1 border-gray-200 bg-blue-100 shadow-sm cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setName(product.name);
                      setSku(product.sku);
                      setPrice(product.price);
                      setStock(product.stock);
                      setCategoryId(product.categoryId);
                      setIsActive(product.isActive);
                      setIsOpenModalEditProduct(true);
                    }}
                  >
                    <MdOutlineModeEdit className="text-primary" />
                  </button>
                  <button
                    className="p-2 border rounded-md mx-1 border-gray-200 bg-red-100 shadow-sm cursor-pointer"
                    onClick={() => {
                      setIsOpenModalDeleteProduct(true);
                      setSelectedProductId(product.id);
                    }}
                  >
                    <MdDeleteOutline className="text-red-400" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Add Product Modal */}
      {isOpenModalAddProduct && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsOpenModalAddProduct(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">افزودن محصول</h3>
            <label className="block mb-1">نام محصول</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام  محصول"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-1">دسته‌بندی</label>

            <select
              className="border p-2 w-full mb-3"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <label className="block mb-1">موجودی</label>
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="تعداد"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label className="block mb-1">شناسه</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="شناسه"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <label className="block mb-1">قیمت (تومان)</label>
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="قیمت"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Button onClick={addProduct}>اضافه کردن</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalAddProduct(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
      {/* Edit Product Modal */}
      {isOpenModalEditProduct && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsOpenModalEditProduct(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">افزودن محصول</h3>
            <label className="block mb-1">نام محصول</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام  محصول"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block mb-1">دسته‌بندی</label>

            <select
              className="border p-2 w-full mb-3"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <label className="block mb-1">موجودی</label>
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="تعداد"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
            <label className="block mb-1">شناسه</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="شناسه"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <label className="block mb-1">قیمت (تومان)</label>
            <input
              type="number"
              className="border p-2 w-full mb-2"
              placeholder="قیمت"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label className="block mb-1">وضعیت</label>
            <select
              className="border p-2 w-full mb-6"
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true" className="text-green-700">
                فعال
              </option>
              <option value="false" className="text-red-700">
                غیرفعال
              </option>
            </select>

            <Button onClick={updateProduct}>ویرایش</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalEditProduct(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
      {/* Delete Product Modal */}
      {isOpenModalDeleteProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <p className="mb-3">آیا از حذف محصول مطمئن هستید؟</p>

            <DeleteButton onClick={deleteProduct}>حذف</DeleteButton>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalDeleteProduct(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
