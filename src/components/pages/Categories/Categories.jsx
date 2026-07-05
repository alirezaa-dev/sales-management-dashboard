import { useContext, useState } from "react";
import { CategoryContext } from "../../../context/CategoryContext";
import { ProductContext } from "../../../context/ProductContext";

import CategoriesHeader from "./components/CategoriesHeader";
import CategorySearch from "./components/CategorySearch";
import CategoriesTable from "./components/CategoriesTable";
import AddCategoryModal from "./components/AddCategoryModal";
import EditCategoryModal from "./components/EditCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

export default function Categories() {
  // Context
  const { categories, setCategories } = useContext(CategoryContext);
  const { products } = useContext(ProductContext);

  // Search
  const [search, setSearch] = useState("");

  // Form
  const [title, setTitle] = useState("");
  const [parentId, setParentId] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Modals
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false);
  const [isOpenModalEditCategory, setIsOpenModalEditCategory] = useState(false);
  const [isOpenModalDeleteCategory, setIsOpenModalDeleteCategory] =
    useState(false);

  // Derived Data
  const filteredCategories = categories
    .filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase()),
    )
    .map((category, index) => ({
      ...category,
      rowNumber: index + 1,
    }));

  // Helpers
  const countProducts = (categoryId) =>
    products.filter((product) => product.categoryId === categoryId).length;

  const getParentCategory = (parentId) =>
    categories.find((category) => category.id === parentId);

  // CRUD
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

    const nextId =
      categories.length > 0
        ? Math.max(...categories.map((category) => category.id)) + 1
        : 1;

    const newCategory = {
      id: nextId,
      title,
      parentId: parentId === 0 ? null : parentId,
      isActive: true,
    };

    setCategories((prev) => [...prev, newCategory]);

    resetForm();
    setIsOpenModalAddCategory(false);
  }

  function updateCategory() {
    if (!title.trim()) {
      alert("لطفا نام دسته بندی را وارد کنید");
      return;
    }

    setCategories((prev) =>
      prev.map((category) =>
        category.id === selectedCategoryId
          ? {
              ...category,
              title,
              parentId: parentId === 0 ? null : parentId,
              isActive,
            }
          : category,
      ),
    );

    resetForm();
    setSelectedCategoryId(null);
    setIsOpenModalEditCategory(false);
  }

  function deleteCategory() {
    setCategories((prev) =>
      prev.filter((category) => category.id !== selectedCategoryId),
    );

    setSelectedCategoryId(null);
    setIsOpenModalDeleteCategory(false);
  }

  // Handlers
  function handleEdit(category) {
    setSelectedCategoryId(category.id);
    setTitle(category.title);
    setParentId(category.parentId ?? 0);
    setIsActive(category.isActive);

    setIsOpenModalEditCategory(true);
  }

  function handleDelete(categoryId) {
    setSelectedCategoryId(categoryId);
    setIsOpenModalDeleteCategory(true);
  }

  return (
    <>
      <CategoriesHeader onAddCategory={() => setIsOpenModalAddCategory(true)} />

      <CategorySearch search={search} setSearch={setSearch} />

      <CategoriesTable
        categories={filteredCategories}
        getParentCategory={getParentCategory}
        countProducts={countProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddCategoryModal
        isOpen={isOpenModalAddCategory}
        onClose={() => setIsOpenModalAddCategory(false)}
        title={title}
        setTitle={setTitle}
        parentId={parentId}
        setParentId={setParentId}
        categories={categories}
        onSubmit={addCategory}
      />

      <EditCategoryModal
        isOpen={isOpenModalEditCategory}
        onClose={() => setIsOpenModalEditCategory(false)}
        title={title}
        setTitle={setTitle}
        parentId={parentId}
        setParentId={setParentId}
        categories={categories}
        isActive={isActive}
        setIsActive={setIsActive}
        onSubmit={updateCategory}
      />

      <DeleteCategoryModal
        isOpen={isOpenModalDeleteCategory}
        onClose={() => setIsOpenModalDeleteCategory(false)}
        onDelete={deleteCategory}
      />
    </>
  );
}
