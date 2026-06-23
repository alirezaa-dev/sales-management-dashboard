import { useState } from "react";
import Button from "../../ui/Button";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import DeleteButton from "../../ui/DeleteButton";
import AddModal from "./components/Addmodal";
import EditModal from "./components/EditModal";

export default function Customers() {
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  const [nextId, setNextId] = useState(3);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

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
      joinDate: new Date().toLocaleDateString("fa-IR"),
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

      {/* TABLE */}
      <div className="bg-white rounded-md">
        <table className="w-full text-right">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-4 border-b">شماره</th>
              <th className="px-4 py-4 border-b">نام</th>
              <th className="px-4 py-4 border-b">موبایل</th>
              <th className="px-4 py-4 border-b">امتیاز</th>
              <th className="px-4 py-4 border-b">تاریخ</th>
              <th className="px-4 py-4 border-b">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-3 border-b">{customer.id}</td>
                <td className="px-4 py-3 border-b">{customer.name}</td>
                <td className="px-4 py-3 border-b">{customer.phone}</td>
                <td className="px-4 py-3 border-b">{customer.score}</td>
                <td className="px-4 py-3 border-b">{customer.joinDate}</td>

                <td className="px-4 py-3 border-b">
                  <button
                    className="p-2 mx-1 rounded-md bg-blue-100 cursor-pointer"
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
                    className="p-2 mx-1 rounded-md bg-red-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCustomerId(customer.id);
                      setIsModalOpenDelete(true);
                    }}
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
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
