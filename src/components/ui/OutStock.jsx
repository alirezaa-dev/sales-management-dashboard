export default function OutStock({ stock }) {
  if (stock > 0) return null;

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-orange-50 text-orange-700">
      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
      ناموجود
    </span>
  );
}