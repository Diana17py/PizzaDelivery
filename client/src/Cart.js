import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import { useCartStore } from "./store/cart.store"; 
import { Link } from 'react-router-dom';


const Cart = () => {
    // Отримуємо стан кошика за допомогою useCartStore
    const { totalPrice, cartItems, clearCart, cartId, first_name, last_name, phone_number } = useCartStore();
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

    // Функції для керування станом відкриття форми замовлення
    //const openOrderForm = () => setIsOrderFormOpen(true);
    const closeOrderForm = () => setIsOrderFormOpen(false);

    // Обробник підтвердження замовлення
    const handleOrderConfirmed = () => {
        alert("Замовлення успішно підтверджено!");
        closeOrderForm(); 
        clearCart(); 
    };

    return (
        <div className="cart">
            <h2 className="cart-title">Ваша корзина</h2>
            <ul className="cart-items">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            {...item}
                        />
                    ))
                ) : (
                    <span className="empty-cart-message">Ваша корзина порожня</span>
                )}
            </ul>
            <div className="cart-summary">
                <p className="cart-total">Загальна вартість: ${totalPrice.toFixed(2)}</p>
                {cartItems.length > 0 && (
                    <button className="clear-cart-button" onClick={clearCart}>
                        Очистити корзину
                    </button>
                )}
                <Link to="/order" className="order-link">Оформити замовлення</Link>
            </div>
            {isOrderFormOpen && (
                <div className="order-form-overlay">
                    <OrderForm
                        onClose={closeOrderForm}
                        onOrderConfirmed={handleOrderConfirmed}
                        cartItems={cartItems}
                        clearCart={clearCart}
                        cartId={cartId}
                        first_name={first_name}
                        last_name={last_name}
                        phone_number={phone_number}
                    />
                </div>
            )}
        </div>
    );
};

export default Cart;
