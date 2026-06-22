import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Customers from "./components/pages/Customers"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  );
}
