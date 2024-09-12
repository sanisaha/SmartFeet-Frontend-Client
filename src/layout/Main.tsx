import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/ui/Header";
import Footer from "../shared/ui/Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
