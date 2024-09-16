import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SingleProductPage from "../pages/SingleProductPage";
import ShoesPage from "../pages/ShoesPage";

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
        path: "/single",
        element: <SingleProductPage />,
      },
    ],
  },
  {
    path: "/shoes",
    element: <ShoesPage />,
  },
]);

export default router;
