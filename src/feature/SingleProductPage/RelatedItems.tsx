import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import collection2 from "../../assets/images/Collection-2.webp";
import { CategoryName, SubCategoryName } from "../../models/enums/AllEnum";
import { Product } from "../../models/product/Product";
import { Link } from "react-router-dom";

interface RelatedItemsProps {
  products: Product[];
}
const RelatedItems: React.FC<RelatedItemsProps> = ({ products }) => {
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
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="border rounded-lg shadow-sm p-4 text-center">
              <Link to={`/shoes/${product.id}`}>
                <img
                  src={product.productImages[0].imageURL || collection2}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4"
                  loading="lazy"
                />
              </Link>
              <div className="text-left">
                {product.isFeatured && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    Trending
                  </span>
                )}
                {product.oldPrice ? (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold ml-2">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </span>
                ) : (
                  <span></span>
                )}
                <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                <p className="text-sm text-gray-500">
                  {product.categoryName}, {product.brandName}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold">€ {product.price}</p>
                  {product.oldPrice && (
                    <p className="line-through text-sm text-gray-400">
                      € {product.oldPrice}
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
