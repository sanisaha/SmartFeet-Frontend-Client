import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import axios from "axios";
import { updateUser } from "../app/data/userSlice";
import { Order } from "../models/order/Order";

const ProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [showUpdateDetails, setShowUpdateDetails] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    userName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        id: user.id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get(
          `http://localhost:5216/api/v1/Order/user/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data); // Set orders after successful data fetch
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Optionally handle the error here (e.g., set error state)
      }
    };

    // Call the async function if user is available
    if (user?.id) {
      getOrders();
    }
  }, [user]);

  const handleUpdate = () => {
    dispatch(updateUser(userDetails));
  };

  return (
    <div className="container mx-auto p-4 min-h-96">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>

      {/* Collapsible Update Form */}
      <div className="mb-8">
        <button
          className="flex justify-between w-full bg-blue-600 text-white text-left px-4 py-2 rounded-md"
          onClick={() => setShowUpdateDetails(!showUpdateDetails)}
        >
          <h2 className="text-xl">Update Your Details</h2>
          <span>{showUpdateDetails ? "-" : "+"}</span>
        </button>
        {showUpdateDetails && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md bg-white">
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="userName"
                  value={userDetails.userName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userDetails.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Collapsible Orders */}
      <div>
        <button
          className="flex justify-between w-full bg-blue-600 text-white text-left px-4 py-2 rounded-md"
          onClick={() => setShowOrders(!showOrders)}
        >
          <h2 className="text-xl">Your Orders</h2>
          <span>{showOrders ? "-" : "+"}</span>
        </button>
        {showOrders && (
          <div className="mt-4 space-y-4">
            {orders && orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 border rounded shadow-md bg-white"
                  >
                    <h3 className="font-bold">Order #{order.id}</h3>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>Total: ${order.totalPrice}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">You have no orders.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
