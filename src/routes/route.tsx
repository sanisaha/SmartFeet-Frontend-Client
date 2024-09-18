import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SingleProductPage from "../pages/SingleProductPage";
import ShoesPage from "../pages/ShoesPage";
import Cart from "../pages/Cart";
import OrderPage from "../pages/OrderPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";

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
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/shoes",
    element: <ShoesPage />,
  },
]);

export default router;
