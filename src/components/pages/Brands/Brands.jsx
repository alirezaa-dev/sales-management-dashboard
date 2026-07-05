import { useContext, useState } from "react";
import { BrandContext } from "../../../context/BrandContext";
import { ProductContext } from "../../../context/ProductContext";
import BrandsTable from "./components/BrandsTable";
import AddBrandModal from "./components/AddBrandModal";
import EditBrandModal from "./components/EditBrandModal";
import DeleteBrandModal from "./components/DeleteBrandModal";
import BrandSearch from "./components/BrandSearch";
import BrandsHeader from "./components/BrandsHeader";

export default function Brands() {
  // Contexts
  const { brands, setBrands } = useContext(BrandContext);
  const { products } = useContext(ProductContext);

  // States
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const [title, setTitle] = useState("");
  const [enTitle, setEnTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const brandsWithRowNumber = brands
    .filter((brand) => brand.title.toLowerCase().includes(search.toLowerCase()))
    .map((brand, index) => ({
      ...brand,
      rowNumber: index + 1,
    }));

  const countProducts = (brandId) =>
    products.filter((product) => product.brandId === brandId).length;

  // Helper Functions
  function resetForm() {
    setTitle("");
    setEnTitle("");
    setIsActive(true);
    setSelectedBrandId(null);
  }

  // CRUD Functions
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

  // Event Handlers
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
      {/* Header */}
      <BrandsHeader onAddBrand={() => setIsModalOpenAdd(true)} />
      {/* Search */}
      <BrandSearch search={search} setSearch={setSearch} />

      {/* Table */}

      <BrandsTable
        brands={brandsWithRowNumber}
        countProducts={countProducts}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      {/* Add Brand Modal */}
      <AddBrandModal
        isOpen={isModalOpenAdd}
        onClose={() => {
          resetForm();
          setIsModalOpenAdd(false);
        }}
        onAdd={addBrand}
        title={title}
        setTitle={setTitle}
        enTitle={enTitle}
        setEnTitle={setEnTitle}
      />
      {/* Edit Category Modal */}
      <EditBrandModal
        isOpen={isModalOpenEdit}
        onClose={() => {
          resetForm();
          setIsModalOpenEdit(false);
        }}
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
        onClose={() => {
          resetForm();
          setIsModalOpenDelete(false);
        }}
        onDelete={deleteBrand}
      />
    </>
  );
}
