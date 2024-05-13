import React from 'react';
import { useCartStore } from './store/cart.store'; 
import OrderForm from './OrderForm';

const OrderPage = () => {
    const { cartItems, clearCart, first_name, last_name, phone_number } = useCartStore();

    // Викликайте OrderForm, передаючи дані про кошик і функцію для очищення кошика
    return (
        <div className="order-page">
            <OrderForm cartItems={cartItems} clearCart={clearCart} first_name={first_name} last_name={last_name} phone_number={phone_number}  />
        </div>
    );
};

export default OrderPage;
