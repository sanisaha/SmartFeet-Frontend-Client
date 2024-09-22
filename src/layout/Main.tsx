import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Header = React.lazy(() => import("../shared/ui/Header"));
const Footer = React.lazy(() => import("../shared/ui/Footer"));

const Main = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default Main;
