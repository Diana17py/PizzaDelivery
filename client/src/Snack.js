import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails'; 
import Menu from './Menu'; // Імпорт компонента Menu
import './Pizza.css'; 
import axios from 'axios';

const Snacks = () => {
  const [snacks, setSnacks] = useState([]);
  const [selectedSnake, setSelectedSnake] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/api/snacks')
      .then(response => {
        setSnacks(response.data);
      })
      .catch(error => {
        console.error('Помилка отримання закусок:', error); 
      });
  }, []);

  const openSnakeDetails = (snake) => {
    setSelectedSnake(snake);
  };

  const closeSnakeDetails = () => {
    setSelectedSnake(null);
  }

  return (
    <div>
      <Menu />
      <div className="snack-container"> 
        {snacks.map((snake) => (
          <div key={snake.id} className="snack-card"> 
            <div className="snack-image-container"> 
              <img
                src={snake.image}
                alt={snake.name}
                className="snack-image" 
                onClick={() => openSnakeDetails(snake)}
              />
            </div>
            <h3>{snake.name}</h3>
            <p>Ціна: {snake.price} UAN</p>
            <button onClick={() => openSnakeDetails(snake)}>Додати в корзину</button>
          </div>
        ))}
      </div>
      {!!selectedSnake && (
        <PizzaDetails
          pizza={selectedSnake}
          onClose={closeSnakeDetails}
        />
      )}
    </div>
  );
};

export default Snacks;
