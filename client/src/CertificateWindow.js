import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const CertificateWindow = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-window open">
      <div className="info-content">
        <h2>Quality Certificate</h2>
        <p>Our pizzas are made from the finest ingredients to ensure the best taste and quality.</p>
        <p>Every pizza is prepared with care and expertise to meet our high standards.</p>
        <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faPizzaSlice} />
      </button>
      </div>
    </div>
  );
};

export default CertificateWindow;
