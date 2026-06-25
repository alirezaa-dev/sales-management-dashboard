import React from "react";
import Button from "../../../ui/Button";

export default function AddCatrgoryModal({
  isOpen,
  onClose,
  title,
  setName,
  onAdd,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-md w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3">افزودن دسته‌بندی</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="نام دسته‌بندی"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

    <select >
        <option value="-">هیچکدام</option>
    </select>

        <Button onClick={onAdd}>ثبت</Button>

        <button className="mr-2 px-3 py-2 cursor-pointer" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
}
