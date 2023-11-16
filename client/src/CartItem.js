import React from "react";
import { useCartStore } from "./store/cart.store";

const CartItem = ({ name, price, image, quantity, _id }) => {
  const { incrementItemCount, decrementItemCount, getCurrentItem } = useCartStore();
  const item = getCurrentItem(_id);

  return (
    <li className="product-row">
      <img src={image} alt={name} className="product-image" />
      <div className="product-text">
        {name} - {price} USD - Quantity: {item.quantity}
      </div>
      <div className="product-buttons">
        <button onClick={() => incrementItemCount(item._id)}>+</button>
        <button onClick={() => decrementItemCount(item._id)}>-</button>
      </div>
      <div className="total-price">Total price: ${item.totalPrice.toFixed(2)}</div>
    </li>
  );
};

export default CartItem;
