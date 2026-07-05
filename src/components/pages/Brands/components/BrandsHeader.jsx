import Button from "../../../ui/Button";

export default function BrandsHeader({ onAddBrand }) {
  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <h2 className="text-lg font-bold">مدیریت برندها</h2>

      <Button onClick={onAddBrand}>
        <span className="text-lg pl-2">+</span>
        افزودن برند جدید
      </Button>
    </div>
  );
}