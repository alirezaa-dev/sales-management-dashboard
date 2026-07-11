import { useContext, useState } from "react";
import { CategoryContext } from "../../../context/CategoryContext";
import { ProductContext } from "../../../context/ProductContext";
import { BrandContext } from "../../../context/BrandContext";
import ProductsTable from "./components/ProductsTable";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import DeleteProductModal from "./components/DeleteProductModal";
import ProductSearch from "./components/ProductSearch";
import ProductsHeader from "./components/ProductsHeader";

export default function Products() {
  const { categories } = useContext(CategoryContext);
  const { products, setProducts } = useContext(ProductContext);
  const { brands } = useContext(BrandContext);
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false);
  const [isOpenModalEditProduct, setIsOpenModalEditProduct] = useState(false);
  const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] =
    useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  function resetForm() {
    setName("");
    setBrandId("");
    setSku("");
    setPrice("");
    setStock("");
    setCategoryId("");
    setIsActive(true);
    setSelectedProductId(null);
  }
  function validateForm() {
    if (!name.trim() || !sku.trim() || !price || !stock || !categoryId) {
      alert("لطفاً همه فیلدها را تکمیل کنید.");
      return false;
    }

    return true;
  }
  function openEditModal(product) {
    setSelectedProductId(product.id);
    setName(product.name);
    setBrandId(product.brandId);
    setSku(product.sku);
    setPrice(product.price);
    setStock(product.stock);
    setCategoryId(product.categoryId);
    setIsActive(product.isActive);
    setIsOpenModalEditProduct(true);
  }
  function openDeleteModal(id) {
    setSelectedProductId(id);
    setIsOpenModalDeleteProduct(true);
  }

  function addProduct() {
    if (!validateForm()) return;

    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        name: name.trim(),
        sku: sku.trim(),
        price: Number(price),
        stock: Number(stock),
        isActive: true,
        brandId: Number(brandId),
        categoryId: Number(categoryId),
      },
    ]);

    resetForm();
    setCategoryId(categories[0]?.id || "");

    setIsOpenModalAddProduct(false);
  }
  function updateProduct() {
    if (!validateForm()) return;

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
              brandId: Number(brandId),
              isActive,
            }
          : product,
      ),
    );

    resetForm();

    setIsOpenModalEditProduct(false);
  }
  function deleteProduct() {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProductId));

    setSelectedProductId(null);
    setIsOpenModalDeleteProduct(false);
  }
  return (
    <>
      {/* Header */}
      <ProductsHeader onAddProduct={() => setIsOpenModalAddProduct(true)} />

      {/* Search */}
      <ProductSearch search={search} setSearch={setSearch} />

      {/* Table */}
      <ProductsTable
        products={filteredProducts}
        categories={categories}
        brands={brands}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isOpenModalAddProduct}
        onClose={() => setIsOpenModalAddProduct(false)}
        name={name}
        setName={setName}
        brandId={brandId}
        setBrandId={setBrandId}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        stock={stock}
        setStock={setStock}
        sku={sku}
        setSku={setSku}
        price={price}
        setPrice={setPrice}
        brands={brands}
        categories={categories}
        onAdd={addProduct}
      />
      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isOpenModalEditProduct}
        onClose={() => setIsOpenModalEditProduct(false)}
        name={name}
        setName={setName}
        brandId={brandId}
        setBrandId={setBrandId}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        stock={stock}
        setStock={setStock}
        sku={sku}
        setSku={setSku}
        price={price}
        setPrice={setPrice}
        isActive={isActive}
        setIsActive={setIsActive}
        brands={brands}
        categories={categories}
        onUpdate={updateProduct}
      />
      {/* Delete Product Modal */}
      <DeleteProductModal
        isOpen={isOpenModalDeleteProduct}
        onClose={() => setIsOpenModalDeleteProduct(false)}
        onDelete={deleteProduct}
      />
    </>
  );
}
