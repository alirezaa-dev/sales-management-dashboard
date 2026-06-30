import { useContext, useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import ActiveStatus from "../../ui/ActiveStatus";
import { BrandContext } from "../../../context/BrandContext";
import { ProductContext } from "../../../context/ProductContext";

export default function Brands() {
  const { brands, setBrands } = useContext(BrandContext);
  const { products } = useContext(ProductContext);

  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [enTitle, setEnTitle] = useState("");
  const [search, setSearch] = useState("");

  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const [nextId, setNextId] = useState(4);

  const countProducts = (brandId) =>
    products.filter((product) => product.brandId === brandId).length;

  const filteredBrands = brands.filter((brand) =>
    brand.title.toLowerCase().includes(search.toLowerCase()),
  );

  function resetForm() {
    setTitle("");
    setEnTitle("");
    setIsActive(true);
  }

  function addBrand() {
    if (!title.trim()) {
      alert("لطفا نام برند را وارد کنید");
      return;
    }

    const newBrand = {
      id: nextId,
      title,
      enTitle,
      isActive: true,
    };

    setBrands((prev) => [...prev, newBrand]);
    setNextId((prev) => prev + 1);

    resetForm();
    setIsModalOpenAdd(false);
  }

  function updateBrand() {
    if (!title.trim()) {
      alert("لطفا نام برند را وارد کنید");
      return;
    }

    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === selectedBrandId
          ? {
              ...brand,
              title,
              isActive,
            }
          : brand,
      ),
    );

    resetForm();
    setSelectedBrandId(null);
    setIsModalOpenEdit(false);
  }

  function deleteBrand() {
    setBrands((prev) => prev.filter((brand) => brand.id !== selectedBrandId));

    setSelectedBrandId(null);
    setIsModalOpenDelete(false);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-bold">مدیریت برندها</h2>

        <Button onClick={() => setIsModalOpenAdd(true)}>
          <span className="text-lg pl-2">+</span>
          افزودن برند جدید
        </Button>
      </div>
      {/* Search */}
      <div className="flex flex-row gap-4">
        <input
          className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
          type="text"
          placeholder="جستجوی برند"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-md bg-white">
        <table className="w-full text-right border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
                شماره
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
                نام برند
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
                تعداد محصولات
              </th>

              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {brand.id}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {brand.title}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {countProducts(brand.id)}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-md bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setSelectedBrandId(brand.id);
                        setTitle(brand.title);
                        setIsActive(brand.isActive);
                        setEnTitle(brand.enTitle);
                        setIsModalOpenEdit(true);
                      }}
                    >
                      <MdOutlineModeEdit className="text-blue-600" />
                    </button>

                    <button
                      className="p-2 rounded-md bg-red-100 cursor-pointer"
                      onClick={() => {
                        setSelectedBrandId(brand.id);
                        setIsModalOpenDelete(true);
                      }}
                    >
                      <MdDeleteOutline className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Brand Modal */}
      {isModalOpenAdd && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsModalOpenAdd(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">افزودن برند</h3>
            <label className="block mb-1">نام فارسی برند</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام فارسی برند"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-1">نام اتگلیسی برند</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام انگلیسی برند"
              value={enTitle}
              onChange={(e) => setEnTitle(e.target.value)}
            />

            <Button onClick={addBrand}>اضافه کردن</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpenAdd(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
      {/* Edit Category Modal */}
      {isModalOpenEdit && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setIsModalOpenEdit(false)}
        >
          <div
            className="bg-white p-4 rounded-md w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-3">ویرایش دسته‌بندی</h3>
            <label className="block mb-1">نام فارسی برند</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام فارسی برند"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-1">نام اتگلیسی برند</label>
            <input
              className="border p-2 w-full mb-2"
              placeholder="نام انگلیسی برند"
              value={enTitle}
              onChange={(e) => setEnTitle(e.target.value)}
            />
            <Button onClick={updateBrand}>ویرایش</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpenEdit(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isModalOpenDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <p className="mb-3">آیا از حذف دسته‌بندی مطمئن هستید؟</p>

            <DeleteButton onClick={deleteBrand}>حذف</DeleteButton>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpenDelete(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
