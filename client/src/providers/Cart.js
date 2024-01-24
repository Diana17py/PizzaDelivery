import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], id: null });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (sessionStorage.getItem('cartId')) {
          const cartId = sessionStorage.getItem('cartId');
          const response = await axios.get(`http://127.0.0.1:3001/api/cart/${cartId}`);
          setCart(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = useCallback(async (item) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3001/api/cart/${cart.id}/add`, {
        productId: item.id, 
        quantity: item.quantity,
      });

      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }, [cart.id]);

  const removeFromCart = useCallback(async (item) => {
    try {
      await axios.put(`http://127.0.0.1:3001/api/cart/${cart.id}/update`, {
        productId: item.id, 
        quantity: 0,
      });
      const response = await axios.get(`http://127.0.0.1:3001/api/cart/${cart.id}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }, [cart.id]);

  const clearCart = useCallback(async () => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/cart/${cart.id}`);
      setCart({ items: [], id: null });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [cart.id]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
