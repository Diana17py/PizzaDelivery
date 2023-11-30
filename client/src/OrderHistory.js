import React, { useState, useEffect} from 'react';
import './OrderHistory.css';

const OrderHistory = ({profile}) => {
  const { id: userId} = profile;
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
    return <p className="no-orders">No orders available.</p>;
  }

  return (
    loading ? <p>Loading...</p> :(
    <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
      <table className="order-list">
        <tr>
          <th>Order Id</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
        {orders.map((order) => (
          <tr className="order-item">
            <td>{order.id}</td>
            <td>{order.cart.cart_items.map((item) => (<p><img height='30' src={item.product.image} alt={item.product.name}/> {item.product.name}</p>))}</td>
            <td>{order.total_price}</td>
            <td>
              <ul>
                <li>Order Status: <strong>{order.status}</strong></li>
                <li>Invoice Status: <strong>{(order.invoice && order.invoice.status) || "-"}</strong></li>
              </ul>
            </td>
            <td>{order.created_at}</td>
          </tr>
        ))}
      </table>
    </div>
        ));
};

export default OrderHistory;