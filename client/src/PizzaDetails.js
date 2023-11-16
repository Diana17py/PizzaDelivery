import React, { useState } from 'react';
import './PizzaDetails.css';
import { CartButton } from './ui/CartButton';

const PizzaDetails = ({pizza, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!pizza) {
    return null;
  }

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value) || 1));
  };

  const calculateTotalPrice = () => {
    const basePrice = pizza.price;
    return (basePrice * quantity).toFixed(2);
  };

  console.log(quantity)

  const totalPrice = calculateTotalPrice()

  return (
    <div className="pizza-details-container">
      <div className="pizza-details-card">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>{pizza.name}</h3>
        <img src={pizza.image} alt={pizza.name} />
        <p>Price: {pizza.price}USD</p>
        <p>Description: {pizza.description}</p>

        <div className="quantity-container">
          <span>Quantity:</span>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        <p>Total Price: {totalPrice} USD</p>

        <CartButton pizza={pizza} totalPrice={totalPrice} quantity={quantity}/>
      </div>
    </div>
  );
};

export default PizzaDetails;
