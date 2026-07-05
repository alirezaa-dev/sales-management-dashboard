import DeleteButton from "../../../ui/DeleteButton";

export default function DeleteBrandModal({
  isOpen,
  onClose,
  onDelete,
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
        <p className="mb-3">
          آیا از حذف این برند مطمئن هستید؟
        </p>

        <DeleteButton onClick={onDelete}>
          حذف
        </DeleteButton>

        <button
          className="mr-2 px-3 py-2 cursor-pointer"
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
}