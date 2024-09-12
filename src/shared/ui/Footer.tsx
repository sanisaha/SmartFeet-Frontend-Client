import React from "react";
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Company Information */}
        <div className="space-y-4">
          <h6 className="text-xl font-semibold">Contact Us</h6>
          <p className="text-gray-600">
            No: 58 A, East Madison Street, Baltimore, MD, USA 4508
          </p>
          <p className="text-gray-600">contact@company.com</p>
          <p className="text-gray-600">+001 2233 456</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaFacebook />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-800">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600">
              <FaXTwitter />
            </a>
            <a href="#" className="text-red-600 hover:text-red-800">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <h6 className="text-xl font-semibold">Categories</h6>
          <ul className="text-gray-600 space-y-2">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
          </ul>
        </div>

        {/* Information Section */}
        <div className="space-y-4">
          <h6 className="text-xl font-semibold">Information</h6>
          <ul className="text-gray-600 space-y-2">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Returns & Exchanges</li>
            <li>Shipping & Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h6 className="text-xl font-semibold">Quick Links</h6>
          <ul className="text-gray-600 space-y-2">
            <li>Store Location</li>
            <li>My Account</li>
            <li>Accessories</li>
            <li>Orders Tracking</li>
            <li>Size Guide</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h6 className="text-xl font-semibold">Newsletter</h6>
          <p className="text-gray-600">
            Subscribe to our newsletter and get 10% off your first purchase.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 pt-6 border-t border-gray-300">
        <p className="text-gray-600">
          © 2024 Copyright by SmartFeet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
