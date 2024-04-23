import React from 'react';
import { useCartStore } from './store/cart.store'; // Використовуйте хук для доступу до стану кошика
import OrderForm from './OrderForm';

const OrderPage = () => {
    // Отримання стану кошика за допомогою useCartStore
    const { cartItems, clearCart } = useCartStore();

    // Викликайте OrderForm, передаючи дані про кошик і функцію для очищення кошика
    return (
        <div className="order-page">
            <OrderForm cartItems={cartItems} clearCart={clearCart} />
        </div>
    );
};

export default OrderPage;
