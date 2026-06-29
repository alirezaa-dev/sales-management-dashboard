import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CategoryProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </CategoryProvider>
  </BrowserRouter>,
);
