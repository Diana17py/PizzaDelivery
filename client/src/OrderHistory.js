import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = ({ profile }) => {
  const { id: userId } = profile;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3001/api/users/orders`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  console.log('Orders in OrderHistory:', orders);

  if (!orders || orders.length === 0) {
    return <p className="no-orders">Немає доступних замовлень.</p>;
  }

  return (
    loading ? <p>Завантаження...</p> : (
      <div className="order-history-container">
        <h2 className="order-history-title">Історія Замовлень</h2>
        <table className="order-list">
          <thead>
            <tr>
              <th>ID замовлення</th>
              <th>Товар</th>
              <th>Всього</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Переглянути</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="order-item">
                <td>{order.id}</td>
                <td>{order.cart.cart_items.map((item) => (
                  <p key={item.product.id}>
                    <img height='30' src={item.product.image} alt={item.product.name} />
                    {item.product.name}
                  </p>
                ))}</td>
                <td>{order.total_price}</td>
                <td>
                  <ul>
                    <li>Статус замовлення: <strong>{order.status}</strong></li>
                    <li>Статус рахунку: <strong>{(order.invoice && order.invoice.status) || "-"}</strong></li>
                  </ul>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                  <Link to={`/dashboard/orders/${order.id}`}>Переглянути</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default OrderHistory;
