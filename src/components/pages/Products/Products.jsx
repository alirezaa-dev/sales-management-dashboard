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
import Button from "../../ui/Button";
import { formatPrice } from "../../../utils/formatPrice";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.categoryId === Number(selectedCategory);

    const matchesBrand =
      !selectedBrand || product.brandId === Number(selectedBrand);

    const matchesStatus =
      !selectedStatus ||
      (selectedStatus === "active" && product.isActive) ||
      (selectedStatus === "inactive" && !product.isActive);

    const matchesStock =
      !selectedStock ||
      (selectedStock === "in" && product.stock > 0) ||
      (selectedStock === "out" && product.stock === 0);

    const matchesMinPrice = !minPrice || product.price >= Number(minPrice);

    const matchesMaxPrice = !maxPrice || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesStatus &&
      matchesStock &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
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
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">فیلتر محصولات</h3>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedCategory("");
              setSelectedBrand("");
              setSelectedStatus("");
              setSelectedStock("");
              setMinPrice("");
              setMaxPrice("");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            پاک کردن فیلترها
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              دسته‌بندی
            </label>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">همه دسته‌ها</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">برند</label>

            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">همه برندها</option>

              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">وضعیت</label>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">موجودی</label>

            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full h-12 px-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">همه موجودی‌ها</option>
              <option value="in">دارای موجودی</option>
              <option value="out">ناموجود</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">بازه قیمت</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Min Price */}
            <div className="flex items-center h-12 border border-gray-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <span className="px-4 bg-gray-50 border-l text-sm text-gray-600 whitespace-nowrap">
                از
              </span>

              <input
                type="text"
                value={formatPrice(minPrice)}
                onChange={(e) => setMinPrice(parsePrice(e.target.value))}
                placeholder="300,000"
                className="flex-1 h-full px-3 outline-none bg-white"
              />

              <span className="px-4 text-sm text-gray-500 whitespace-nowrap">
                تومان
              </span>
            </div>

            {/* Max Price */}
            <div className="flex items-center h-12 border border-gray-200 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary">
              <span className="px-4 bg-gray-50 border-l text-sm text-gray-600 whitespace-nowrap">
                تا
              </span>

              <input
                type="text"
                value={formatPrice(maxPrice)}
                onChange={(e) => setMaxPrice(parsePrice(e.target.value))}
                placeholder="800,000"
                className="flex-1 h-full px-3 outline-none bg-white"
              />

              <span className="px-4 text-sm text-gray-500 whitespace-nowrap">
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>

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
