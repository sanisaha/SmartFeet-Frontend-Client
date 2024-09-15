import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/Product";
import { ProductCreateDto, ProductUpdateDto } from "../../models/product/productDto";
import { BaseSlice, BaseState } from "./baseSlice";
import axios, { AxiosError } from "axios";

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

// Export the productReducer
export const productReducer = productSlice.genericSlice.reducer;

// Optionally, export other thunks from BaseSlice
export const {
  fetchAll: fetchProducts,
  createItem: createProduct,
  updateItem: updateProduct,
  deleteItem: deleteProduct,
} = productSlice;