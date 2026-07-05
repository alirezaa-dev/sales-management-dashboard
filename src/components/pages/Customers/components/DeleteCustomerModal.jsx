import DeleteButton from "../../../ui/DeleteButton";

export default function DeleteCustomerModal({
  isOpen,
  onClose,
  onDelete,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md w-96">
        <p className="mb-3">آیا از حذف مشتری مطمئن هستید؟</p>

        <DeleteButton onClick={onDelete}>حذف</DeleteButton>

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