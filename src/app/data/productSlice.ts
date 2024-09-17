
import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/Product";
import { ProductCreateDto, ProductUpdateDto } from "../../models/product/productDto";
import { BaseSlice, BaseState, PaginatedResult } from "./baseSlice";
import axios, { AxiosError } from "axios";
import { CategoryName, SizeValue, SubCategoryName } from "../../models/enums/AllEnum";

// Define the API endpoint for products
const productApiEndpoint = "http://localhost:5216/api/Product";

// Extend the BaseSlice for Product specific operations
const productSlice = new BaseSlice<Product, ProductCreateDto, ProductUpdateDto>(
    "products",
    productApiEndpoint,
    (builder: ActionReducerMapBuilder<BaseState<Product>>) => {
      builder.addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
      });
      builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
      builder.addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
      });
        builder.addCase(fetchFilteredProducts.fulfilled, (state, action: PayloadAction<PaginatedResult<Product>>) => {
            state.items = action.payload.items as Product[];
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalItems = action.payload.totalItems;
            state.loading = false;
        });
        builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(fetchProductsBySubCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProductsBySubCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.relatedItems = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProductsBySubCategory.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    }
  );

// Create a new async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk<Product[], string>(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>(`${productApiEndpoint}/category/${categoryId}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

export const fetchProductsBySubCategory = createAsyncThunk<Product[], string>(
    "products/fetchBySubCategory",
    async (subcategoryId, { rejectWithValue }) => {
        try {
        const response = await axios.get<Product[]>(`${productApiEndpoint}/subcategory/${subcategoryId}`);
        return response.data;
        } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
        }
    }
    );

export const fetchFilteredProducts = createAsyncThunk<
  PaginatedResult<Product>,
  { page: number; pageSize: number; category?: CategoryName; subcategory?: SubCategoryName; brand?: string; size?: SizeValue }
>(
  "products/fetchFilteredProducts",
  async ({ page, pageSize, category, subcategory, brand, size }, { rejectWithValue }) => {
    try {
      // Build query params dynamically
      const params = new URLSearchParams();
      params.append("Page", page.toString());
      params.append("PerPage", pageSize.toString());
      if (category) params.append("Category", category);
      if (subcategory) params.append("SubCategory", subcategory);
      if (brand) params.append("Brand", brand);
      if (size) params.append("Size", size);

      // Send the request with only valid query params
      const response = await axios.get<PaginatedResult<Product>>(`${productApiEndpoint}/filter?${params.toString()}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);


// Export the productReducer
export const productReducer = productSlice.genericSlice.reducer;

// Optionally, export other thunks from BaseSlice
export const {
  fetchAll: fetchProducts,
  createItem: createProduct,
  updateItem: updateProduct,
  deleteItem: deleteProduct,
  fetchById: fetchProductById,
} = productSlice;