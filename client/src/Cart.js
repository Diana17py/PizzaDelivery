import React, { useState } from "react";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";
import { useCartStore } from "./store/cart.store"; 

const Cart = () => {
  const { totalPrice, cartItems, clearCart } = useCartStore();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const openOrderForm = () => {
    setIsOrderFormOpen(true);
  };

  const closeOrderForm = () => {
    setIsOrderFormOpen(false);
  };

  const handleOrderConfirmed = () => {
    alert("Замовлення успішно підтверджено!");
    closeOrderForm();
  };

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cart</h2>
      <ul className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id} 
              {...item}
              // onAdd={() => addToCart(item)}
              // onRemove={() => removeFromCart(item)}
            />
          ))
        ) : (
          <span className="empty-cart-message">Your cart is empty</span>
        )}
      </ul>
      <div className="cart-summary">
        <p className="cart-total">Total price: ${totalPrice.toFixed(2)}</p>
        {cartItems.length > 0 && (
          <button className="clear-cart-button" onClick={() => clearCart()}>
            Clear the cart
          </button>
        )}
        <button className="order-button" onClick={openOrderForm}>
        Order now
        </button>
      </div>
      {isOrderFormOpen && (
        <div className="order-form-overlay">
          <OrderForm onClose={closeOrderForm} onOrderConfirmed={handleOrderConfirmed} />
        </div>
      )}
    </div>
  );
};

export default Cart;
