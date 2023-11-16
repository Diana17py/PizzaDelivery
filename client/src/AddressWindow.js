import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const AddressWindow = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-window open">
      <div className="info-content">
        <h2>PIZZA PLACE</h2>
        <p>New York, Brooklyn</p>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faPizzaSlice} />
        </button>
      </div>
    </div>
  );
};

export default AddressWindow;
