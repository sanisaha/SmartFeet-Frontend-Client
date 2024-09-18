import React, { useState } from "react";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const ProductHeader = () => {
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <header className="flex items-center justify-between bg-white py-4 px-6 shadow-md">
      {/* Logo + Text (SmartFeet on the left) */}
      <div className="flex items-center space-x-2">
        <a href="/" className="flex items-center">
          {/* Logo Image */}
          <img
            src="/SmartFeet_logo.png" // Adjust the path as per your setup
            alt="SmartFeet Logo"
            className="h-14 w-14"
          />
          {/* Logo Text */}
          <span className="hidden text-3xl font-bold md:flex items-center">
            <span className="text-purple-700 font-extrabold italic transform -skew-x-6">
              Smart
            </span>
            <span className="text-pink-600 font-extrabold italic transform skew-x-6">
              Feet
            </span>
          </span>
        </a>
      </div>

      {/* Search, User, and Cart on the right */}
      <div className="flex space-x-4 items-center">
        <div className="relative flex items-center w-full max-w-md border border-blue-500 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleInputChange}
            className="w-10 md:w-full outline-none text-blue-500"
          />
          {searchText && (
            <button onClick={clearSearch} className="mx-2 text-blue-500">
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
          <span className="h-full border-l border-blue-300 mx-2"></span>
          <button className="text-blue-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
