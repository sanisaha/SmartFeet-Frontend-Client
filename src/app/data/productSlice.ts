
import { ActionReducerMapBuilder, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/Product";
import { ProductCreateDto, ProductUpdateDto } from "../../models/product/productDto";
import { BaseSlice, BaseState, PaginatedResult } from "./baseSlice";
import axios, { AxiosError } from "axios";
import { CategoryName, SizeValue, SubCategoryName } from "../../models/enums/AllEnum";
import { title } from "process";

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
        builder.addCase(fetchProductsByNewArrival.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProductsByNewArrival.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.newArrivals = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProductsByNewArrival.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(fetchProductsByFeatured.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProductsByFeatured.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.featuredProducts = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchProductsByFeatured.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(createProductByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProductByAdmin.fulfilled, (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
            state.loading = false;
        });
        builder.addCase(createProductByAdmin.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(deleteProductByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProductByAdmin.fulfilled, (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((product) => product.id !== action.payload);
            state.loading = false;
        });
        builder.addCase(deleteProductByAdmin.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(updateProductByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductByAdmin.fulfilled, (state, action: PayloadAction<Product>) => {
            const product = state.items.find((p) => p.id === action.payload.id);
            if (product) {
                Object.assign(product, action.payload);
            }
            state.loading = false;
        });
        builder.addCase(updateProductByAdmin.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(searchProductsByTitle.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchProductsByTitle.fulfilled, (state, action: PayloadAction<Product[]>) => {
            state.searchProducts = action.payload;
            state.loading = false;
        });
        builder.addCase(searchProductsByTitle.rejected, (state, action) => {
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

// Create a new async thunk for search products by title
export const searchProductsByTitle = createAsyncThunk(
  'products/searchProductsByTitle',
  async (query : string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${productApiEndpoint}/search`, {
        params: {
          title: query
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error fetching search results');
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
export const fetchProductsByNewArrival = createAsyncThunk<Product[]>(
    "products/fetchByNewArrival",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get<Product[]>(`${productApiEndpoint}/new-arrival`);
        return response.data;
        } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
        }
    }
    );
export const fetchProductsByFeatured = createAsyncThunk<Product[]>(
    "products/fetchByFeatured",
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get<Product[]>(`${productApiEndpoint}/featured`);
        return response.data;
        } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
        }
    }
    );
// Create a new async thunk for creating a new product
export const createProductByAdmin = createAsyncThunk<Product, ProductCreateDto>(
  "products/createProduct",
  async (productDto, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Invalid token');
            }
      const response = await axios.post<Product>(productApiEndpoint, productDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

// Create a new async thunk for delete product
export const deleteProductByAdmin = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Invalid token');
            }
      await axios.delete(`${productApiEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      return id;
    } catch (error: unknown) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

// Create a new async thunk for update product
export const updateProductByAdmin = createAsyncThunk<Product, ProductUpdateDto>(
  "products/updateProduct",
  async (productDto, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
            if (!token) {
                return rejectWithValue('Invalid token');
            }
      const response = await axios.put<Product>(`${productApiEndpoint}/${productDto.id}`, productDto, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
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