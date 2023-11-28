const express = require("express");
const router = express.Router();
const { User, Order, UserAddress, Cart, CartItem, Product } = require('../models'); 
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const createToken = (id) => {
  return jwt.sign({ id }, "diana kravets super secret key", {
    expiresIn: "5m",
  });
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('incorrect Email');
    }

    const isPasswordCorrect = await bcrypt.compare(password.toString(), user.password.toString());
    if (!isPasswordCorrect) {
      throw Error('incorrect Password');
    }

    const token = createToken(user.id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 300*1000,
    });
      res.status(200).json({ user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      } });
  } catch (err) {
    res.json({ errors: err.message });
  }
});

router.post('/registration', async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;
    const userCount = await User.count({where: {email: email}});
    if (userCount > 0){
      res.status(500).json({ errors: {email:"User is already exists",password: false}, created: false });
    }else{
      const user = await User.create({ email, password, first_name, last_name });
      res.status(201).json({ user: user.id, created: true });
    }
    
  } catch (err) {
    res.json({ errors: err.message });
  }
});

router.get('/orders',auth.checkJWT, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {user_id: req.decodedUserId},
      include: [{
        model: User,
        as: 'user',
        attributes: ['first_name', 'last_name', 'phone_number']
      },
      {
        model: UserAddress,
        as: 'user_address',
        attributes: ['address'],
        required: false
      },
      {
        model: Cart,
        as: 'cart',
        include: {
          model: CartItem,
          as: 'cart_items',
          attributes: ['product_id', 'quantity', 'price_per_item'],
          include:{
            model: Product,
            as: 'product',
            attributes: ['name']
          }
        }
      }]
    })
    res.json({orders: orders});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

router.delete('/logout',auth.checkJWT, async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({});
  } catch (err) {
    res.json({ errors: err.message });
  }
});

router.get('/profile', auth.checkJWT, async (req, res) => {
  try {
    const profile = await User.findByPk(req.decodedUserId, {attributes: ["id", "email", "first_name", "last_name"]});
    res.json({profile: profile});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

module.exports = router