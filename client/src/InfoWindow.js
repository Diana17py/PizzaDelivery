import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import './InfoWindow.css'; 

const InfoWindow = ({ isOpen, onClose }) => {
  return (
    <div className={`info-window ${isOpen ? 'open' : ''}`}>
      <div className="info-content">
        <h2 className="info-title">Доставка та оплата</h2>
        <p>
        Ми раді запропонувати нашу послугу доставки піци! Ось деталі доставки:
        </p>
        <div className="info-section">
          <h3 className="info-subtitle">Умови доставки:</h3>
          <p>
            - Доставка доступна в усі райони Тернопільської області<br />
            - Мінімальна сума замовлення для доставки становить 100 UAN.<br />
            - Вартість доставки становить 150 UAN за замовлення.<br />
            - Час доставки може відрізнятися залежно від вашого місцезнаходження, але ми намагаємося доставити протягом 30-45 хвилин.
          </p>
        </div>
        <div className="info-section">
          <h3 className="info-subtitle">Варіанти оплати:</h3>
          <p>
            - Накладений платіж: оплачуйте готівкою, коли ваше замовлення прийде.<br />
            - Кредитна картка: Ви також можете оплатити кредитною карткою онлайн під час розміщення замовлення.
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
