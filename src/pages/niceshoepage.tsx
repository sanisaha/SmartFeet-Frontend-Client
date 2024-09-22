import React, { useEffect, useState, Suspense } from "react";
import collection2 from "../assets/images/Collection-2.webp";
import { AppDispatch, RootState } from "../app/data/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductByAdmin,
  fetchFilteredProducts,
  updateProductByAdmin,
} from "../app/data/productSlice";
import {
  CategoryName,
  ColorName,
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
export const colors: ColorName[] = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
];
const brands = ["Nike", "Adidas", "Puma", "Reebok"];
export const sizes: SizeValue[] = ["Small", "Medium", "Large", "ExtraLarge"];

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
  const { items: products, loading } = useSelector(
    (state: RootState) => state.products
  );
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
      .catch(() => {
        toast.error("Error deleting product");
      });
  };

  const handleEdit = (product: any) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleSave = (updatedProduct: ProductUpdateDto) => {
    setIsModalOpen(false);
    dispatch(updateProductByAdmin(updatedProduct))
      .then(() => {
        toast.success("Product updated successfully");
      })
      .catch(() => {
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

      {/* Filters Row */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-gray-600 mb-2">
            Category
          </label>
          <select
            id="category"
            className="block w-full md:w-48 p-2 border rounded transition duration-200 ease-in-out hover:border-blue-500"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as CategoryName)
            }
            aria-label="Select Category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        <div>
          <label htmlFor="subcategory" className="block text-gray-600 mb-2">
            Subcategory
          </label>
          <select
            id="subcategory"
            className="block w-full md:w-48 p-2 border rounded transition duration-200 ease-in-out hover:border-blue-500"
            value={selectedSubcategory || ""}
            onChange={(e) =>
              setSelectedSubcategory(
                (e.target.value as SubCategoryName) || undefined
              )
            }
            aria-label="Select Subcategory"
          >
            <option value="">All</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Filter */}
        <div>
          <label htmlFor="brand" className="block text-gray-600 mb-2">
            Brand
          </label>
          <select
            id="brand"
            className="block w-full md:w-48 p-2 border rounded transition duration-200 ease-in-out hover:border-blue-500"
            value={selectedBrand || ""}
            onChange={(e) => setSelectedBrand(e.target.value || undefined)}
            aria-label="Select Brand"
          >
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label htmlFor="size" className="block text-gray-600 mb-2">
            Size
          </label>
          <select
            id="size"
            className="block w-full md:w-48 p-2 border rounded transition duration-200 ease-in-out hover:border-blue-500"
            value={selectedSize || ""}
            onChange={(e) =>
              setSelectedSize((e.target.value as SizeValue) || undefined)
            }
            aria-label="Select Size"
          >
            <option value="">All</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Content - Shoe Grid */}
      <div className="w-full p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.length > 0 ? (
            products.map((shoe) => (
              <div
                key={shoe.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
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
                        aria-label="Edit Product"
                        onClick={() => handleEdit(shoe)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(shoe.id)}
                        aria-label="Delete Product"
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

      {/* Edit Product Modal */}
      <Suspense fallback={<div>Loading modal...</div>}>
        {productToEdit && (
          <EditProductModal
            product={productToEdit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Suspense>
    </div>
  );
};

export default ShoesPage;
