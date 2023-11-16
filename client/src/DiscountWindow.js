import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
const DiscountWindow = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Discounts and Promotions</h2>
        <p>Every day: 10% off on self-pickup orders.</p>
        <p>Monday: 39% off every second roll*</p>
        <p>Tuesday: 39% off every second pizza*</p>
        <p>Wednesday: 15% off all pizzas for self-pickup orders</p>
        <p>Thursday: 15% off all rolls for self-pickup orders</p>
        <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faPizzaSlice} />
      </button>
      </div>
    </div>
  );
};

export default DiscountWindow;
