import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  addItemToCart: (item) => {
    const isItemExists = get().cartItems.find((product) => item.id === product.id);
  
    if (isItemExists) {
      set((state) => ({
        cartItems: state.cartItems.map((product) =>
          product.id === item.id
            ? {
                ...product,
                quantity: product.quantity + item.quantity,
                totalPrice: (product.quantity + item.quantity) * product.price,
              }
            : product
        ),
        totalPrice: state.cartItems.reduce((a, b) => a + b.totalPrice, 0),
      }));
    } else {
      set((state) => ({
        cartItems: [
          ...state.cartItems,
          { ...item, totalPrice: item.quantity * item.price },
        ],
        totalPrice: state.totalPrice + item.quantity * item.price,
      }));
    }
  },
  removeItemFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
      totalPrice: state.cartItems.reduce((a, b) => a + b.totalPrice, 0),
    }));
  },
  clearItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
      totalPrice: state.cartItems.reduce((a, b) => a + b.totalPrice, 0),
    }));
  },
  incrementItemCount: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((product) =>
        product.id === id && product.quantity >= 1
          ? {
              ...product,
              quantity: product.quantity + 1,
              totalPrice: (product.quantity + 1) * product.price,
            }
          : product
      ),
      totalPrice: state.cartItems.reduce((a, b) => a + b.totalPrice, 0),
    }));
  },
  decrementItemCount: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((product) =>
        product.id === id && product.quantity > 1
          ? {
              ...product,
              quantity: product.quantity - 1,
              totalPrice: (product.quantity - 1) * product.price,
            }
          : product
      ),
      totalPrice: state.cartItems.reduce((a, b) => a + b.totalPrice, 0),
    }));
  },
  getCurrentItem: (id) => {
    return get().cartItems.find((product) => id === product.id);
  },
  clearCart: () => set(() => ({ cartItems: [], totalPrice: 0 })),
}));
