import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import './InfoWindow.css'; 

const InfoWindow = ({ isOpen, onClose }) => {
  return (
    <div className={`info-window ${isOpen ? 'open' : ''}`}>
      <div className="info-content">
        <h2 className="info-title">Delivery and Payment</h2>
        <p>
          We are excited to offer our pizza delivery service to the Brooklyn area! Here are the details for delivery in Brooklyn:
        </p>
        <div className="info-section">
          <h3 className="info-subtitle">Delivery Conditions:</h3>
          <p>
            - Delivery is available to all neighborhoods in Brooklyn.<br />
            - Minimum order amount for delivery is $15.<br />
            - Delivery fee is $2.99 per order.<br />
            - Delivery time may vary based on your location, but we strive to deliver within 30-45 minutes.
          </p>
        </div>
        <div className="info-section">
          <h3 className="info-subtitle">Payment Options:</h3>
          <p>
            - Cash on delivery: Pay with cash when your order arrives.<br />
            - Credit Card: You can also pay with a credit card online when placing your order.
          </p>
        </div>
      </div>
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faPizzaSlice} />
      </button>
    </div>
  );
};

export default InfoWindow;
