import React, { useState } from 'react';
import './Cart.css';

const OrderForm = ({ onClose, onOrderConfirmed }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('self-pickup'); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          phoneNumber,
          deliveryOption,
        }),
      });

      if (response.ok) {
        onOrderConfirmed();
        onClose();
      } else {
        console.error('Error placing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };


  return (
    <div className="order-form-container">
      <div className="order-form">
        <span className="close-button" onClick={onClose}>
          &#10006;
        </span>
        <h3>Placing an order</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Phone number:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          <label>
            Delivery Option:
            <select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
            >
              <option value="self-pickup">Self-Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </label>
          {deliveryOption === 'delivery' && ( 
            <label>
              Delivery Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required={deliveryOption === 'delivery'}
              />
            </label>
          )}
          <button type="submit" className="order-button">
            Confirm the order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
