import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  // Correct usage of useParams to extract id
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('orderId:', orderId);
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
    return <p>Loading...</p>;
  }

  if (!orderDetails) {
    return <p>Order details not found.</p>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p>Order ID: {orderDetails.id}</p>
      <p>Total Price: {orderDetails.total_price}</p>
      <p>Order Status: {orderDetails.status}</p>
      <p>Invoice Status: {(orderDetails.invoice && orderDetails.invoice.status) || "-"}</p>
    </div>
  );
};

export default OrderDetails;
