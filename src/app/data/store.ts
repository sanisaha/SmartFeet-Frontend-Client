import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { cartReducer } from './cartSlice';
//import { addressReducer } from './addressSlice';

export const store = configureStore({
  reducer: {
    products : productReducer,
    cart : cartReducer
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
