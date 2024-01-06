// order-details.js
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
    return <p className="loading-message">Loading...</p>;
  }

  if (!orderDetails) {
    return <p className="not-found-message">Order details not found.</p>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p>Order ID: {orderDetails.id}</p>
      <p>Total Price: {orderDetails.total_price}</p>
      <p>Order Status: <span className="order-status">{orderDetails.status}</span></p>
      <p>Invoice Status: <span className="invoice-status">{(orderDetails.invoice && orderDetails.invoice.status) || "-"}</span></p>

      <div>
        <h3>User Information</h3>
        <p>First Name: {orderDetails.user.first_name}</p>
        <p>Last Name: {orderDetails.user.last_name}</p>
        <p>Phone Number: {orderDetails.user.phone_number}</p>
      </div>

      <div>
        <h3>User Address</h3>
        <p>Address: {(orderDetails.user_address && orderDetails.user_address.address) || "Not provided"}</p>
      </div>

      <div>
        <h3>Cart Items</h3>
        {orderDetails.cart && orderDetails.cart.cart_items.map((item, index) => (
          <div key={index}>
            <p>Product Name: {item.product.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price per Item: {item.price_per_item}</p>
          </div>
        ))}
      </div>

      <div>
        <h3>Invoice Information</h3>
        {orderDetails.invoice ? (
          <>
            <p>Status: {orderDetails.invoice.status}</p>
            <p>Created At: {orderDetails.invoice.created_at}</p>
          </>
        ) : (
          <p>No invoice available.</p>
        )}
      </div>

      <div>
        <h3>Courier Information</h3>
        {orderDetails.courier ? (
          <>
            <p>Courier First Name: {orderDetails.courier.first_name}</p>
            <p>Courier Last Name: {orderDetails.courier.last_name}</p>
            <p>Courier Phone Number: {orderDetails.courier.phone_number}</p>
          </>
        ) : (
          <p>No assigned courier.</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
