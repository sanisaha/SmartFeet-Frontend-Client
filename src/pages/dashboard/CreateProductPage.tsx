import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/data/store";
import { ProductCreateDto } from "../../models/product/productDto";
import { createProductByAdmin } from "../../app/data/productSlice";
import { toast } from "react-toastify";
import { categories, colors, sizes, subcategories } from "../ShoesPage";
import axios from "axios";
import { baseURL } from "../../app/data/baseUrl";

const CreateProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.products);

  // Initialize formData with default values
  const [formData, setFormData] = useState<ProductCreateDto>({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    subCategoryId: "",
    brandName: "", // Optional
    discount: 0, // Optional
    oldPrice: 0, // Optional
    isFeatured: false,
    CategoryName: "Men", // Ensure this is correctly typed
    subCategoryName: "Casual", // Ensure this is correctly typed
    productImages: [{ imageURL: "", isPrimary: true, imageText: "" }],
    productSizes: [{ sizeValue: undefined, quantity: 0 }],
    productColors: [{ colorName: undefined }],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prevData) => ({
        ...prevData,
        [name]: target.checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedImages = [...prevData.productImages];
      updatedImages[index] = { ...updatedImages[index], [name]: value };
      return { ...prevData, productImages: updatedImages };
    });
  };

  const handleSizeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedSizes = [...prevData.productSizes];
      updatedSizes[index] = { ...updatedSizes[index], [name]: value };
      return { ...prevData, productSizes: updatedSizes };
    });
  };

  const handleColorChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedColors = [...prevData.productColors];
      updatedColors[index] = { ...updatedColors[index], [name]: value };
      return { ...prevData, productColors: updatedColors };
    });
  };

  const addImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      productImages: [
        ...prevData.productImages,
        { imageURL: "", isPrimary: false, imageText: "" },
      ],
    }));
  };

  const addSize = () => {
    setFormData((prevData) => ({
      ...prevData,
      productSizes: [
        ...prevData.productSizes,
        { sizeValue: undefined, quantity: 0 },
      ],
    }));
  };

  const addColor = () => {
    setFormData((prevData) => ({
      ...prevData,
      productColors: [...prevData.productColors, { colorName: undefined }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const categoryResponse = await axios.get(
        `${baseURL}/api/v1/Category/categoryName/${formData.CategoryName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const categoryId = categoryResponse.data.id;
      const subcategoryResponse = await axios.get(
        `${baseURL}/api/v1/SubCategory/subCategoryName/${formData.subCategoryName}?categoryId=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const subCategoryId = subcategoryResponse.data.id;

      await dispatch(createProductByAdmin({ ...formData, subCategoryId }));
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error fetching subcategory:", error);
      toast.error("Error creating product. Please try again.");
      // Optionally handle the error here (e.g., set error state)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-600">
          Create Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
              placeholder="Enter product title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Stock:
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Brand Name:
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="Enter brand name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Discount:
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="Enter discount amount"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Old Price:
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                placeholder="Enter old price"
              />
            </div>
          </div>

          {/* Is Featured */}
          <div className="flex items-center">
            <label className="block text-gray-700 font-medium mr-2">
              Is Featured:
            </label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 border border-gray-300 rounded"
            />
          </div>

          {/* Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category Name:
            </label>
            <select
              name="CategoryName"
              value={formData.CategoryName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Sub Category Name:
            </label>
            <select
              name="subCategoryName"
              value={formData.subCategoryName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Images:
            </label>
            {formData.productImages.map((image, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="imageURL"
                  value={image.imageURL}
                  onChange={(e) => handleImageChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                  placeholder="Enter image URL"
                />
                <input
                  type="text"
                  name="imageText"
                  value={image.imageText}
                  onChange={(e) => handleImageChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mt-2"
                  placeholder="Enter image text"
                />
                <div>
                  <label className="block text-gray-700 font-medium mt-2">
                    Is Primary:
                  </label>
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={image.isPrimary}
                    onChange={(e) => handleImageChange(index, e)}
                    className="w-5 h-5 border border-gray-300 rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addImage}
              className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Another Image
            </button>
          </div>

          {/* Product Sizes */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Sizes and Quantity:
            </label>
            {formData.productSizes.map((size, index) => (
              <div key={index} className="mb-4">
                <select
                  name="sizeValue"
                  value={size.sizeValue}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="quantity"
                  value={size.quantity}
                  onChange={(e) => handleSizeChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 mt-2"
                  placeholder="Enter quantity"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSize}
              className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Another Size
            </button>
          </div>

          {/* Product Colors */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Colors:
            </label>
            {formData.productColors.map((color, index) => (
              <div key={index} className="mb-4">
                <select
                  name="colorName"
                  value={color.colorName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="w-full py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Add Another Color
            </button>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-3 px-6 font-semibold text-white rounded-lg transition ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>

          {/* Error Display */}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
