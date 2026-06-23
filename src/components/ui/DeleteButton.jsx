export default function DeleteButton({ children, onClick }) {
  return (
    <button
      className="px-4 py-2 rounded-md text-white bg-red-500 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
