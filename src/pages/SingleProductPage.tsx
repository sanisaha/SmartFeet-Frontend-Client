import React, { useState } from "react";
import collection2 from "../assets/images/Collection-2.jpg";
import RelatedItems from "../shared/ui/RelatedItems";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import { fetchProductById } from "../app/data/productSlice";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const { id } = useParams();

  React.useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const product = products.find((product) => product.id === id);

  /*   const product = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdAt: "2024-09-17T01:20:42.462Z",
    updatedAt: "2024-09-17T01:20:42.462Z",
    title: "Men's Casual T-Shirt",
    description:
      "A stylish and comfortable casual t-shirt for everyday wear. Made from premium cotton fabric.",
    price: 29.99,
    stock: 150,
    subCategoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    brandName: "UrbanStyle",
    discount: 15,
    oldPrice: 34.99,
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Casual",
    productImages: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        imageURL: "https://example.com/images/tshirt-primary.jpg",
        isPrimary: true,
        imageText: "Front view of Men's Casual T-Shirt",
      },
    ],
    productSizes: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        sizeValue: "Medium",
        quantity: 50,
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        sizeValue: "Large",
        quantity: 70,
      },
    ],
    productColors: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        colorName: "Black",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        colorName: "White",
      },
    ],
    reviews: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        reviewDate: "2024-09-15T12:45:00.000Z",
        rating: 5,
        reviewText: "Great fit and comfortable. Perfect for casual outings!",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        createdAt: "2024-09-17T01:20:42.462Z",
        updatedAt: "2024-09-17T01:20:42.462Z",
        reviewDate: "2024-09-14T08:30:00.000Z",
        rating: 2,
        reviewText: "Nice material, but runs slightly larger than expected.",
      },
    ],
  }; */

  //console.log(product);

  // State for quantity and selected tab
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Handle quantity increment and decrement
  const handleQuantityChange = (type: any) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      // Add product to cart logic here
      console.log("Adding to cart:", {
        productId: product.id,
        quantity,
        color: selectedColor,
        size: selectedSize,
      });
    } else {
      console.log("Please select a color and size.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!product) {
    return <div>No product found</div>;
  }

  // Calculate average rating and review count
  const totalReviews = product.reviews.length;
  const averageRating =
    totalReviews > 0
      ? Math.ceil(
          product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
        )
      : 0;

  // Render content based on the active tab
  const renderTabContent = () => {
    if (activeTab === "description") {
      return <p>{product.description}</p>;
    } else if (activeTab === "reviews") {
      return (
        <div>
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          {product.reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            product.reviews.map((review, index) => (
              <div key={index} className="mt-4">
                <h3 className="font-semibold">{"author"}</h3>
                <div className="text-yellow-400">
                  {`★`.repeat(review.rating)}
                </div>
                <p className="mt-2 text-gray-600">{review.reviewText}</p>
                <p className="text-sm text-gray-500">{"review.reviewDate"}</p>
              </div>
            ))
          )}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img src={collection2} alt={product.title} className="rounded-lg" />

          {/* Image Thumbnails */}
          <div className="flex space-x-4 mt-4">
            {product.productImages.map((image, index) => (
              <img
                key={index}
                src={collection2}
                alt={`Thumbnail ${index + 1}`}
                className="w-24 h-24 rounded-lg border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-6 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="flex items-center">
            <div className="text-yellow-400">
              {"★".repeat(averageRating)}
              {"☆".repeat(5 - averageRating)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
            </span>
          </div>

          <p className="text-2xl font-semibold mt-4">${product.price}</p>

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Color:
            </label>
            <div className="flex space-x-2">
              {product.productColors.map((color, index) => (
                <span
                  key={index}
                  className={`block w-6 h-6 rounded-full border-2 cursor-pointer ${
                    selectedColor === color.colorName
                      ? "border-fuchsia-800 p-3 border-2"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.colorName }}
                  onClick={() => setSelectedColor(color.colorName)}
                ></span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Size:
            </label>
            <div className="flex space-x-2">
              {product.productSizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 bg-gray-200 rounded-md cursor-pointer ${
                    selectedSize === size.sizeValue
                      ? "border-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedSize(size.sizeValue)}
                >
                  {size.sizeValue}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex space-x-4 items-center">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-16 text-center border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
            >
              +
            </button>
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-10 border-t border-gray-300 pt-6">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`${
              activeTab === "description"
                ? "text-gray-700 border-b-2 border-black"
                : "text-gray-500"
            } pb-2`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`${
              activeTab === "reviews"
                ? "text-gray-700 border-b-2 border-black"
                : "text-gray-500"
            } pb-2`}
          >
            Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
      <RelatedItems />
    </div>
  );
};

export default ProductPage;
