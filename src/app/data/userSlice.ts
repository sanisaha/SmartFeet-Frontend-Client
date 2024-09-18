import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user/User";
import axios from "axios";
import { UserCreateDto, UserUpdateDto } from "../../models/user/UserDto";

// Initial state for user management
interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: UserCreateDto, { rejectWithValue }) => {
      try {
        const response = await axios.post<User>('http://localhost:5216/api/v1/users', user);
        /* if (!response.status) {
            const errorData = await response;
            return rejectWithValue(errorData || 'User registration failed');
          } */
        return response.data;
      } catch (error: unknown) {
        const err = error as string;
        return rejectWithValue(err);
      }
    }
  );

  export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user: UserUpdateDto, { rejectWithValue }) => {
      try {
        const response = await axios.put<User>(`http://localhost:5216/api/v1/users/${user.id}`, user);
        return response.data;
      } catch (error: unknown) {
        const err = error as string;
        return rejectWithValue(err);
      }
    }
  );

  export const removeUser = createAsyncThunk(
    'user/removeUser',
    async (userId: string, { rejectWithValue }) => {
      try {
        await axios.delete(`http://localhost:5216/api/v1/users/${userId}`);
        return userId;
      } catch (error: unknown) {
        const err = error as string;
        return rejectWithValue(err);
      }
    }
  );

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
      builder.addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

      builder.addCase(updateUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
      builder.addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

      builder.addCase(removeUser.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(removeUser.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
      });
      builder.addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
    },
  });

  export const userReducer = userSlice.reducer;