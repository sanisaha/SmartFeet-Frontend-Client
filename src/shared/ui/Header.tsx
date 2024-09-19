import React, { ChangeEvent, useEffect, useState } from "react";
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
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/data/store";
import { getUser, logoutUsers } from "../../app/data/authSlice";
import { toast } from "react-toastify";
import { searchProductsByTitle } from "../../app/data/productSlice";
import { Product } from "../../models/product/Product";
import collection1 from "../../assets/images/Collection-1.jpg";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const { searchProducts } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [dropdownStates, setDropdownStates] = useState({
    Women: false,
    Men: false,
    Kids: false,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 0) {
      dispatch(searchProductsByTitle(input));
    }
  };

  const clearSearch = () => {
    setQuery("");
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

  const toggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logoutUsers());
    setShowDropdown(false);
    toast.warning("Logged out successfully!");
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
            value={query}
            onChange={handleInputChange}
            className="w-10 md:w-full outline-none text-blue-500"
          />
          {/* Dropdown */}
          {query && searchProducts.length > 0 && (
            <>
              <ul className="absolute left-0 right-0 z-10 top-12 bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {searchProducts.slice(0, 10).map((product: Product) => (
                  <Link
                    key={product.id}
                    to={`/shoes/${product.id}`}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      src={
                        product.productImages &&
                        product.productImages.length > 0
                          ? product.productImages[0].imageURL
                          : collection1
                      }
                      alt={product.title}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <span className="text-gray-700">{product.title}</span>
                  </Link>
                ))}
              </ul>
            </>
          )}
          {/* Clear Search */}
          {query && (
            <button onClick={clearSearch} className="mx-2 text-blue-500">
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
          {/* Search Icon */}
          <span className="h-full border-l border-blue-300 mx-2"></span>
          <button className="text-blue-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        {/* admin dashboard */}
        {isAuthenticated && user?.role === "Admin" && (
          <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">
            Admin
          </Link>
        )}
        {/* User Dropdown */}

        <button
          onClick={toggleShowDropdown}
          className="text-gray-600 hover:text-blue-600"
        >
          <FaUser />
        </button>
        {/* Conditional Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 top-16 text-center w-36 bg-gray-200 rounded-md shadow-lg z-10">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-400"
                  onClick={() => setShowDropdown(false)}
                >
                  Go to Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-gray-800 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-green-400"
                onClick={() => setShowDropdown(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
        <Link to="/cart" className="relative text-gray-600 hover:text-red-600">
          <FaCartArrowDown />
          <span className="absolute top-0 left-5 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
            {totalItems}
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
