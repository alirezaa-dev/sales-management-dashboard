import Button from "../../../ui/Button";

export default function ProductsHeader({ onAddProduct }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <h2>محصولات</h2>

      <Button
        className="p-2 border rounded-sm mx-1 border-gray-300"
        onClick={onAddProduct}
      >
        <span className="text-lg pl-2">+</span>
        افزودن محصول جدید
      </Button>
    </div>
  );
}