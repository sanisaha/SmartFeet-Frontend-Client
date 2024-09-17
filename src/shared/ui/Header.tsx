import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  XCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { CategoryName, SubCategoryName } from "../../models/enums/AllEnum";
import Dropdown from "../services/Dropdown";
import { categories, subcategories } from "../../pages/ShoesPage";
import { FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  const [dropdownStates, setDropdownStates] = useState({
    Women: false,
    Men: false,
    Kids: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  const navigateToAllShoes = (
    category: CategoryName,
    subcategory?: SubCategoryName
  ) => {
    navigate(`/shoes`, {
      state: { category, subcategory }, // Pass category and subcategory in state
    });
  };

  const toggleDropdown = (category: CategoryName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
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

      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop Navigation Links in the center (Hidden on small screens) */}
      <nav className="hidden md:flex space-x-6 text-sm font-medium mx-auto">
        {/* Loop through categories to render Dropdowns */}
        {categories.map((category) => (
          <Dropdown
            key={category} // Add a unique key
            category={category}
            subcategories={subcategories}
            isOpen={dropdownStates[category as keyof typeof dropdownStates]}
            setIsOpen={() => toggleDropdown(category)}
            navigateToAllShoes={navigateToAllShoes}
          />
        ))}
      </nav>

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

        <Link to="/cart" className="relative text-gray-600 hover:text-red-600">
          <FaCartArrowDown />
          <span className="absolute top-0 left-5 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
            0
          </span>
        </Link>
      </div>

      {/* Mobile Menu (Visible on small screens) */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-20">
          <ul className="flex flex-col space-y-4 py-4 px-6 text-lg">
            <li>
              <button
                type="button"
                onClick={() => navigateToAllShoes("Women")}
                className="text-blue-600 hover:text-red-600"
              >
                WOMEN
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAllShoes("Men")}
                className="text-blue-600 hover:text-red-600"
              >
                MEN
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigateToAllShoes("Kids")}
                className="text-blue-600 hover:text-red-600"
              >
                KIDS
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
