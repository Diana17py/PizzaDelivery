import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './order-details.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/users/orders/${orderId}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setOrderDetails(data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p className="loading-message">Завантаження...</p>;
  }

  if (!orderDetails) {
    return <p className="not-found-message">Деталі замовлення не знайдено.</p>;
  }

  return (
    <div className="order-details-container">
      <h2>Деталі замовлення:</h2>
      <p>ID замовлення: {orderDetails.id}</p>
      <p>Загальна сума: {orderDetails.total_price}</p>
      <p>Статус замовлення: <span className="order-status">{orderDetails.status}</span></p>
      <p>Статус рахунку: <span className="invoice-status">{(orderDetails.invoice && orderDetails.invoice.status) || "-"}</span></p>

      <div>
        <h3>Інформація про користувача</h3>
        <p>Ім'я: {orderDetails.user.first_name}</p>
        <p>Прізвище: {orderDetails.user.last_name}</p>
        <p>Номер телефону:{orderDetails.user.phone_number}</p>
      </div>

      <div>
        <h3>Адреса користувача</h3>
        <p>Адреса: {(orderDetails.user_address && orderDetails.user_address.address) || "Not provided"}</p>
      </div>

      <div>
        <h3>Пункти кошика</h3>
        {orderDetails.cart && orderDetails.cart.cart_items.map((item, index) => (
          <div key={index}>
            <p>Назва продукту: {item.product.name}</p>
            <p>Кількість: {item.quantity}</p>
            <p>Ціна за позицію: {item.price_per_item}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Інформація про рахунок-фактуру</h3>
        {orderDetails.invoice ? (
          <>
            <p>Статус: {orderDetails.invoice.status}</p>
            <p>Створено: {orderDetails.invoice.created_at}</p>
          </>
        ) : (
          <p>Немає рахунку-фактури.</p>
        )}
      </div>

      <div>
        <h3>Кур'єрська інформація</h3>
        {orderDetails.courier ? (
          <>
            <p>Ім'я кур'єра: {orderDetails.courier.first_name}</p>
            <p>Прізвище кур'єра: {orderDetails.courier.last_name}</p>
            <p>Телефон кур'єра: {orderDetails.courier.phone_number}</p>
          </>
        ) : (
          <p>Немає призначеного кур'єра.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
