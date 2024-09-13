import React, { useState } from "react";
import collection2 from "../assets/images/Collection-2.jpg";
import RelatedItems from "../shared/ui/RelatedItems";

const ProductPage = () => {
  const product = {
    name: "High Heel",
    price: 600.0,
    description:
      "These elegant high heels feature a unique design with premium materials, perfect for any special occasion.",
    image: "https://via.placeholder.com/300",
    images: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    colors: ["#2F4F4F", "#4682B4", "#FFB6C1"],
    sizes: [7, 8, 9],
    vendor: "Wedge",
    type: "Wedge Sandals",
  };
  // State for quantity and selected tab
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // Handle quantity increment and decrement
  const handleQuantityChange = (type: any) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Render content based on the active tab
  const renderTabContent = () => {
    if (activeTab === "description") {
      return <p>{product.description}</p>;
    } else if (activeTab === "reviews") {
      return (
        <div>
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="text-yellow-400 text-lg">★★★★★</div>
            <span className="ml-2 text-sm text-gray-600">5.00 out of 5</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Based on 1 review</p>

          <div className="mt-4">
            <h3 className="font-semibold">John</h3>
            <div className="text-yellow-400">★★★★★</div>
            <p className="mt-2 text-gray-600">Cursus metus aliquam eleifend.</p>
            <p className="text-sm text-gray-500">05/03/2023</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img src={collection2} alt={product.name} className="rounded-lg" />

          {/* Image Thumbnails */}
          <div className="flex space-x-4 mt-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={collection2}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 rounded-lg border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-6 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center">
            <div className="text-yellow-400">
              {/* Rating stars */}
              ★★★★★
            </div>
            <span className="ml-2 text-sm text-gray-600">(1 review)</span>
          </div>

          <p className="text-2xl font-semibold mt-4">${product.price}</p>

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Color:
            </label>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className={`block w-6 h-6 rounded-full`}
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Size:
            </label>
            <div className="flex space-x-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-200 rounded-md"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Vendor: {product.vendor}
              <br />
              Type: {product.type}
            </p>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex space-x-4 items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-16 text-center border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
            >
              +
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 border-t border-gray-300 pt-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`${
              activeTab === "description"
                ? "text-gray-700 border-b-2 border-black"
                : "text-gray-500"
            } pb-2`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`${
              activeTab === "reviews"
                ? "text-gray-700 border-b-2 border-black"
                : "text-gray-500"
            } pb-2`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
      <RelatedItems />
    </div>
  );
};

export default ProductPage;
