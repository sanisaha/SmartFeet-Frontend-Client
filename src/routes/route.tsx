import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SingleProductPage from "../pages/SingleProductPage";
import ShoesPage from "../pages/ShoesPage";
import Cart from "../pages/Cart";

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
    ],
  },
  {
    path: "/shoes",
    element: <ShoesPage />,
  },
]);

export default router;
