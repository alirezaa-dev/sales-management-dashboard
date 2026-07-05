import Button from "../../../ui/Button";

export default function AddBrandModal({
  isOpen,
  onClose,
  onAdd,
  title,
  setTitle,
  enTitle,
  setEnTitle,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
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

        <label className="block mb-1">نام انگلیسی برند</label>
        <input
          className="border p-2 w-full mb-2"
          placeholder="نام انگلیسی برند"
          value={enTitle}
          onChange={(e) => setEnTitle(e.target.value)}
        />

        <Button onClick={onAdd}>اضافه کردن</Button>

        <button className="mr-2 px-3 py-2 cursor-pointer" onClick={onClose}>
          بستن
        </button>
      </div>
    </div>
  );
}
