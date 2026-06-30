import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Customers from "./components/pages/Customers/Customers";
import Products from "./components/pages/Products/Products";
import Categories from "./components/pages/Categories/Categories";
import Brands from "./components/pages/Brands/Brands";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="customers" element={<Customers />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />}/>
        <Route path="brands" element={<Brands/>}/>
      </Route>
    </Routes>
  );
}
