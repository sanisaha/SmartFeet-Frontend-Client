import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product/Product";

// Load cart from localStorage
const localCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { items: [], totalItems: 0, totalPrice: 0, isSyncedWithBackend: false };
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Define CartItem and CartState interfaces
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

// Initial state
const initialState: CartState = localCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.color === color && item.size === size
      );

      if (existingItem) {
        state.totalItems -= existingItem.quantity; // Remove existing quantity from totalItems
        state.totalPrice -= existingItem.quantity * product.price; // Remove existing price from totalPrice
        existingItem.quantity += quantity; // Update the existing item quantity
      } else {
        state.items.push(action.payload); // Add new item
      }

      // Update totals
      state.totalItems += quantity;
      state.totalPrice += quantity * product.price;
      
      saveCartToLocalStorage(state); // Save to localStorage
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity; // Subtract item quantity from totalItems
        state.totalPrice -= item.product.price * item.quantity; // Subtract item price from totalPrice
        state.items.splice(itemIndex, 1); // Remove item from the array
        saveCartToLocalStorage(state); // Save to localStorage
      }
    },

    updateQuantity: (state, action: PayloadAction<{ productId: string, quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === productId);

      if (existingItem) {
        const diff = quantity - existingItem.quantity; // Calculate the difference
        state.totalItems += diff; // Update totalItems
        state.totalPrice += diff * existingItem.product.price; // Update totalPrice
        existingItem.quantity = quantity; // Update item quantity
        saveCartToLocalStorage(state); // Save to localStorage
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state); // Save to localStorage
    },

    syncCartWithBackend: (state, action: PayloadAction<boolean>) => {
      state.isSyncedWithBackend = action.payload; // Sync status can be true or false
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart, syncCartWithBackend } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
