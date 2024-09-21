import React from "react";
import collection1 from "../../assets/images/Collection-1.webp";
import collection2 from "../../assets/images/Collection-2.webp";
import { Link } from "react-router-dom";

const CollectionSection = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-0 relative w-3/4 h-[700px]">
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img
            src={collection1}
            alt="Modern High Heel Brand"
            className="object-cover w-full h-full rounded-br-lg transition-opacity duration-500 ease-in-out hover:opacity-60"
          />
        </div>

        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-tl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            Elegant Craftsmanship
          </h4>
          <h2 className="text-xl font-bold mt-1">
            Classic Formal Leather Shoes
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Impeccably crafted with a timeless design, these formal shoes
            combine style and comfort for the modern professional.
          </p>
          <Link
            to="/shoes"
            className="w-1/2 mt-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Explore the collection
          </Link>
        </div>

        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-bl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            Fresh & Urban
          </h4>
          <h2 className="text-xl font-bold mt-1">
            Contemporary Streetwear Sneakers
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Designed for those who blend style with comfort, these sneakers
            boast a sleek modern look with cutting-edge details.
          </p>
          <Link
            to="/shoes"
            className="w-1/2 mt-4 bg-gradient-to-r from-orange-800 to-orange-950 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Discover the range
          </Link>
        </div>

        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img
            src={collection2}
            alt="Gold Sea Beach Colors"
            className="object-cover w-full h-full rounded-tr-lg transition-opacity duration-500 ease-in-out hover:opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
