import React, { useEffect, useState } from "react";
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/data/store";
import { Link } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../app/data/cartSlice";
import { toast } from "react-toastify";
import { OrderCreateDto } from "../models/order/orderDto";
import { OrderItemCreateDto } from "../models/orderItem/orderItemDto";
import { baseURL } from "../app/data/baseUrl";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  useSavedAddress: boolean;
  unitNumber: string;
  streetNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
}

type FormDataKeys = keyof FormData;

const OrderPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState<FormData>({
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
    paymentMethod: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormDataKeys]: value, // Type assertion here
    }));
  };

  /* const handleCheckboxChange = () => {
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
  }; */

  const validateForm = () => {
    const errorsList: string[] = [];
    const requiredFields: (keyof FormData)[] = [
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
      if (!formData[field]) {
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
          `${baseURL}/api/v1/Address`,
          addressData
        );

        const addressId = response.data.id; // Assuming the API returns the address ID

        const orderData: OrderCreateDto = {
          orderDate: new Date().toISOString(), // Current date and time in ISO format
          totalPrice: totalPrice, // From your cart data
          addressId: addressId, // The address ID from the response
          orderStatus: "Pending", // Initial order status
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phone,
          paymentMethod: formData.paymentMethod,
          userId: user?.id, // User ID from the logged-in user
        };

        // Send the order data
        const orderResponse = await axios.post(
          `${baseURL}/api/v1/Order`,
          orderData
        );
        const orderId = orderResponse.data.id; // Get the newly created orderId

        // Now that the order is placed, post each item to the orderItem table
        for (const item of items) {
          const orderItemData: OrderItemCreateDto = {
            orderId: orderId, // Use the orderId from the response
            productId: item.product.id, // Get the productId from the cart item
            quantity: item.quantity, // Quantity of the product
            price: item.product.price, // Price of the product
          };

          // Post each item to the orderItem table
          await axios.post(`${baseURL}/api/v1/OrderItem`, orderItemData);
        }

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
    <div className="flex flex-col md:flex-row justify-between p-4 md:p-8 w-full md:w-2/3 mx-auto">
      {/* Billing Details Section */}
      <section className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Billing Detail</h2>
        <form>
          {/* Existing Billing Details */}
          {(["firstName", "lastName", "email", "phone"] as FormDataKeys[]).map(
            (field) => (
              <div className="mb-4" key={field}>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={field}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}*
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field] as string}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            )
          )}

          {!formData.useSavedAddress && (
            <div>
              {(
                [
                  "unitNumber",
                  "streetNumber",
                  "addressLine1",
                  "addressLine2",
                  "city",
                  "postalCode",
                  "country",
                ] as FormDataKeys[]
              ).map((field) => (
                <div className="mb-4" key={field}>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={field}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}*
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field] as string}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          <h3 className="text-xl font-semibold mb-6 text-black">
            Payment Method
          </h3>

          {/* Payment Methods */}
          {["card", "noPayment"].map((method) => (
            <div className="flex items-center mb-6" key={method}>
              <input
                type="radio"
                id={method}
                name="paymentMethod"
                value={method}
                checked={formData.paymentMethod === method}
                onChange={handleInputChange}
                className="mr-3 w-4 h-4 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500"
              />
              <label
                htmlFor={method}
                className="text-md font-medium text-gray-700"
              >
                {method === "card" ? "Card" : "Pay Later"}
              </label>
            </div>
          ))}

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
      <section className="w-full md:w-1/3 bg-gray-600 p-6 rounded-lg shadow-md text-white mt-4 md:mt-0">
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
          aria-label="Place Order"
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
