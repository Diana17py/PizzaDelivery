import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails';
import './Pizza.css';
import CategoryItem from './CategoryItem';
import Menu from './Menu'; 
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
       <Menu />
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
    </div>
  );
};

export default Pizza;
