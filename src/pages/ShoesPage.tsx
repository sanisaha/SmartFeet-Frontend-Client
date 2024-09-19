import React, { useEffect, useState } from "react";
import collection2 from "../assets/images/Collection-2.jpg";
import { AppDispatch, RootState } from "../app/data/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductByAdmin,
  fetchFilteredProducts,
  updateProductByAdmin,
} from "../app/data/productSlice";
import {
  CategoryName,
  SizeValue,
  SubCategoryName,
} from "../models/enums/AllEnum";
import { Link, useLocation } from "react-router-dom";
import ProductHeader from "../shared/ui/ProductHeader";
import { getUser } from "../app/data/authSlice";
import { toast } from "react-toastify";
import { ProductUpdateDto } from "../models/product/productDto";
import EditProductModal from "../feature/ShoesPage/EditProductModal";

export const categories: CategoryName[] = ["Men", "Women", "Kids"];
export const subcategories: SubCategoryName[] = [
  "Casual",
  "Sports",
  "Formal",
  "Boots",
  "Sandals",
  "Sneakers",
  "Heels",
  "Running",
  "Training",
  "Comfort",
  "School",
];
const brands = ["Nike", "Adidas", "Puma", "Reebok"];
const sizes: SizeValue[] = ["Small", "Medium", "Large", "ExtraLarge"];

const ShoesPage = () => {
  const location = useLocation();
  const { category, subcategory } = location.state || {};
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>(
    category || "Men"
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    SubCategoryName | undefined
  >(subcategory);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<SizeValue | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        page: 1,
        pageSize: 10,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        brand: selectedBrand,
        size: selectedSize,
      })
    );
  }, [
    dispatch,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedSize,
  ]);

  const handleDelete = (id: string) => {
    dispatch(deleteProductByAdmin(id))
      .then(() => {
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting product");
      });
  };

  const handleEdit = (product: any) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSave = (updatedProduct: ProductUpdateDto) => {
    // Call the update product API
    setIsModalOpen(false);
    dispatch(updateProductByAdmin(updatedProduct))
      .then(() => {
        toast.success("Product updated successfully");
      })
      .catch((err) => {
        toast.error("Error updating product");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ProductHeader />
      <div className="w-full bg-gray-200 py-4 flex items-center justify-center shadow-sm">
        <div className="flex items-center text-lg font-semibold text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3v4h4M7 17H3m0 0v4m4-4v4m4 0h10a2 2 0 002-2v-5a2 2 0 00-2-2h-5l-4-4H5a2 2 0 00-2 2v10z"
            />
          </svg>
          FREE DELIVERY: Get free standard delivery on every order with
          SmartFeet
        </div>
      </div>
      <div className="flex my-6">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Categories */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Category</h2>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
              />
              <label className="text-gray-700">{category}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Subcategories */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Subcategory</h2>
          {subcategories.map((subcategory) => (
            <div key={subcategory} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                name="subcategory"
                checked={selectedSubcategory === subcategory}
                onChange={() =>
                  setSelectedSubcategory(
                    selectedSubcategory === subcategory
                      ? undefined
                      : subcategory
                  )
                }
              />
              <label className="text-gray-700">{subcategory}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Brands */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Shoe Brand</h2>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedBrand === brand}
                onChange={() =>
                  setSelectedBrand(selectedBrand === brand ? "" : brand)
                }
              />
              <label className="text-gray-700">{brand}</label>
            </div>
          ))}
          <hr className="my-4 border-t-2 border-gray-300" />

          {/* Sizes */}
          <h2 className="text-3xl font-bold text-gray-600 mb-4">Size</h2>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`border rounded-md p-2 ${
                  selectedSize === size ? "bg-black text-white" : "bg-white"
                }`}
                onClick={() =>
                  setSelectedSize(selectedSize === size ? undefined : size)
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Shoe Grid */}
        <div className="w-3/4 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((shoe) => (
                <div
                  key={shoe.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    {shoe.oldPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                        -
                        {Math.round(
                          ((shoe.oldPrice - shoe.price) / shoe.oldPrice) * 100
                        )}
                        %
                      </span>
                    )}
                    <Link to={`/shoes/${shoe.id}`}>
                      <img
                        src={shoe.productImages[0].imageURL || collection2}
                        alt={shoe.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{shoe.title}</h3>
                    <p className="text-gray-500 text-sm">{shoe.brandName}</p>
                    <div className="mt-2">
                      {shoe.oldPrice && (
                        <span className="text-gray-500 line-through mr-2">
                          €{shoe.oldPrice}
                        </span>
                      )}
                      <span className="font-bold text-lg">€{shoe.price}</span>
                    </div>
                    {user?.role === "Admin" && (
                      <div className="flex justify-between items-center mt-2">
                        <button
                          onClick={() => handleEdit(shoe)}
                          className="btn btn-warning"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(shoe.id)}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No shoes found</p>
            )}
          </div>
        </div>
      </div>
      {/* Edit Product Modal */}
      {productToEdit && (
        <EditProductModal
          product={productToEdit} // Pass selected product to modal
          isOpen={isModalOpen} // Modal visibility
          onClose={() => setIsModalOpen(false)} // Close modal
          onSave={handleSave} // Save handler
        />
      )}
    </div>
  );
};

export default ShoesPage;
