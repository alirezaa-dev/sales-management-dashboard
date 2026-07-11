import { formatNumber } from "../../../../utils/formatNumber";
export default function LatestCustomers({ customers }) {
  return (
    <div className="grow rounded-lg bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">آخرین مشتریان</h2>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <p className="font-semibold">{customer.name}</p>

            <p className="mt-1 text-sm text-gray-500">{formatNumber(customer.phone)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
