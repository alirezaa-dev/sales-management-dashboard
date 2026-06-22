export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "علی رضایی",
      score: 120,
      joinDate: "1405/03/20",
    },
    {
      id: 2,
      name: "مریم احمدی",
      score: 80,
      joinDate: "1405/03/15",
    },
  ];

  function addNewUser() {
    console.log("add user");
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-gray-900">مشتری‌ها</h2>
          <p>تعداد کل مشتری‌ها: {customers.length}</p>
        </div>

        <div>
          <button className="bg-gray-800" onClick={addNewUser}>افزودن مشتری جدید</button>
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>شماره</th>
              <th>نام و نام خانوادگی</th>
              <th>امتیاز</th>
              <th>تاریخ عضویت</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.score}</td>
                <td>{customer.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}