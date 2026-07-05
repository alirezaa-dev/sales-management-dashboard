export default function CustomersFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-row gap-4">
      <input
        className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
        type="text"
        placeholder="جستجوی نام یا شماره موبایل"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="h-12 px-3 border border-gray-200 rounded bg-white"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">مرتب‌سازی</option>
        <option value="highestScore">بیشترین امتیاز</option>
        <option value="lowestScore">کمترین امتیاز</option>
        <option value="newestJoinDate">جدیدترین عضویت</option>
        <option value="oldestJoinDate">قدیمی‌ترین عضویت</option>
      </select>
    </div>
  );
}