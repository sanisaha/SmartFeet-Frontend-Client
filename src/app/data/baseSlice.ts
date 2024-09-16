import { createAsyncThunk, createSlice, PayloadAction, Slice, ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BaseEntity } from "../../models/shared/BaseEntity";

// Paginated result interface
export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface BaseState<T extends BaseEntity> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error?: string;
}

export class BaseSlice<T extends BaseEntity, CreateDto, UpdateDto> {
  public genericSlice: Slice<BaseState<T>>;
  public fetchAll: any;
  public fetchById: any;
  public createItem: any;
  public updateItem: any;
  public deleteItem: any;
  private apiEndpoint: string;

  constructor(sliceName: string, apiEndpoint: string, extraReducers: (builder: ActionReducerMapBuilder<BaseState<T>>) => void) {
    this.apiEndpoint = apiEndpoint;

    // Create Async Thunks for CRUD Operations
    this.fetchAll = createAsyncThunk<PaginatedResult<T>, { page: number; pageSize: number }>(
      `${sliceName}/fetchAll`,
      async ({ page, pageSize }, { rejectWithValue }) => {
        try {
          const response = await axios.get<PaginatedResult<T>>(`${this.apiEndpoint}?page=${page}&pageSize=${pageSize}`);
          return response.data;
        } catch (error: unknown) {
          const err = error as AxiosError;
          return rejectWithValue(err.message);
        }
      }
    );

    this.fetchById = createAsyncThunk<T, string>(`${sliceName}/fetchById`, async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get<T>(`${this.apiEndpoint}/${id}`);
        return response.data;
      } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
      }
    });

    this.createItem = createAsyncThunk<T, CreateDto>(`${sliceName}/createItem`, async (newItem, { rejectWithValue }) => {
      try {
        const response = await axios.post<T>(`${this.apiEndpoint}`, newItem);
        return response.data;
      } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
      }
    });

    this.updateItem = createAsyncThunk<T, { id: string; updatedItem: UpdateDto }>(
      `${sliceName}/updateItem`,
      async ({ id, updatedItem }, { rejectWithValue }) => {
        try {
          const response = await axios.put<T>(`${this.apiEndpoint}/${id}`, updatedItem);
          return response.data;
        } catch (error: unknown) {
          const err = error as AxiosError;
          return rejectWithValue(err.message);
        }
      }
    );

    this.deleteItem = createAsyncThunk<string, string>(`${sliceName}/deleteItem`, async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${this.apiEndpoint}/${id}`);
        return id;
      } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
      }
    });

    // Define the initial state
    const initialState: BaseState<T> = {
      items: [],
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
      loading: false,
      error: undefined,
    };

    // Create the slice
    this.genericSlice = createSlice({
      name: sliceName,
      initialState,
      reducers: {},
      extraReducers: (builder: ActionReducerMapBuilder<BaseState<T>>) => {
        // Fetch All
        builder.addCase(this.fetchAll.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(this.fetchAll.fulfilled, (state, action: PayloadAction<PaginatedResult<T>>) => {
          state.items = action.payload.items as Draft<T[]>;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
          state.totalItems = action.payload.totalItems;
          state.loading = false;
        });
        builder.addCase(this.fetchAll.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });

        // Other CRUD operations...

        if (extraReducers) {
          extraReducers(builder);
        }
      },
    });
  }
}
