import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute";
import React, { Suspense } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import CreateProductPage from "../pages/dashboard/CreateProductPage";
import ManageUserPage from "../pages/dashboard/ManageUserPage";

const Home = React.lazy(() => import("../pages/Home"));
const SingleProductPage = React.lazy(
  () => import("../pages/SingleProductPage")
);
const Cart = React.lazy(() => import("../pages/Cart"));
const OrderPage = React.lazy(() => import("../pages/OrderPage"));
const Register = React.lazy(() => import("../pages/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const ShoesPage = React.lazy(() => import("../pages/ShoesPage"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shoes/:id",
        element: <SingleProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/shoes",
    element: (
      <Suspense fallback={<div>Loading Shoes Page...</div>}>
        <ShoesPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <CreateProductPage />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUserPage />,
      },
    ],
  },
]);

export default router;
