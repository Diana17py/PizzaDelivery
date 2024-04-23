import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaDetails from './PizzaDetails'; 
import './Pizza.css';
import Menu from './Menu'; // Імпорт компонента Menu
const Drinks = () => {
  const [drinks, setDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/drinks')
      .then(response => {
        setDrinks(response.data);
      })
      .catch(error => {
        console.error('Помилка отримання напоїв:', error);
      });
  }, []);

  const openDrinkDetails = (drink) => {
    setSelectedDrink(drink);
  };

  const closeDrinkDetails = () => {
    setSelectedDrink(null);
  };

  return (
    <div>
       <Menu />
      <div className="drink-container">
        {drinks.map((drink) => (
          <div key={drink.id} className="drink-card">
            <div className="drink-image-container">
              <img
                src={drink.image}
                alt={drink.name}
                className="drink-image"
                onClick={() => openDrinkDetails(drink)}
              />
            </div>
            <h3>{drink.name}</h3>
            <p>{drink.description}</p>
            <p>Ціна: {drink.price} UAN</p>
            <button onClick={() => openDrinkDetails(drink)}>Додати в корзину</button>
          </div>
        ))}
      </div>
      {!!selectedDrink && (
        <PizzaDetails
        pizza={selectedDrink}
        onClose={closeDrinkDetails}
        />
      )}
    </div>
  );
};

export default Drinks;
