import { formatPrice } from "../../../../../utils/formatPrice";
export default function ProductSelector({
  productSearch,
  setProductSearch,
  showProducts,
  setShowProducts,
  filteredProducts,
  selectedProducts,
  addProductToOrder,
  setShowCustomers,
}) {
  return (
    <div className="relative mb-6">
      <label className="block mb-2 text-sm font-medium">محصولات</label>

      <div className="relative">
        <input
          type="text"
          placeholder="جستجوی محصول..."
          value={productSearch}
          onFocus={() => setShowProducts(true)}
          onChange={(e) => {
            setProductSearch(e.target.value);
            setShowProducts(true);
            setShowCustomers(false);
          }}
          className="w-full border rounded-md p-2 pr-10 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {showProducts && (
          <button
            type="button"
            onClick={() => setShowProducts(false)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {showProducts && (
        <div className="absolute bottom-full mb-1 left-0 right-0 bg-gray-100 border border-gray-200 rounded-md shadow-xl max-h-72 overflow-y-auto flex flex-col-reverse z-[100]">
          {filteredProducts.map((product) => {
            const selected = selectedProducts.some((p) => p.id === product.id);

            return (
              <div
                key={product.id}
                onClick={() => {
                  addProductToOrder(product);
                  setShowProducts(false);
                }}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-gray-200 transition gap-8
                  ${selected ? "bg-blue-50" : "hover:bg-gray-50"}
                  ${product.stock === 0 && "opacity-50 cursor-not-allowed"}
                `}
              >
                <div>
                  <div className="flex items-center gap-2 w-3/5 text-right">
                    {selected && (
                      <span className="text-green-600 font-bold">✔</span>
                    )}

                    <span className="font-medium text-sm">{product.name}</span>
                  </div>
                </div>

                <div className="flex gap-8 text-sm text-right w-1/2">
                  <span
                    className={
                      product.stock ? "text-green-500" : "text-red-600"
                    }
                  >
                    {product.stock ? `موجودی : ${product.stock}` : "ناموجود"}
                  </span>

                  <span className="font-medium text-sm w-1/2 text-left">
                    {formatPrice(product.price)} تومان
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
