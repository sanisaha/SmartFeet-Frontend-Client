import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { cartReducer } from './cartSlice';
import { userReducer } from './userSlice';
//import { addressReducer } from './addressSlice';

export const store = configureStore({
  reducer: {
    products : productReducer,
    cart : cartReducer,
    user : userReducer
    //addressReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
