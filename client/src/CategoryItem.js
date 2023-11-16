import React, { useState } from 'react';
import PizzaDetails from './PizzaDetails';
import './Pizza.css'; 

const CategoryItem = ({ pizza, onPizzaClick, ingredients }) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const handleInfoClose = () => {
    setInfoOpen(false);
  };

  const handlePizzaClick = () => setInfoOpen(true)

  return (
    <div className="pizza-card">
      <div className="pizza-image-container">
        <img src={pizza.image} alt={pizza.name} className="pizza-image" onClick={() =>handlePizzaClick()} />
      </div>
      <h3>{pizza.name}</h3>
      <p>Price: {pizza.price}USD</p>
      <button onClick={() => {}}>Add to Cart</button>
      {infoOpen && (
        <PizzaDetails
        isOpen={true}
        pizza={pizza}
        onClose={() => handleInfoClose()}
        onPizzaClick={onPizzaClick}
      />
      )}
    </div>
  );
};

export default CategoryItem;