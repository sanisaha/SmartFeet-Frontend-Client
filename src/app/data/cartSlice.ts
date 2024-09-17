import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/Product";

const localCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : null;
};

const saveCartToLocalStorage = (cart : CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

interface CartItem {
    product: Product;
    quantity: number;
    color: string;
    size: string;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isSyncedWithBackend: boolean;
}

const initialState: CartState = {
    items: localCartFromLocalStorage() || [],
    totalItems: 0,
    totalPrice: 0,
    isSyncedWithBackend: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const { product, quantity, color, size } = action.payload;
            const existingItem = state.items.find((item) => item.product.id === product.id && item.color === color && item.size === size);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalItems += quantity;
            state.totalPrice += quantity * product.price;
            saveCartToLocalStorage(state.items);
        },
        removeItemFromCart: (state, action: PayloadAction<string>) => {
            const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalPrice -= item.product.price * item.quantity;
        state.items.splice(itemIndex, 1);
        saveCartToLocalStorage(state.items);
      }
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.product.id === productId);
            if (existingItem) {
                const diff = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalItems += diff;
                state.totalPrice += diff * existingItem.product.price;
                saveCartToLocalStorage(state.items);
            }
        },
        
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            saveCartToLocalStorage(state.items);
        },
        syncCartWithBackend: (state, action: PayloadAction<boolean>) => {
            state.isSyncedWithBackend = true;
        },
    },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart, syncCartWithBackend } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;