export default function ProductSearch({ search, setSearch }) {
  return (
    <div className="flex flex-row gap-4">
      <input
        className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
        type="text"
        placeholder="جستجوی محصول"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}