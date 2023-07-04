import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
import MyCart from "./pages/MyCart";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <AllProducts /> },
      {
        // * 7. admin일 때를 구분하는 조건 추가true면 생략 가능)
        path: "/products/new",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      { path: "/products/:id", element: <ProductDetail /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
