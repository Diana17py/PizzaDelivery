import React, { createContext, useState, useCallback, useEffect } from 'react';
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({id: null, cart_items:[], total_price: 0 });
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartId = sessionStorage.getItem('cartId');
        if (cartId) {
          const response = await fetch(`http://127.0.0.1:3001/api/cart/${cartId}`);
          const data = await response.json(); 
          setCart(prevState => ({...prevState, ...data.cart}));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
      fetchCart();
    },[])
    

   
  const addToCart = useCallback(async (product) => {
    const response = await fetch(`http://127.0.0.1:3001/api/cart/${cart.id}/add`, {
      method: "POST",
      body: JSON.stringify({
        productId: product.id,
        quantity: product.quantity
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status >= 200 && response.status < 300){
      const data = await response.json();
      setCart(prevState => ({...prevState, ...data.cart}));
    }else{
      toast.error("Не вдалося додати продукт до корзини");
    }
  }, [cart]);

  const updateCartItem = useCallback(async (product) => {
    const response = await fetch(`http://127.0.0.1:3001/api/cart/${cart.id}/update`, {
      method: "PUT",
      body: JSON.stringify({
        productId: product.id,
        quantity: product.quantity
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status >= 200 && response.status < 300){
      const data = await response.json();
      setCart(prevState => ({...prevState, ...data.cart}));
    }else{
      toast.error("Не вдалося обновити продукт");
    }
  }, [cart]);

  const clearCart = useCallback(async () => {
    const response = await fetch(`http://127.0.0.1:3001/api/cart/${cart.id}`, {
      method: "DELETE"
    });
    if (response.status >= 200 && response.status < 300){
      const data = await response.json();
      setCart(prevState => ({...prevState, ...data.cart}));
    }else{
      toast.error("Не вдалося очистити корзину");
    }
  }, [cart]);


  return (
    <CartContext.Provider value={{addToCart, clearCart, cart, updateCartItem}}>
      {children}
    </CartContext.Provider>
  );
};
