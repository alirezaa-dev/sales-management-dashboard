import Button from "../../../ui/Button";

export default function CustomersHeader({ onAdd }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-bold">مشتری‌ها</h2>

      <Button onClick={onAdd}>
        <span className="text-lg pl-2">+</span>
        افزودن مشتری جدید
      </Button>
    </div>
  );
}