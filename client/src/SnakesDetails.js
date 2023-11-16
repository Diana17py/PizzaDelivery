import React from 'react';
import './SnacksDetails.css';

const SnakesDetails = ({ isOpen, snake, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="snake-details-container">
      <div className="snake-details-card">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3>{snake.name}</h3>
        <img src={snake.image_url} alt={snake.name} className="snake-details-image" />
        <p>{snake.description}</p>
      </div>
    </div>
  );
};

export default SnakesDetails;
