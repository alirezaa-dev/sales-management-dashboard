import React, { useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import ActiveStatus from "../../ui/ActiveStatus";

export default function Categories() {
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false);
  const [isOpenModalEditCategory, setIsOpenModalEditCategory] = useState(false);
  const [isOpenModalDeleteCategory, setIsOpenModalDeleteCategory] =
    useState(false);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [parentId, setParentId] = useState(0);
  const [nextId, setNextId] = useState(6);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const getParentCategory = (parentId) => {
    return categories.find((cat) => cat.id === parentId);
  };

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

  function resetForm() {
    setTitle("");
    setParentId(0);
    setIsActive(true);
  }
  function addCategory() {
    if (!title.trim()) {
      alert("لطفا نام دسته بندی را وارد کنید");
      return;
    }

    const newCategory = {
      id: nextId,
      title,
      parentId: parentId === 0 ? null : parentId,
      isActive: true,
    };

    setCategories((prev) => [...prev, newCategory]);
    setNextId((prev) => prev + 1);
    resetForm();
    setIsOpenModalAddCategory(false);
  }
  function updateCategory() {
    if (!title.trim()) {
      alert("لطفا نام دسته بندی را وارد کنید");
      return;
    }
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCategoryId
          ? {
              ...c,
              title,
              parentId: parentId === 0 ? null : parentId,
              isActive,
            }
          : c,
      ),
    );
    resetForm();
    setSelectedCategoryId(null);
    setIsOpenModalEditCategory(false);
  }
  function deleteCategory() {
    setCategories((prev) => prev.filter((c) => c.id !== selectedCategoryId));
    setSelectedCategoryId(null);
    setIsOpenModalDeleteCategory(false);
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-bold">مدیریت دسته‌بندی‌ها</h2>

        <Button onClick={() => setIsOpenModalAddCategory(true)}>
          <span className="text-lg pl-2">+</span>
          افزودن دسته‌بندی جدید
        </Button>
      </div>
      {/* TABLE */}
      <div className="bg-white rounded-md">
        <table className="w-full text-right rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b border-gray-100">شماره</th>
              <th className="px-4 py-4 border-b border-gray-100">
                {" "}
                نام دسته‌بندی
              </th>
              <th className="px-4 py-4 border-b border-gray-100">
                دسته‌بندی اصلی
              </th>
              <th className="px-4 py-4 border-b border-gray-100">
                تعداد محصولات
              </th>
              <th className="px-4 py-4 border-b border-gray-100">وضعیت</th>
              <th className="px-4 py-4 border-b border-gray-100">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 border-b border-gray-100">
                  {category.id}
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  {category.title}
                </td>
                <td className="px-4 py-3 border-b border-gray-100">
                  {getParentCategory(category.parentId)?.title || "-"}
                </td>
                <td className="px-4 py-3 border-b border-gray-100">1</td>
                <td className="px-4 py-3 border-b border-gray-100">
                  {<ActiveStatus status={category.isActive} />}
                </td>

                <td className="px-4 py-3 border-b border-gray-100">
                  <button
                    className="p-2 mx-1 rounded-md bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setTitle(category.title);
                      setParentId(category.parentId ?? 0);
                      setIsOpenModalEditCategory(true);
                      setIsActive(category.isActive);
                    }}
                  >
                    <MdOutlineModeEdit className="text-blue-600" />
                  </button>

                  <button
                    className="p-2 mx-1 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => {
                      setIsOpenModalDeleteCategory(true);
                      setSelectedCategoryId(category.id);
                    }}
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {isOpenModalAddCategory && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsOpenModalAddCategory(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">افزودن دسته‌بندی</h3>
            <label className="block mb-1">نام دسته‌بندی</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام دسته‌بندی"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-1">دسته‌بندی اصلی</label>

            <select
              className="border p-2 w-full mb-3"
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
            >
              <option value={0}>هیچکدام</option>

              {categories
                .filter((cat) => cat.parentId === null)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </select>

            <Button onClick={addCategory}>اضافه کردن</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalAddCategory(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
      {/* Add Category Modal */}
      {isOpenModalEditCategory && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsOpenModalEditCategory(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">ویرایش دسته‌بندی</h3>
            <label className="block mb-1">نام دسته‌بندی</label>
            <input
              className="border p-2 w-full mb-6"
              placeholder="نام دسته‌بندی"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-1">دسته‌بندی اصلی</label>

            <select
              className="border p-2 w-full mb-6"
              value={parentId}
              onChange={(e) => setParentId(Number(e.target.value))}
            >
              <option value={0}>هیچکدام</option>

              {categories
                .filter((cat) => cat.parentId === null)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
            </select>
            <label className="block mb-1">وضعیت</label>
            <select
              className="border p-2 w-full mb-6"
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">فعال</option>
              <option value="false">غیرفعال</option>
            </select>

            <Button onClick={updateCategory}>ویرایش</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalEditCategory(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isOpenModalDeleteCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <p className="mb-3">آیا از حذف دسته‌بندی مطمئن هستید؟</p>

            <DeleteButton onClick={deleteCategory}>حذف</DeleteButton>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsOpenModalDeleteCategory(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
