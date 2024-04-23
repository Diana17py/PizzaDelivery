import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
const DiscountWindow = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Знижки та акції</h2>
        <p>Кожен день: знижка 10% на замовлення з самовивозом.</p>
        <p>Понеділок: знижка 39% на кожен другий снек*</p>
        <p>Вівторок: знижка 39% на кожну другу піцу*</p>
        <p>Середа: знижка 15% на всю піцу при самовивозі</p>
        <p>Четвер: знижка 15% на всі набори при самовивозі</p>
        <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faPizzaSlice} />
      </button>
      </div>
    </div>
  );
};

export default DiscountWindow;
