import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails';
import './Pizza.css';
import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';
import axios from 'axios';

const Pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/pizzas')
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error('Помилка отримання піц:', error);
      });
  }, []);

  const onPizzaClick = (pizza) => {
    setSelectedPizza(pizza);
  };

  return (
    <div>
      <h2>Pizza</h2>
      <div className="pizza-container">
        {pizzas.map((pizza) => (
          <CategoryItem
            key={pizza.id}
            pizza={pizza}
            onPizzaClick={() => onPizzaClick(pizza)}
            ingredients={pizza.description}
          />
        ))}
      </div>
      {selectedPizza && (
        <PizzaDetails
          isOpen={true}
          pizza={selectedPizza}
          onClose={() => setSelectedPizza(null)}
          onPizzaClick={onPizzaClick}
        />
      )}
      <section className="place-pizza-logo">
        <Link to="/" className="place-pizza-logo-link">
          <h2 className="place-pizza-logo-text">PIZZA PLACE</h2>
        </Link>
      </section>
    </div>
  );
};

export default Pizza;
