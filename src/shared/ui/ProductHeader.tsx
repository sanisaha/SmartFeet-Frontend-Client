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
        <a href="#" className="text-gray-600 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </a>

        <a href="#" className="relative text-gray-600 hover:text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.401 2m1.978 8H20l.929-5.571A1 1 0 0020 6H7.407M7.38 10h10.788m-9.502 4a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4zm-9-10h6a2 2 0 012 2v1m0 4a2 2 0 11-4 0"
            />
          </svg>
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
            3
          </span>
        </a>
      </div>
    </header>
  );
};

export default ProductHeader;
