import React from 'react';

const MenuWindow = ({ isOpen, onClose, categories, onCategorySelect }) => {
  return (
    <div className={`menu-window ${isOpen ? 'open' : ''}`}>
      {categories.map((category) => (
        <div key={category} onClick={() => onCategorySelect(category)}>
          {category}
        </div>
      ))}
      <button className="close-button" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default MenuWindow;
