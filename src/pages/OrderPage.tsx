import React, { useState } from "react";
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/data/store";
import { Link } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../app/data/cartSlice";
import { toast } from "react-toastify";

const isLoggedIn = true;
const userAddress = "1234 Elm St, Springfield, IL";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    useSavedAddress: false,
    unitNumber: "",
    streetNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "", // Added for payment method
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    if (formData.useSavedAddress) {
      // Uncheck the box and clear the address
      setFormData((prevData) => ({
        ...prevData,
        useSavedAddress: false,
        unitNumber: "",
        streetNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
      }));
    } else {
      // Use the saved address if the box is checked
      setFormData((prevData) => ({
        ...prevData,
        useSavedAddress: true,
        // In real scenarios, you might want to parse the `userAddress` into fields
        unitNumber: "",
        streetNumber: "",
        addressLine1: userAddress,
        addressLine2: "",
        city: "",
        postalCode: "",
        country: "",
      }));
    }
  };

  const validateForm = () => {
    const errorsList: string[] = [];
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "addressLine1",
      "city",
      "postalCode",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        errorsList.push(`${field} is required`);
      }
    });

    if (!formData.paymentMethod) {
      errorsList.push("Payment method is required");
    }

    return errorsList;
  };

  const handlePlaceOrder = async () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (formErrors.length === 0) {
      try {
        // Prepare address data
        const addressData = {
          unitNumber: formData.unitNumber,
          streetNumber: formData.streetNumber,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        };

        // Use axios to post the address data
        const response = await axios.post(
          "http://localhost:5216/api/v1/Address",
          addressData
        );

        const addressId = response.data.id; // Assuming the API returns the address ID

        // Log all form data with the created addressId
        /* const orderData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod,
          addressId: addressId, // Only log address ID as a reference
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
          totalPrice: totalPrice,
        }; */

        const orderData = {
          orderDate: new Date().toISOString(), // Current date and time in ISO format
          totalPrice: totalPrice, // From your cart data
          addressId: addressId, // The address ID from the response
          orderStatus: "Pending", // Initial order status
        };

        // Send the order data
        const orderResponse = await axios.post(
          "http://localhost:5216/api/v1/Order",
          orderData
        );
        const orderId = orderResponse.data.id; // Get the newly created orderId

        // Now that the order is placed, post each item to the orderItem table
        for (const item of items) {
          const orderItemData = {
            orderId: orderId, // Use the orderId from the response
            productId: item.product.id, // Get the productId from the cart item
            quantity: item.quantity, // Quantity of the product
            price: item.product.price, // Price of the product
          };

          // Post each item to the orderItem table
          await axios.post(
            "http://localhost:5216/api/v1/OrderItem",
            orderItemData
          );
        }

        console.log("Order and order items placed successfully");
        toast.success("Order placed successfully!");

        // Optionally, clear the cart using a Redux action if you're using Redux
        dispatch(clearCart());

        // Optionally, clear any error messages
        setErrors([]);
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Error placing order. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-between p-8 w-2/3 mx-auto">
      {/* Billing Details Section */}
      <section className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Billing Detail</h2>
        <form>
          {/* Existing Billing Details */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="first-name"
            >
              First Name*
            </label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="last-name"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {isLoggedIn && userAddress && (
            <div className="mb-4">
              <input
                type="checkbox"
                id="use-saved-address"
                name="useSavedAddress"
                checked={formData.useSavedAddress}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label
                htmlFor="use-saved-address"
                className="text-sm text-gray-700"
              >
                Use default address for shipping?
              </label>
            </div>
          )}

          {!formData.useSavedAddress && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="unitNumber"
                >
                  Unit Number*
                </label>
                <input
                  type="text"
                  id="unitNumber"
                  name="unitNumber"
                  value={formData.unitNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="streetNumber"
                >
                  Street Number*
                </label>
                <input
                  type="text"
                  id="streetNumber"
                  name="streetNumber"
                  value={formData.streetNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="addressLine1"
                >
                  Address Line 1*
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="addressLine2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="city"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="postalCode"
                >
                  Postal Code*
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="country"
                >
                  Country*
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          )}
          {/* Payment Methods */}
          <h3 className="text-xl font-semibold mb-6 text-black">
            Payment Method
          </h3>

          {/* Card Payment Option */}
          <div className="flex items-center mb-6">
            <input
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={handleInputChange}
              className="mr-3 w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500"
            />
            <label htmlFor="card" className="text-md font-medium text-gray-700">
              Card
            </label>
            <div className="ml-4 flex space-x-2 text-2xl text-gray-700">
              <RiVisaFill className="text-yellow-400" />
              <FaCcMastercard className="text-red-500" />
            </div>
          </div>

          {/* Pay Later Option */}
          <div className="flex items-center mb-6">
            <input
              type="radio"
              id="noPayment"
              name="paymentMethod"
              value="noPayment"
              checked={formData.paymentMethod === "noPayment"}
              onChange={handleInputChange}
              className="mr-3 w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500"
            />
            <label
              htmlFor="noPayment"
              className="text-md font-medium text-gray-700"
            >
              Pay Later
            </label>
          </div>
          {/* Validation Errors */}
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </section>

      {/* Order Summary Section */}
      <section className="w-1/3 bg-gray-600 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-bold mb-6">Your Order</h2>
        {/* Order Items */}
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{item.product.title}</h3>
              <p className="text-gray-400">{item.product.price} €</p>
            </div>
            <p className="text-gray-400">{item.quantity}x</p>
          </div>
        ))}

        {/* Order Total */}
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-lg font-semibold">{totalPrice} €</p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-green-500"
        >
          Place Order
        </button>

        <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm text-gray-600">
          <p className="font-semibold">FREE SHIPPING</p>
          <p>
            Your order qualifies for free shipping.{" "}
            <Link to="/register" className="text-blue-600 underline">
              Sign up
            </Link>{" "}
            for free shipping on every order, every time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default OrderPage;
