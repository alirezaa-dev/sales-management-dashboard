import { useState } from "react";
import Button from "../ui/Button";

export default function Customers() {
  const [nextId, setNextId] = useState(3);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "علیرضا دهقان بنادکی",
      phone: "09365534123",
      score: 120,
      joinDate: "1405/03/20",
    },
    {
      id: 2,
      name: "مریم احمدی",
      phone: "09123456789",
      score: 80,
      joinDate: "1405/03/15",
    },
  ]);
  function isValidPhone(phone) {
    return /^09\d{9}$/.test(phone);
  }

  function addNewUser() {
    if (!name.trim() || !phone.trim()) {
      alert("لطفاً نام و موبایل را وارد کنید");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("شماره موبایل باید 11 رقم و با 09 شروع شود");
      return;
    }
    const newCustomer = {
      id: nextId,
      name,
      phone,
      score: 0,
      joinDate: new Date().toLocaleDateString("fa-IR"),
    };

    setCustomers((prev) => [...prev, newCustomer]);
    setNextId((prev) => prev + 1);

    setName("");
    setPhone("");

    setIsModalOpen(false);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h2>مشتری‌ها</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          {" "}
          <span className="text-lg pl-2 ">+</span>افزودن مشتری جدید
        </Button>
      </div>

      <div className="bg-white rounded-md">
        <table className="w-full text-right">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b border-border">شماره</th>
              <th className="px-4 py-4 border-b border-border">
                نام و نام خانوادگی
              </th>
              <th className="px-4 py-4 border-b border-border">موبایل</th>
              <th className="px-4 py-4 border-b border-border">امتیاز</th>
              <th className="px-4 py-4 border-b border-border">تاریخ عضویت</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-4 border-b border-border">
                  {customer.id}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.name}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.phone}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.score}
                </td>
                <td className="px-4 py-4 border-b border-border">
                  {customer.joinDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <h3 className="mb-3">افزودن مشتری</h3>

            <input
              className="border p-2 w-full mb-2"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2"
              placeholder="موبایل"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button onClick={addNewUser}>ثبت</Button>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
