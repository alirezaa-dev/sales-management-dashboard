import { useContext, useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import AddModal from "./components/Addmodal";
import EditModal from "./components/EditModal";
import { CustomerContext } from "../../../context/CustomerContext";
import { formatDate } from "../../../utils/formatDate";
import getTodayDate from "../../../utils/getTodayDate";

export default function Customers() {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [nextId, setNextId] = useState(3);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const { customers, setCustomers } = useContext(CustomerContext);
  const filteredCustomers = [...customers]
    .filter(
      (customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search),
    )
    .sort((a, b) => {
      if (sortBy === "highestScore") {
        return b.score - a.score;
      }
      if (sortBy === "lowestScore") {
        return a.score - b.score;
      }

      if (sortBy === "newestJoinDate") {
        return new Date(b.joinDate) - new Date(a.joinDate);
      }
      if (sortBy === "oldestJoinDate") {
        return new Date(a.joinDate) - new Date(b.joinDate);
      }

      return 0;
    });

  function isValidPhone(phone) {
    return /^09\d{9}$/.test(phone);
  }

  function resetForm() {
    setName("");
    setPhone("");
  }

  //  DELETE
  function deleteCustomer() {
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomerId));
    setSelectedCustomerId(null);
    setIsModalOpenDelete(false);
  }

  //  ADD
  function addCustomer() {
    if (!name.trim() || !phone.trim()) {
      alert("نام و موبایل را وارد کنید");
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
      joinDate: getTodayDate(),
    };

    setCustomers((prev) => [...prev, newCustomer]);
    setNextId((prev) => prev + 1);

    resetForm();
    setIsModalOpenAdd(false);
  }

  //  EDIT
  function openEditModal(customer) {
    setSelectedCustomerId(customer.id);
    setName(customer.name);
    setPhone(customer.phone);
    setIsModalOpenEdit(true);
  }

  function updateCustomer() {
    if (!name.trim() || !phone.trim()) {
      alert("نام و موبایل را وارد کنید");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("شماره موبایل باید 11 رقم و با 09 شروع شود");
      return;
    }

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomerId ? { ...c, name, phone } : c,
      ),
    );

    resetForm();
    setSelectedCustomerId(null);
    setIsModalOpenEdit(false);
  }

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-bold">مشتری‌ها</h2>

        <Button onClick={() => setIsModalOpenAdd(true)}>
          <span className="text-lg pl-2">+</span>
          افزودن مشتری جدید
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-row gap-4">
        <input
          className="h-12 leading-12 px-3 border border-gray-200 rounded bg-white w-full"
          type="text"
          placeholder="جستجوی نام یا شماره موبایل"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="h-12 px-3 border border-gray-200 rounded bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">مرتب‌سازی</option>
          <option value="highestScore">بیشترین امتیاز</option>
          <option value="lowestScore">کمترین امتیاز</option>
          <option value="newestJoinDate">جدیدترین عضویت</option>
          <option value="oldestJoinDate">قدیمی‌ترین عضویت</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto rounded-md bg-white">
        <table className="min-w-[900px] text-right border-collapse w-full">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[70px]">
                شماره
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[220px]">
                نام
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[170px]">
                موبایل
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[100px]">
                امتیاز
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[150px]">
                تاریخ
              </th>
              <th className="px-4 py-4 border-b border-gray-100 text-sm whitespace-nowrap min-w-[110px]">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {customer.id}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {customer.name}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {customer.phone}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {customer.score}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  {formatDate(customer.joinDate)}
                </td>

                <td className="px-4 py-3 border-b border-gray-100 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 rounded-md bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCustomerId(customer.id);
                        setName(customer.name);
                        setPhone(customer.phone);
                        setIsModalOpenEdit(true);
                      }}
                    >
                      <MdOutlineModeEdit className="text-blue-600" />
                    </button>

                    <button
                      className="p-2 rounded-md bg-red-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCustomerId(customer.id);
                        setIsModalOpenDelete(true);
                      }}
                    >
                      <MdDeleteOutline className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  ADD MODAL  */}
      {
        <AddModal
          isOpen={isModalOpenAdd}
          onClose={() => setIsModalOpenAdd(false)}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          onAdd={addCustomer}
        />
      }
      {/*  EDIT MODAL  */}
      <EditModal
        isOpen={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        onEdit={updateCustomer}
      />

      {/*  DELETE MODAL  */}
      {isModalOpenDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md w-96">
            <p className="mb-3">آیا از حذف مشتری مطمئن هستید؟</p>

            <DeleteButton onClick={deleteCustomer}>حذف</DeleteButton>

            <button
              className="mr-2 px-3 py-2 cursor-pointer"
              onClick={() => setIsModalOpenDelete(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </>
  );
}
