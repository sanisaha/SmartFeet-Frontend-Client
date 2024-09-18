import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/data/store";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (user?.role !== "Admin") {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <div></div>;
};

export default PrivateRoute;
