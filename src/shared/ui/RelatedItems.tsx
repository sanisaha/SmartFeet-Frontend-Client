import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import collection2 from "../../assets/images/Collection-2.jpg";
import { CategoryName, SubCategoryName } from "../../models/enums/AllEnum";

// Sample related products data
const relatedProducts = [
  {
    name: "Air Jordan 7 Retro",
    image: "https://via.placeholder.com/150",
    price: 120,
    originalPrice: 220,
    isNew: true,
    discount: 35,
    category: "Men shoes",
    brand: "Nike, Jordan",
  },
  {
    name: "Air Jordan 7 Retro",
    image: "https://via.placeholder.com/150",
    price: 120,
    isNew: true,
    category: "Men shoes",
    brand: "Nike, Jordan",
  },
  {
    name: "Air Jordan 7 Retro",
    image: "https://via.placeholder.com/150",
    price: 120,
    isNew: true,
    category: "Men shoes",
    brand: "Nike, Jordan",
  },
  {
    name: "Air Jordan 7 Retro",
    image: "https://via.placeholder.com/150",
    price: 120,
    isNew: true,
    category: "Men shoes",
    brand: "Nike, Jordan",
  },
  {
    name: "Air Jordan 7 Retro",
    image: "https://via.placeholder.com/150",
    price: 120,
    isNew: true,
    category: "Men shoes",
    brand: "Nike, Jordan",
  },
];
interface RelatedItemsProps {
  category: CategoryName;
  subcategory: SubCategoryName;
}
const RelatedItems = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold mb-6">- YOU MIGHT ALSO LIKE</h2>
      <Slider {...settings}>
        {relatedProducts.map((product, index) => (
          <div key={index} className="p-4">
            <div className="border rounded-lg shadow-sm p-4 text-center">
              <img
                src={collection2}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <div className="text-left">
                {product.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    New
                  </span>
                )}
                {product.discount && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold ml-2">
                    -{product.discount}%
                  </span>
                )}
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  {product.category}, {product.brand}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold">£ {product.price}</p>
                  {product.originalPrice && (
                    <p className="line-through text-sm text-gray-400">
                      £ {product.originalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RelatedItems;
