import React, { createContext, useState, useCallback, useEffect } from 'react';
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState({items:[]});
  useEffect(() => {
    if (sessionStorage.getItem('cartId')) {
      const cartId = sessionStorage.getItem('cartId');
      axios.get(`http://127.0.0.1:3001/api/cart/${cartId}`)
        .then(response => {
          setCart(response.data);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, []);

  const addToCart = useCallback((item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        return [...prevCart];
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }, []);

  // Функція для видалення товару з корзини
  const removeFromCart = useCallback((item) => {
    setCart((prevCart) => {
      const cartArray = Array.isArray(prevCart) ? prevCart : [];
      return cartArray.filter((cartItem) => cartItem.id !== item.id);
    });
  }, []);

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
