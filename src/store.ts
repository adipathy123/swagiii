import { create } from 'zustand';
import { CartItem, MenuItem } from './types';

interface StoreState {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  total: 0,
  addToCart: (item: MenuItem) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
          total: state.total + item.price,
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeFromCart: (itemId: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
      total: state.total - (state.cart.find((item) => item.id === itemId)?.price || 0),
    })),
  updateQuantity: (itemId: number, quantity: number) =>
    set((state) => {
      const item = state.cart.find((item) => item.id === itemId);
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        ),
        total: state.total + (item.price * quantityDiff),
      };
    }),
  clearCart: () => set({ cart: [], total: 0 }),
}));