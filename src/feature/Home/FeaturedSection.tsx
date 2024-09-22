import React, { useState } from "react";
import collection2Small from "../../assets/images/Collection-2.webp";
import { Product } from "../../models/product/Product";
import { Link } from "react-router-dom";

const categories = ["All", "Nike", "Adidas", "Men", "Women", "Kids"];

interface FeaturedSectionProps {
  featuredProducts: Product[];
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  featuredProducts,
}) => {
  const [filteredCategory, setFilteredCategory] = useState("All");

  // Filter logic
  const filteredShoes = featuredProducts.filter((shoe) => {
    if (filteredCategory === "All") return true;
    if (filteredCategory === "Nike" || filteredCategory === "Adidas") {
      return shoe.brandName === filteredCategory;
    }
    return shoe.categoryName === filteredCategory;
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
            aria-label={`Filter by ${category}`}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredShoes.map((shoe) => {
          const totalReviews = shoe.reviews.length;
          const averageRating =
            totalReviews > 0
              ? Math.ceil(
                  shoe.reviews.reduce((sum, review) => sum + review.rating, 0) /
                    totalReviews
                )
              : 0;
          return (
            <div
              key={shoe.id}
              className="relative group bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 ease-in-out"
            >
              {shoe.oldPrice ? (
                <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                  -
                  {Math.round(
                    ((shoe.oldPrice - shoe.price) / shoe.oldPrice) * 100
                  )}
                  %
                </span>
              ) : (
                <span></span>
              )}
              {/* Product Image */}
              <Link to={`/shoes/${shoe.id}`} className="block">
                <img
                  src={shoe.productImages[0].imageURL || collection2Small}
                  alt={shoe.title}
                  className="w-full h-96 object-cover z-10" // Ensuring the image is on top
                />
              </Link>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 transition-all duration-200 ease-in-out pointer-events-none"></div>

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-80 group-hover:bg-opacity-100 transition-all duration-200 ease-in-out flex justify-between items-end z-20">
                {/* Rating, Title, Category */}
                <div>
                  {/* Rating */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="text-yellow-400">
                      {"★".repeat(averageRating)}
                      {"☆".repeat(5 - averageRating)}
                    </div>
                  </div>

                  {/* Title and Category */}
                  <div className="mt-1 text-left">
                    <h3 className="text-md font-semibold">{shoe.title}</h3>
                    <p className="text-sm text-gray-600">{shoe.categoryName}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-lg font-bold">€{shoe.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedSection;
