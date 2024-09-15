import { createAsyncThunk, createSlice, PayloadAction, Slice, ActionReducerMapBuilder, Draft } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BaseEntity } from "../../models/shared/BaseEntity";


export interface BaseState<T extends BaseEntity> {
  items: T[];
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
    this.fetchAll = createAsyncThunk<T[]>(`${sliceName}/fetchAll`, async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get<T[]>(`${this.apiEndpoint}`);
        return response.data;
      } catch (error: unknown) {
        const err = error as AxiosError;
        return rejectWithValue(err.message);
      }
    });

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
        builder.addCase(this.fetchAll.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.items = action.payload as Draft<T[]>;
          state.loading = false;
        });
        builder.addCase(this.fetchAll.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });

        // Fetch by Id
        builder.addCase(this.fetchById.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(this.fetchById.fulfilled, (state, action: PayloadAction<T>) => {
          const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
          if (itemIndex === -1) {
            state.items.push(action.payload as Draft<T>);
          } else {
            state.items[itemIndex] = action.payload as Draft<T>;
          }
          state.loading = false;
        });
        builder.addCase(this.fetchById.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });

        // Create Item
        builder.addCase(this.createItem.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(this.createItem.fulfilled, (state, action: PayloadAction<T>) => {
          state.items.push(action.payload as Draft<T>);
          state.loading = false;
        });
        builder.addCase(this.createItem.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });

        // Update Item
        builder.addCase(this.updateItem.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(this.updateItem.fulfilled, (state, action: PayloadAction<T>) => {
          const index = state.items.findIndex((item) => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload as Draft<T>;
          }
          state.loading = false;
        });
        builder.addCase(this.updateItem.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });

        // Delete Item
        builder.addCase(this.deleteItem.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(this.deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((item) => item.id !== action.payload);
          state.loading = false;
        });
        builder.addCase(this.deleteItem.rejected, (state, action) => {
          state.error = action.payload as string;
          state.loading = false;
        });
        // Apply custom extra reducers if provided
        if (extraReducers) {
            extraReducers(builder);
          }
      },
    });
  }
}
