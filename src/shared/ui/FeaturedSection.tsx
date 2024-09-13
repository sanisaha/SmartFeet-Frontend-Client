import React, { useState } from "react";
import collection2 from "../../assets/images/Collection-2.jpg";

// Sample products
const shoes = [
  {
    id: 1,
    title: "Nike Air Max",
    brand: "Nike",
    category: "Men",
    price: "$200",
    rating: 4.5,
    image: "path-to-nike-1.jpg",
  },
  {
    id: 2,
    title: "Adidas Ultraboost",
    brand: "Adidas",
    category: "Women",
    price: "$180",
    rating: 4.8,
    image: "path-to-adidas-1.jpg",
  },
  {
    id: 3,
    title: "Nike Revolution",
    brand: "Nike",
    category: "Kids",
    price: "$90",
    rating: 4.2,
    image: "path-to-nike-2.jpg",
  },
  {
    id: 4,
    title: "Adidas NMD",
    brand: "Adidas",
    category: "Men",
    price: "$150",
    rating: 4.6,
    image: "path-to-adidas-2.jpg",
  },
  {
    id: 5,
    title: "Nike Flex",
    brand: "Nike",
    category: "Women",
    price: "$120",
    rating: 4.5,
    image: "path-to-nike-3.jpg",
  },
  {
    id: 6,
    title: "Adidas Superstar",
    brand: "Adidas",
    category: "Kids",
    price: "$100",
    rating: 4.4,
    image: "path-to-adidas-3.jpg",
  },
  // Add more shoes as needed
];

const categories = ["All", "Nike", "Adidas", "Men", "Women", "Kids"];

const FeaturedSection = () => {
  const [filteredCategory, setFilteredCategory] = useState("All");

  // Filter logic
  const filteredShoes = shoes.filter((shoe) => {
    if (filteredCategory === "All") return true;
    if (filteredCategory === "Nike" || filteredCategory === "Adidas") {
      return shoe.brand === filteredCategory;
    }
    return shoe.category === filteredCategory;
  });

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <div className="relative w-full md:w-2/3">
        {/* Large Blurred Text, hidden on small screens */}
        <div className="absolute inset-0 flex items-center justify-start">
          <h1 className="text-[8rem] font-bold text-gray-400 overflow-hidden opacity-20 hidden sm:block">
            FEATURED
          </h1>
        </div>

        {/* Submerged Title and Description */}
        <div className="relative z-10 p-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Shoes
          </h2>
          <div className="w-24 border-b-2 border-gray-500"></div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilteredCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-full border-2 font-semibold transition-colors ${
              filteredCategory === category
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Shoe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredShoes.map((shoe) => (
          <div
            key={shoe.id}
            className="relative group bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out"
          >
            {/* Product Image */}
            <img
              src={collection2}
              alt={shoe.title}
              className="w-full h-96 object-cover" // Full-width image with taller height
            />

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-black p-1 transition-all duration-500 ease-in-out"></div>

            {/* Card Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-80 group-hover:bg-opacity-100 transition-all duration-300 ease-in-out flex justify-between items-end">
              {/* Rating, Title, Category */}
              <div>
                {/* Rating */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={i < Math.floor(shoe.rating) ? "gold" : "none"}
                      viewBox="0 0 24 24"
                      stroke="gold"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>

                {/* Title and Category */}
                <div className="mt-1 text-left">
                  <h3 className="text-md font-semibold">{shoe.title}</h3>
                  <p className="text-sm text-gray-600">{shoe.category}</p>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-bold">{shoe.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
