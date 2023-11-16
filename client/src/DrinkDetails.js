import React, { useState } from 'react';
import './DrinkDetails.css';
import { CartButton } from './ui/CartButton';

const DrinkDetails = ({drink, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  if (!drink) {
    return null;
  }

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value) || 1));
  };

  const calculateTotalPrice = () => {
    const basePrice = drink.price;
    return (basePrice * quantity).toFixed(2);
  };

  console.log(quantity)

  const totalPrice = calculateTotalPrice()

  return (
    <div className="drink-details-container">
      <div className="drink-details-card">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>{drink.name}</h3>
        <img src={drink.image} alt={drink.name} />
        <p>{drink.description}</p>
        <p>Price: {drink.price}USD</p>

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

        <CartButton drink={drink} totalPrice={totalPrice} quantity={quantity}/>
      </div>
    </div>
  );
};

export default DrinkDetails;
