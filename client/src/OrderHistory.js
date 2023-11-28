import React from 'react';
import './OrderHistory.css'; // Create a CSS file for styling

const OrderHistory = ({ order }) => {
  console.log('Orders in OrderHistory:', order);

  if (!order || order.length === 0) {
    return <p className="no-orders">No orders available.</p>;
  }

  return (
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      <ul className="order-list">
        {order.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-details">
              <p className="order-id">Order #{order.id}</p>
              <p className="order-info">
                Cart ID: {order.cart_id}, User ID: {order.user_id}, Total Price: {order.total_price}, Status: {order.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
