import React, { useState, useEffect } from 'react';
import PizzaDetails from './PizzaDetails';
import './Pizza.css';
import Menu from './Menu'; // Імпорт компонента Menu
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
       <Menu />
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
            <p>Ціна: {pizzaSet.price} UAN</p>
            
            <button onClick={() => addToCart(pizzaSet, 1, null)}>
            Додати в кошик
            </button>
          </div>
        ))}
        <div className="pizza-text">
          <p>
          До вас прийшли несподівані гості? Хочете оформити будинок
            зустрічі чи невелике свято на роботі? Просто хочете смачно перекусити? Ми
            маємо для вас чудове рішення - набори для піци. Ви можете замовити
            доставка набору за Вашою адресою або самовивіз замовлення за адресою
            точки доставки.
          </p>
          <p className="additional-text">
            Піца на замовлення – швидко, смачно та вигідно!
          </p>
          <p>
          Ми дбаємо про наших клієнтів, тому представили набори для
            великих компаній і простою ситною вечерею. У нашій доставці, там
            завжди проходять акції на піцу, в рамках яких ви
            можна вгамувати голод і насолодитися стравою
            дешевше. Замовити набори можна на нашому сайті
          </p>
          <ul>
            <li>Pop;</li>
            <li>Meat;</li>
            <li>Vegetarian;</li>
            <li>XL;</li>
            <li>XXL.</li>
          </ul>
          <p>
          Окремої уваги заслуговує комплект XXL. Ви отримаєте 4.4
            кілограмів піци на будь-який смак, до яких 6 літрів напою
            ваш вибір додається. Такого набору вистачить, щоб нагодувати величезну компанію.
            Будьте впевнені, ваші гості будуть у захваті від такого частування.
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
    </div>
  );
};

export default PizzaSet;
