import React, { useState } from "react";
import collection1Small from "../../assets/images/Carousel-1_480.webp";
import { Product } from "../../models/product/Product";
import { Link } from "react-router-dom";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
interface NewArrivalsProps {
  newArrivals: Product[];
}
const NewArrivals: React.FC<NewArrivalsProps> = ({ newArrivals }) => {
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
      <div className=" grid grid-cols-1 md:grid-cols-3 space-x-4 justify-center">
        {/* Display only four cards at a time */}
        {newArrivals
          .slice(startIndex, startIndex + itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Link to={`/shoes/${product.id}`}>
                <img
                  src={product.productImages[0].imageURL || collection1Small}
                  alt={product.title}
                  className="w-full h-object-cover rounded-t-lg mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </Link>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">{product.categoryName}</p>
                <div className="my-2 border-t border-dashed border-gray-300 w-3/4 mx-auto"></div>{" "}
                {/* Dashed Line */}
                <p className="text-xl font-bold">€{product.price}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Next and Previous buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          disabled={startIndex === 0}
        >
          <span className="material-icons">
            <FaBackward />
          </span>
        </button>
        <button
          onClick={handleNext}
          aria-label="Next"
          className="bg-gray-300 p-3 rounded-full hover:bg-gray-400 focus:outline-none disabled:opacity-50"
          disabled={startIndex + itemsPerPage >= newArrivals.length}
        >
          <span className="material-icons">
            <FaForward />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
