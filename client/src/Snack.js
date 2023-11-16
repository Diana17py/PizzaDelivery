import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails'; 
import './Pizza.css'; 
import { Link } from 'react-router-dom';
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
      <h2>Snacks</h2>
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
            <p>Price: {snake.price} USD</p>
            <button onClick={() => openSnakeDetails(snake)}>Add to cart</button>
          </div>
        ))}
      </div>
      {!!selectedSnake && (
        <PizzaDetails
          pizza={selectedSnake}
          onClose={closeSnakeDetails}
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

export default Snacks;
