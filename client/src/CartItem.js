import React from "react";

const CartItem = ({ name, price, image, quantity, product_id, total_price, updateCartItem }) => {

  return (
    <li className="product-row">
      <img src={image} alt={name} className="product-image" />
      <div className="product-text">
        {name} - {price} UAN - Кількість: {quantity}
      </div>
      <div className="product-buttons">
        <button onClick={() => updateCartItem({id: product_id, quantity: parseInt(quantity)+1})}>+</button>
        <button onClick={() => updateCartItem({id: product_id, quantity: parseInt(quantity)-1})}>-</button>
      </div>
      <div className="total-price">Загальна вартість: ${total_price.toFixed(2)}</div>
      
    </li>
  );
};

export default CartItem;
