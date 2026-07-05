import { useContext, useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import ActiveStatus from "../../ui/ActiveStatus";
import { BrandContext } from "../../../context/BrandContext";
import { ProductContext } from "../../../context/ProductContext";
import BrandsTable from "./components/BrandsTable";
import AddBrandModal from "./components/AddBrandModal";
import EditBrandModal from "./components/EditBrandModal";
import DeleteBrandModal from "./components/DeleteBrandModal";

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

  const countProducts = (brandId) =>
    products.filter((product) => product.brandId === brandId).length;

  const filteredBrands = brands.filter((brand) =>
    brand.title.toLowerCase().includes(search.toLowerCase()),
  );

  function resetForm() {
    setTitle("");
    setEnTitle("");
    setIsActive(true);
    setSelectedBrandId(null);
  }

  function addBrand() {
    if (!title.trim()) {
      alert("لطفا نام برند را وارد کنید");
      return;
    }

    const newBrand = {
      id: Math.max(...brands.map((brand) => brand.id), 0) + 1,
      title,
      enTitle,
      isActive: true,
    };

    setBrands((prev) => [...prev, newBrand]);
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
              enTitle,
              isActive,
            }
          : brand,
      ),
    );

    resetForm();
    setIsModalOpenEdit(false);
  }

  function deleteBrand() {
    setBrands((prev) => prev.filter((brand) => brand.id !== selectedBrandId));

    resetForm();
    setIsModalOpenDelete(false);
  }
  function handleEditClick(brand) {
    setSelectedBrandId(brand.id);
    setTitle(brand.title);
    setEnTitle(brand.enTitle);
    setIsActive(brand.isActive);
    setIsModalOpenEdit(true);
  }

  function handleDeleteClick(id) {
    setSelectedBrandId(id);
    setIsModalOpenDelete(true);
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

      {/* Table */}

      <BrandsTable
        brands={filteredBrands}
        countProducts={countProducts}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      {/* Add Brand Modal */}
      <AddBrandModal
        isOpen={isModalOpenAdd}
        onClose={() => setIsModalOpenAdd(false)}
        onAdd={addBrand}
        title={title}
        setTitle={setTitle}
        enTitle={enTitle}
        setEnTitle={setEnTitle}
      />
      {/* Edit Category Modal */}
      <EditBrandModal
        isOpen={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
        onSubmit={updateBrand}
        title={title}
        setTitle={setTitle}
        enTitle={enTitle}
        setEnTitle={setEnTitle}
        isActive={isActive}
        setIsActive={setIsActive}
      />

      {/* Delete Modal */}
      <DeleteBrandModal
        isOpen={isModalOpenDelete}
        onClose={() => setIsModalOpenDelete(false)}
        onDelete={deleteBrand}
      />
    </>
  );
}
