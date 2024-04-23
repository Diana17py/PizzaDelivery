import React from 'react';
import { useCartStore } from '../store/cart.store';

export const CartButton = ({ pizza, totalPrice, quantity }) => {
  const { addItemToCart } = useCartStore();

  return (
    <button onClick={() => addItemToCart({ ...pizza, totalPrice, quantity })}>
      Додати в корзину
    </button>
  );
};

export default CartButton;