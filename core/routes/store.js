const express = require("express");
const router = express.Router();
const { Product } = require('../models'); 

// Отримання списку піц з бази даних
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


/*
//Карта 
router.get('/cart/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.post('/cart', async (req, res) => {
  try {
    const newCart = new Cart({...req.body});
    const insertedCart = await newCart.save();
    return res.status(201).json(insertedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.put('/cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const { pizzaId, quantity } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(item => item.id === pizzaId);

    if (itemIndex !== -1) {
      if (quantity === 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    } else {
      if (quantity !== 0) {
        const pizza = await Pizza.findById(pizzaId);
        cart.items.push({ 
          id: pizzaId, 
          quantity: quantity, 
          name: pizza.name,
          image: pizza.image,
          price: pizza.price
        });
      }
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});
*/
module.exports = router