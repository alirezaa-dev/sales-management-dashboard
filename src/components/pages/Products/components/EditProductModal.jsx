import Button from "../../../ui/Button";
import { formatPrice, parsePrice } from "../../../../utils/formatPrice";

export default function EditProductModal({
  isOpen,
  onClose,
  name,
  setName,
  brandId,
  setBrandId,
  categoryId,
  setCategoryId,
  stock,
  setStock,
  sku,
  setSku,
  price,
  setPrice,
  isActive,
  setIsActive,
  brands,
  categories,
  onUpdate,
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
        <h3 className="mb-3">ویرایش محصول</h3>

        <label className="block mb-1">نام محصول</label>
        <input
          className="border p-2 w-full mb-2"
          placeholder="نام محصول"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-1">برند</label>

        <select
          className="border p-2 w-full mb-3"
          value={brandId}
          onChange={(e) => setBrandId(Number(e.target.value))}
        >
          <option value="">-</option>

          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>

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
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="قیمت"
          value={formatPrice(price)}
          onChange={(e) => setPrice(parsePrice(e.target.value))}
        />

        <label className="block mb-1">وضعیت</label>

        <select
          className="border p-2 w-full mb-6"
          value={isActive ? "true" : "false"}
          onChange={(e) => setIsActive(e.target.value === "true")}
        >
          <option value="true">فعال</option>
          <option value="false">غیرفعال</option>
        </select>

        <Button onClick={onUpdate}>ویرایش</Button>

        <button
          className="mr-2 px-3 py-2 cursor-pointer"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
}