import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import { Link, Outlet } from "react-router-dom";
import { FaList, FaUserFriends } from "react-icons/fa";
import { getUser } from "../app/data/authSlice";

const Header = React.lazy(() => import("../shared/ui/Header"));
const DashboardLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  if (user?.role !== "Admin") {
    return <div>UnAuthorized</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Component */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      {/* Main Layout with Drawer */}
      <div className="drawer drawer-mobile lg:drawer-open">
        {/* Toggle Drawer Button for mobile */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col p-6">
          {/* Drawer button visible only on mobile */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden mb-4"
          >
            Open Menu
          </label>
          {/* Outlet for the page content */}
          <Outlet />
        </div>

        {/* Sidebar / Drawer */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-white shadow-lg text-gray-700">
            <li className="mb-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-lg hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition"
              >
                <FaList className="text-blue-500" />
                Create Products
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-users"
                className="flex items-center gap-2 text-lg hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md transition"
              >
                <FaUserFriends className="text-blue-500" />
                Manage Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
