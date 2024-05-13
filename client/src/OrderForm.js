import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Cart.css';
import liqpayClient from './payments/liqpayClient';
  
const OrderForm = ({ cartItems, clearCart }) => {
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('-1');
  const [deliveryOption, setDeliveryOption] = useState('self-pickup');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [date, setDate] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [doorCode, setDoorCode] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const [comment, setComment] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/users/couriers', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCouriers(await response.json());
      } catch (error) {
        console.error('Помилка отримання списку кур\'єрів:', error.message);
      }
    };
    fetchCouriers();
  }, []);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/users/user_addresses',{
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUserAddresses(await response.json());
      } catch (error) {
        console.error('Помилка отримання списку адрес користувачів:', error.message);
      }
    };
    fetchUserAddresses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      cartId: sessionStorage.getItem('cartId'),
      totalPrice: totalAmount,
      userAddressId: selectedAddress,
      courierId: selectedCourier, 
      deliveryDate: date,
      comment: comment,
      deliveryType: deliveryOption
    };

    if (deliveryOption === 'delivery') {
      orderData.address = `${city}, ${street}, ${house}, ${apartment}; entrance: ${entrance}, doorCode: ${doorCode}`
    }

    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/checkout', {
        method: "POST",
        body: JSON.stringify(orderData),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.json();
        if (paymentOption === 'card') {
          try {
            const description = cartItems.map((item) => (
              `${item.name} - ${item.quantity} шт. - ${item.price * item.quantity} грн; ` 
            ));
            const paymentParams = {
              version: '3',
              action: 'pay',
              amount: totalAmount,
              currency: 'UAH',
              description: description.join(' '),
              order_id: data.orderId
            };
            const paymentResponse = await liqpayClient.api('request', paymentParams);
            console.log(paymentResponse); 
          } catch (error) {
            console.error('Помилка під час ініціювання платежу:', error.message);
          }
        } 
        clearCart(); 
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
            <div className="cart-summary">
              <h4>Ваше замовлення:</h4>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <span>{item.name} - {item.quantity} шт. - {item.price * item.quantity} UAN</span>
                  </li>
                ))}
              </ul>
              <p>Загальна сума: {totalAmount.toFixed(2)} UAN</p>
            </div>

            <hr className="form-divider" />

            {/* Форма оформлення замовлення */}
            <form onSubmit={handleSubmit}>
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
                    Адреса:
                    <select
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      <option value="-1">Додати нову адресу</option>
                      {userAddresses.map(userAddress => (
                        <option key={userAddress.id} value={userAddress.id}>
                          {userAddress.address}
                        </option>
                      ))}
                    </select>
                  </label>
                  { selectedAddress === '-1' && (
                  <>
                  <label>
                    Нова Адреса:
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Місто"
                          required
                        />
                        <input
                          type="text"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Вулиця"
                          required
                        />
                        <input
                          type="text"
                          value={house}
                          onChange={(e) => setHouse(e.target.value)}
                          placeholder="Будинок"
                          required
                        />
                        <input
                          type="text"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          placeholder="Квартира"
                          required
                        />
                        <input
                          type="text"
                          value={entrance}
                          onChange={(e) => setEntrance(e.target.value)}
                          placeholder="Під'їзд"
                          required
                        />
                        <input
                          type="text"
                          value={doorCode}
                          onChange={(e) => setDoorCode(e.target.value)}
                          placeholder="Код домофону або кодового замка"
                        />
                  </label></>
                  )}
                  <label>
                    Кур'єр:
                    <select
                      value={selectedCourier}
                      onChange={(e) => setSelectedCourier(e.target.value)}
                    >
                      <option value="">Оберіть кур'єра</option>
                      {couriers.map(courier => (
                        <option key={courier.id} value={courier.id}>
                          {courier.full_name}
                        </option>
                      ))}
                    </select>
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

              <hr className="form-divider" />
              <button type="submit" className="order-button">
                Оформити{paymentOption === "card" && (" і оплатити")} замовлення
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
