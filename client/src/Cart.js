import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import { Link } from 'react-router-dom';
import { CartContext } from "./providers/Cart";



const Cart = () => {
    const {clearCart, cart, updateCartItem } = useContext(CartContext);
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

    if (!cart){
      return (<span>loading...</span>)
    }

    return (
        <div className="cart">
            <h2 className="cart-title">Ваша корзина</h2>
            <ul className="cart-items">
              
                {cart.cart_items.length > 0 ? (
                    cart.cart_items.map((item) => (
                        <CartItem
                            key={item.product_id}
                            {...item}
                            updateCartItem={updateCartItem}
                        />
                    ))
                ) : (
                    <span className="empty-cart-message">Ваша корзина порожня</span>
                )}
            </ul>
            <div className="cart-summary">
                <p className="cart-total">Загальна вартість: ${cart.total_price.toFixed(2)}</p>
                <Link to="/order" className="order-link">Оформити замовлення</Link>
            </div>
            {isOrderFormOpen && (
                <div className="order-form-overlay">
                    <OrderForm
                        onClose={closeOrderForm}
                        onOrderConfirmed={handleOrderConfirmed}
                        cartItems={cart.cart_items}
                        clearCart={clearCart}
                        cartId={cart.id}
                    />
                </div>
            )}
        </div>
    );
};

export default Cart;
