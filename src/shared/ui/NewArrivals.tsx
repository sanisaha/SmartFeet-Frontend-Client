import React, { useState } from "react";
import collection1 from "../../assets/images/Collection-1.jpg";

// Sample data for new arrivals
const newArrivals = [
  {
    id: 1,
    title: "Product 1",
    category: "Category 1",
    price: "$100",
    image: "path-to-image-1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    category: "Category 2",
    price: "$120",
    image: "path-to-image-2.jpg",
  },
  {
    id: 3,
    title: "Product 3",
    category: "Category 3",
    price: "$150",
    image: "path-to-image-3.jpg",
  },
  {
    id: 4,
    title: "Product 4",
    category: "Category 4",
    price: "$90",
    image: "path-to-image-4.jpg",
  },
  {
    id: 5,
    title: "Product 5",
    category: "Category 5",
    price: "$130",
    image: "path-to-image-5.jpg",
  },
  {
    id: 6,
    title: "Product 6",
    category: "Category 6",
    price: "$200",
    image: "path-to-image-6.jpg",
  },
  {
    id: 7,
    title: "Product 7",
    category: "Category 7",
    price: "$70",
    image: "path-to-image-7.jpg",
  },
  // Add more items as needed
];

const NewArrivals = () => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (startIndex + itemsPerPage < newArrivals.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Title and Underline */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
        <p className="text-lg font-light mb-1">Just In Now</p>
        <div className="w-24 mx-auto border-b-2 border-gray-400"></div>{" "}
        {/* Underline */}
      </div>

      {/* Card Section */}
      <div className="flex space-x-4 justify-center">
        {/* Display only four cards at a time */}
        {newArrivals
          .slice(startIndex, startIndex + itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="w-1/4 p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={collection1}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-lg mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">{product.category}</p>
                <div className="my-2 border-t border-dashed border-gray-300 w-3/4 mx-auto"></div>{" "}
                {/* Dashed Line */}
                <p className="text-xl font-bold">{product.price}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Next and Previous buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          disabled={startIndex === 0}
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= newArrivals.length}
        >
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
