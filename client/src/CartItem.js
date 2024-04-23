import React from "react";
import { useCartStore } from "./store/cart.store";

const CartItem = ({ name, price, image, quantity, id }) => {
  const { incrementItemCount, decrementItemCount, getCurrentItem } = useCartStore();
  const item = getCurrentItem(id);

  return (
    <li className="product-row">
      <img src={image} alt={name} className="product-image" />
      <div className="product-text">
        {name} - {price} UAN - Кількість: {item.quantity}
      </div>
      <div className="product-buttons">
        <button onClick={() => incrementItemCount(item.id)}>+</button>
        <button onClick={() => decrementItemCount(item.id)}>-</button>
      </div>
      <div className="total-price">Загальна вартість: ${item.totalPrice.toFixed(2)}</div>
    </li>
  );
};

export default CartItem;
