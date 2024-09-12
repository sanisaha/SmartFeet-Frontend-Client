import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
