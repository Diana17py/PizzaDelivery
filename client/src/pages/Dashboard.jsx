import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import OrderHistory from '../OrderHistory';
import UserDashboard from '../layouts/UserDashboardLayout';
import '../layouts/UserDashboard.css';

export default function Dashboard({ profile }) {
  const { id: userId, first_name } = profile;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchOrdersSomehow(userId);
        console.log('Response:', response);
        setOrders(response.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <UserDashboard>
        <h1>Hello, {first_name}!</h1>
        {loading ? <p>Loading...</p> : <OrderHistory order={orders} />}
      </UserDashboard>
    </div>
  );
}

// Function to fetch orders for the user
async function fetchOrdersSomehow(userId) {
  try {
    const response = await fetch(`http://127.0.0.1:3001/api/users/orders?userId=${userId}`, {
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders. Please try again.');
  }
}
