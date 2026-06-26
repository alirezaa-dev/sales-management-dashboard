export default function ActiveStatus({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm ${
        status
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          status ? "bg-green-600" : "bg-red-600"
        }`}
      ></span>

      {status ? "فعال" : "غیرفعال"}
    </span>
  );
}