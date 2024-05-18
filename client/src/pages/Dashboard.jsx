import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../layouts/UserDashboard.css';

const Dashboard = () => {
  const [numberOfNewOrders, setNewOrderCount] = useState(0);
  const [numberOfAllOrders, setAllOrderCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/users/dashboard`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        const numberOfNewOrders = data.dashboard.new_orders_count;
        const numberOfAllOrders = data.dashboard.all_orders_count;
        const total = data.dashboard.total;

        setNewOrderCount(numberOfNewOrders);
        setAllOrderCount(numberOfAllOrders);
        setTotal(total);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Панель користувача</h1>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <>
          <div className="order-info-blocks">
            <div className="order-info-block">
              <div className="info-label">Кількість нових замовлень:</div>
              <div className="info-value">{numberOfNewOrders}</div>
            </div>
            <div className="order-info-block">
              <div className="info-label">Кількість замовлень:</div>
              <div className="info-value">{numberOfAllOrders}</div>
            </div>
            <div className="order-info-block">
              <div className="info-label">Всього:</div>
              <div className="info-value">{Number(total).toFixed(2)} UAN</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
