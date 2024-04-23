import React, { useState } from 'react';
import axios from 'axios';
import './Cart.css';

const OrderForm = ({ cartItems, clearCart }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('self-pickup');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [doorCode, setDoorCode] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [comment, setComment] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      name,
      phoneNumber,
      deliveryOption,
      address: {
        city,
        date,
        house,
        apartment,
        entrance,
        doorCode,
      },
      paymentOption,
      comment,
      cartItems,
      totalAmount,
    };

    try {
      const response = await axios.post('/api/orders', orderData);

      if (response.status === 200) {
        setOrderConfirmed(true);
        clearCart(); // Очищення кошика після успішного оформлення замовлення
      } else {
        console.error('Помилка під час оформлення замовлення:', response.statusText);
      }
    } catch (error) {
      console.error('Помилка під час оформлення замовлення:', error.message);
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <h2>PIZZA PLACE</h2>
        <h3>Оформлення замовлення</h3>

        {orderConfirmed ? (
          <div className="thank-you-message">
            <h4>Дякуємо за ваше замовлення!</h4>
            <p>Ваше замовлення буде доставлено або готове для самовивозу в обраний час.</p>
          </div>
        ) : (
          <>
            {/* Вивід замовлень з кошика */}
            <div className="cart-summary">
              <h4>Ваше замовлення:</h4>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <span>{item.name} - {item.quantity} шт. - {item.price * item.quantity} грн</span>
                  </li>
                ))}
              </ul>
              <p>Загальна сума: {totalAmount.toFixed(2)} грн</p>
            </div>

            {/* Додати горизонтальну лінію між секціями */}
            <hr className="form-divider" />

            {/* Форма оформлення замовлення */}
            <form onSubmit={handleSubmit}>
              <label>
                Ім'я:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Номер телефону:
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </label>

              <label>
                Варіант доставки:
                <select
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                >
                  <option value="self-pickup">Самовивіз</option>
                  <option value="delivery">Доставка</option>
                </select>
              </label>

              {deliveryOption === 'delivery' && (
                <div className="delivery-info">
                  <label>
                    Місто:
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Дата:
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Будинок:
                    <input
                      type="text"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Квартира:
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Під'їзд:
                    <input
                      type="text"
                      value={entrance}
                      onChange={(e) => setEntrance(e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Код домофону або кодового замка:
                    <input
                      type="text"
                      value={doorCode}
                      onChange={(e) => setDoorCode(e.target.value)}
                    />
                  </label>
                </div>
              )}

              {deliveryOption === 'self-pickup' && (
                <div className="self-pickup-info">
                  <p>Самовивіз: смт.Гусятин Тернопільська 5</p>
                </div>
              )}

              <label>
                Варіанти оплати:
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                >
                  <option value="cash">Готівкою</option>
                  <option value="card">Картою</option>
                </select>
              </label>

              <label>
                Коментар:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>

              {/* Додати горизонтальну лінію перед кнопкою оформлення замовлення */}
              <hr className="form-divider" />

              {/* Кнопка для відправки форми або посилання на оплату */}
              {paymentOption === 'card' ? (
                <a
                  href="https://example.com/payment" // Посилання на сторінку оплати
                  target="_blank" // Відкриття у новій вкладці
                  className="order-button" rel="noreferrer" // Використовуємо клас для стилізації
                >
                  Оплатити карткою
                </a>
              ) : (
                <button type="submit" className="order-button">
                  Оформити замовлення
                </button>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
