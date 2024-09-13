import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import MenShoesPage from "../pages/MenShoesPage";
import SingleProductPage from "../pages/SingleProductPage";

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
        path: "/men-shoes",
        element: <MenShoesPage />,
      },
      {
        path: "/single",
        element: <SingleProductPage />,
      },
    ],
  },
]);

export default router;
