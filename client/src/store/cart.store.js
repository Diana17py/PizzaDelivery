import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  addItemToCart: (item) => {
    const isItemExists = get().cartItems.find(pizza => item._id === pizza._id);
    if (isItemExists) {
      isItemExists.quantity += item.quantity;
      isItemExists.totalPrice = isItemExists.quantity * isItemExists.price;
      set({ cartItems: [...get().cartItems] });
    } else {
      item.totalPrice = item.quantity * item.price;
      set({ cartItems: [...get().cartItems, item] });
    }
    set({
      totalPrice: get().cartItems.reduce((a, b) => a + b.totalPrice, 0),
    });
  },
  removeItemFromCart: (id) => {
    set((state) => ({
      cartItems: [...state.cartItems.filter(item => item._id !== id)],
    }));
    set({
      totalPrice: get().cartItems.reduce((a, b) => a + b.totalPrice, 0),
    });
  },
  incrementItemCount: (id) => {
    const currentItem = get().cartItems.find(pizza => id === pizza._id);
    if (currentItem && currentItem.quantity >= 1) {
      currentItem.quantity += 1;
      currentItem.totalPrice = currentItem.quantity * currentItem.price;
      set({ cartItems: [...get().cartItems] });
    }
    set({
      totalPrice: get().cartItems.reduce((a, b) => a + b.totalPrice, 0),
    });
  },
  decrementItemCount: (id) => {
    const currentItem = get().cartItems.find(pizza => id === pizza._id);
    if (currentItem && currentItem.quantity > 1) {
      currentItem.quantity -= 1;
      currentItem.totalPrice = currentItem.quantity * currentItem.price;
      set({ cartItems: [...get().cartItems] });
    }
    set({
      totalPrice: get().cartItems.reduce((a, b) => a + b.totalPrice, 0),
    });
  },
  getCurrentItem: (id) => {
    return get().cartItems.find(pizza => id === pizza._id);
  },
  clearCart: () => set(() => ({ cartItems: [], totalPrice: 0 })),
}));
