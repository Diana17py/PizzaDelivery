const express = require("express");
const router = express.Router();
const { Cart, CartItem, Product } = require('../models');

router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Product.findAll({ where: { type: "pizza" } });
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.get('/pizzasets', async (req, res) => {
  try {
    const pizzasets = await Product.findAll({ where: { type: "pizzaset" } });
    res.json(pizzasets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.get('/drinks', async (req, res) => {
  try {
    const drinks = await Product.findAll({ where: { type: "drink" } });
    res.json(drinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.get('/snacks', async (req, res) => {
  try {
    const snacks = await Product.findAll({ where: { type: "snack" } });
    res.json(snacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});


router.get('/cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findByPk(cartId, { include: 'cart_items' });
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching cart information' });
  }
});

router.post('/cart', async (req, res) => {
  try {
    const newCart = await Cart.create();
    return res.status(201).json({id: newCart.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.post('/cart/:cartId/add', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findByPk(cartId, { include: 'cart_items' });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = cart.cart_items.find((item) => item.product_id === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        price_per_item: product.price,
      });
    }

    cart = await Cart.findByPk(cartId, { include: 'cart_items' });

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating cart' });
  }
});

router.put('/cart/:cartId/update', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    let cart = await Cart.findByPk(cartId, { include: 'cart_items' });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = cart.cart_items.find((item) => item.product_id === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    if (quantity === 0) {
      await cartItem.destroy();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    cart = await Cart.findByPk(cartId, { include: 'cart_items' });

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating cart' });
  }
});

module.exports = router;