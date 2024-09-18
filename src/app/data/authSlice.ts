/* export const logoutUser = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
    };
}; */

import axios from "axios";
import { UserCredentials } from "../../models/user/UserCredentials";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'), // Check if token is already stored in localStorage
    isAuthenticated: !!localStorage.getItem('token'),
    error: null
};

export const loginUsers = createAsyncThunk(
    'auth/loginUsers',
    async ({ email, password }: UserCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<string>('http://localhost:5216/login', { email, password });
            /* if (!response.status) {
                const errorData = await response;
                return rejectWithValue(errorData || 'Login failed');
            } */
           const token = response.data;
              localStorage.setItem('token', token);
                return token;
        }
        catch (error: unknown) {
            const err = error as string;
            return rejectWithValue(err);
        }
    }
);

export const logoutUsers = createAsyncThunk(
    'auth/logoutUsers',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            return null;
        }
        catch (error: unknown) {
            const err = error as string;
            return rejectWithValue(err);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loginUsers.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.error = null;
        });
        builder.addCase(loginUsers.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isAuthenticated = false;
        });
        builder.addCase(logoutUsers.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.token = null;
        });
        builder.addCase(logoutUsers.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export const authReducer = authSlice.reducer;