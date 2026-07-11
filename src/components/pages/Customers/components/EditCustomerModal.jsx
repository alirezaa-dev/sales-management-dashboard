import React from "react";
import Button from "../../../ui/Button";
import { formatNumber, parseNumber } from "../../../../utils/formatNumber";

export default function EditCustomerModal({
  isOpen,
  onClose,
  name,
  setName,
  phone,
  setPhone,
  onEdit,
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
        <h3 className="mb-3">ویرایش مشتری</h3>

        <input
          className="border p-2 w-full mb-2"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="موبایل"
          value={formatNumber(phone)}
          onChange={(e) => setPhone(parseNumber(e.target.value))}
        />

        <Button onClick={onEdit}>ویرایش</Button>

        <button className="mr-2 px-3 py-2 cursor-pointer" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
}
