import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const CertificateWindow = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-window open">
      <div className="info-content">
        <h2>Сертифікат якості</h2>
        <p>Наша піца виготовляється з найкращих інгредієнтів, щоб забезпечити найкращий смак і якість.</p>
        <p>Кожна піца готується ретельно та досвідчено, щоб відповідати нашим високим стандартам.</p>
        <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faPizzaSlice} />
      </button>
      </div>
    </div>
  );
};

export default CertificateWindow;
