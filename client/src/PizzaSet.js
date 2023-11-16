import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails';
import './Pizza.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PizzaSet = () => {
  const [pizzaSets, setPizzaSets] = useState([]);
  const [selectedPizzaSet, setSelectedPizzaSet] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3001/api/pizzasets')
      .then((response) => {
        setPizzaSets(response.data);
      })
      .catch((error) => {
        console.error('Помилка отримання наборів піци:', error);
      });
  }, []);

  const addToCart = (pizzaSet, quantity, additionalIngredients) => {
    const newItem = {
      pizza: pizzaSet,
      quantity,
      additionalIngredients,
    };
    setCartItems([...cartItems, newItem]);
    setSelectedPizzaSet(pizzaSet);
  };

  const openPizzaSetDetails = (pizzaSet) => {
    setSelectedPizzaSet(pizzaSet);
  };

  const closePizzaSetDetails = () => {
    setSelectedPizzaSet(null);
  };

  return (
    <div>
      <h2>Pizza Sets</h2>

      <div className="pizza-container">
        {pizzaSets.map((pizzaSet) => (
          <div key={pizzaSet.id} className="pizza-card">
            <div className="pizza-image-container">
              <img
                src={pizzaSet.image}
                alt={pizzaSet.name}
                className="pizza-image"
                onClick={() => openPizzaSetDetails(pizzaSet)}
              />
            </div>
            <h3>{pizzaSet.name}</h3>
            <p>Price: {pizzaSet.price} USD</p>
            
            <button onClick={() => addToCart(pizzaSet, 1, null)}>
              Add to Cart
            </button>
          </div>
        ))}
        <div className="pizza-text">
          <p>
            Did you have unexpected guests? Do you want to arrange home
            gatherings or a small holiday at work? Just want a tasty snack? We
            have a great solution for you - pizza kits. You can order the
            delivery of a set of dishes to your address or pick up the order at
            the delivery points.
          </p>
          <p className="additional-text">
            Pizza on demand – quick, delicious, and cost-effective!
          </p>
          <p>
            We care about our customers, which is why we introduced sets for
            large companies and a simple hearty dinner. In our delivery, there
            are always promotions on pizza, within the framework of which you
            can satisfy your hunger and enjoy a classic Italian dish much
            cheaper. You can order sets on our website:
          </p>
          <ul>
            <li>Pop;</li>
            <li>Meat;</li>
            <li>Vegetarian;</li>
            <li>XL;</li>
            <li>XXL.</li>
          </ul>
          <p>
            The XXL set deserves special attention. You will receive 4.4
            kilograms of pizza for any taste, to which 6 liters of the drink of
            your choice are added. Such a set is enough to feed a huge company.
            Be sure that your guests will be delighted with such a treat.
          </p>
        </div>
      </div>

      {selectedPizzaSet && (
        <PizzaDetails
          isOpen={true}
          pizza={selectedPizzaSet}
          onClose={closePizzaSetDetails}
          addToCart={addToCart}
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

export default PizzaSet;
