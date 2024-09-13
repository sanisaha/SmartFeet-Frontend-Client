import React, { useState } from "react";
import collection2 from "../assets/images/Collection-2.jpg";

// Sample shoe data
const shoes = [
  {
    id: 1,
    name: "Air Jordan 7 Retro",
    brand: "Nike",
    category: "Men",
    subcategory: "Sports",
    price: 120,
    sizes: [8, 9, 10, 11, 12],
    oldPrice: 220,
    discount: "35%",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    category: "Men",
    subcategory: "Running",
    price: 180,
    sizes: [7, 8, 9, 10, 11],
    discount: "20%",
  },
  {
    id: 3,
    name: "Nike Air Max",
    brand: "Nike",
    category: "Men",
    subcategory: "Formal",
    price: 200,
    sizes: [8, 9, 10, 11, 12],
  },
  {
    id: 4,
    name: "Adidas NMD",
    brand: "Adidas",
    category: "Women",
    subcategory: "Running",
    price: 150,
    sizes: [6, 7, 8, 9, 10],
  },
  {
    id: 5,
    name: "Nike Revolution",
    brand: "Nike",
    category: "Kids",
    subcategory: "Sports",
    price: 90,
    sizes: [3, 4, 5, 6, 7],
  },
  // Add more shoe items as necessary
];

const categories = ["Men", "Women", "Kids"];
const subcategories = ["Running", "Formal", "Sports", "Winter"];
const brands = ["Nike", "Adidas", "Jordan"];
const sizes = [
  3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
  12, 12.5, 13,
];

const MenShoesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  // Filter logic based on selected filters
  const filteredShoes = shoes.filter((shoe) => {
    if (shoe.category !== selectedCategory) return false;
    if (selectedSubcategory && shoe.subcategory !== selectedSubcategory)
      return false;
    if (selectedBrand && shoe.brand !== selectedBrand) return false;
    if (selectedSize && !shoe.sizes.includes(selectedSize)) return false;
    return true;
  });

  return (
    <div>
      <div className="w-full bg-gray-200 py-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center text-lg font-semibold text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3v4h4M7 17H3m0 0v4m4-4v4m4 0h10a2 2 0 002-2v-5a2 2 0 00-2-2h-5l-4-4H5a2 2 0 00-2 2v10z"
            />
          </svg>
          FREE DELIVERY: Get free standard delivery on every order with
          SmartFeet
        </div>
      </div>
      <div className="flex my-6">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Categories */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Category</h2>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
              />
              <label className="text-gray-700">{category}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Subcategories */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Subcategory</h2>
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                name="subcategory"
                checked={selectedSubcategory === subcategory}
                onChange={() =>
                  setSelectedSubcategory(
                    selectedSubcategory === subcategory ? "" : subcategory
                  )
                }
              />
              <label text-gray-700>{subcategory}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Brands */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Shoe Brand</h2>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedBrand === brand}
                onChange={() =>
                  setSelectedBrand(selectedBrand === brand ? "" : brand)
                }
              />
              <label text-gray-700>{brand}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Sizes */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Size</h2>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`border rounded-md p-2 ${
                  selectedSize === size ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() =>
                  setSelectedSize(selectedSize === size ? null : size)
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Shoe Grid */}
        <div className="w-3/4 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredShoes.length > 0 ? (
              filteredShoes.map((shoe) => (
                <div
                  key={shoe.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                      {shoe.discount}
                    </span>
                    <img
                      src={collection2}
                      alt={shoe.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{shoe.name}</h3>
                    <p className="text-gray-500 text-sm">{shoe.brand}</p>
                    <div className="mt-2">
                      {shoe.oldPrice && (
                        <span className="text-gray-500 line-through mr-2">
                          £{shoe.oldPrice}
                        </span>
                      )}
                      <span className="font-bold text-lg">£{shoe.price}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No shoes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenShoesPage;
