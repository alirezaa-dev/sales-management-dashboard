import { useContext, useState } from "react";

import CustomersHeader from "./components/CustomersHeader";

import EditCustomerModal from "./components/EditCustomerModal";
import AddCustomerModal from "./components/AddCustomerModal";
import { CustomerContext } from "../../../context/CustomerContext";
import CustomersFilters from "./components/CustomersFilters";
import getTodayDate from "../../../utils/getTodayDate";
import CustomersTable from "./components/CustomersTable";
import DeleteCustomerModal from "./components/DeleteCustomerModal";

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
      if (sortBy === "highestScore") return b.score - a.score;
      if (sortBy === "lowestScore") return a.score - b.score;

      if (sortBy === "newestJoinDate")
        return new Date(b.joinDate) - new Date(a.joinDate);

      if (sortBy === "oldestJoinDate")
        return new Date(a.joinDate) - new Date(b.joinDate);

      return 0;
    })
    .map((customer, index) => ({
      ...customer,
      rowNumber: index + 1,
    }));
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
  function openAddModal() {
    setIsModalOpenAdd(true);
  }
  function closeDeleteModal() {
    setIsModalOpenDelete(false);
  }

  return (
    <>
      {/* HEADER */}
      <CustomersHeader onAdd={openAddModal} />

      {/* Search & Filters */}
      <CustomersFilters
        search={search}
        onSearchChange={setSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* TABLE */}
      <CustomersTable
        customers={filteredCustomers}
        onEdit={openEditModal}
        onDelete={(id) => {
          setSelectedCustomerId(id);
          setIsModalOpenDelete(true);
        }}
      />
      {/*  ADD MODAL  */}
      {
        <AddCustomerModal
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
      <EditCustomerModal
        isOpen={isModalOpenEdit}
        onClose={() => setIsModalOpenEdit(false)}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        onEdit={updateCustomer}
      />

      {/*  DELETE MODAL  */}
      <DeleteCustomerModal
        isOpen={isModalOpenDelete}
        onClose={closeDeleteModal}
        onDelete={deleteCustomer}
      />
    </>
  );
}
