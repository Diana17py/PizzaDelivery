import {useContext} from 'react';
import { CartContext } from '../providers/Cart';

export const CartButton = ({ pizza, totalPrice, quantity }) => {
  //const { addItemToCart } = useCartStore();
  const {addToCart} = useContext(CartContext)
  return (
    <button onClick={() => addToCart({ ...pizza, totalPrice, quantity })}>
      Додати в корзину
    </button>
  );
};

export default CartButton;