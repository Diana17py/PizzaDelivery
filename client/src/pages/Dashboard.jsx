import React from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ profile }) {
  const { id: userId, first_name, last_name, email } = profile;

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      <div className="user-info">
        <h2>User Information</h2>
        <p>
          <strong>User ID:</strong> {userId}
        </p>
        <p>
          <strong>Name:</strong> {first_name} {last_name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>

      <div className="order-history">
        <h2>Order History</h2>
      </div>

      <Link to="/">Back to Home</Link>
    </div>
  );
}
