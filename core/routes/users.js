const express = require("express");
const { sequelize } = require('../models/index');
const router = express.Router();
const { User, Order, UserAddress, Cart, CartItem, Product, Invoice } = require('../models'); 
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const upload = require('../middlewares/upload');
const fs = require('fs');


const createToken = (id) => {
  const userId = parseInt(id);
  return jwt.sign({ userId }, "diana kravets super secret key", {
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
        last_name: user.last_name,
        phone_number: user.phone_number,
        avatar: user.avatar
      } });
  } catch (err) {
    res.json({ errors: err.message });
  }
});

router.post('/registration', async (req, res) => {
  try {
    const { email, password, first_name, last_name, phone_number } = req.body;
    const userCount = await User.count({where: {email: email}});
    if (userCount > 0){
      res.status(500).json({ errors: {email:"User is already exists",password: false}, created: false });
    }else{
      const user = await User.create({ email, password, first_name, last_name, phone_number });
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
            attributes: ['name', 'image']
          }
        }
      },
      {
        model: Invoice,
        as: 'invoice',
        attributes: ['status', 'created_at'],
        required: false
      },
      {
        model: User,
        as: 'courier',
        attributes: ['first_name', 'last_name', 'phone_number'],
        required: false
      }]
    })
    res.json({orders: orders});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

router.get('/orders/:id', auth.checkJWT, async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderDetails = await Order.findByPk(orderId, {
      include: [
        {
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
            include: {
              model: Product,
              as: 'product',
              attributes: ['name', 'image']
            }
          }
        },
        {
          model: Invoice,
          as: 'invoice',
          attributes: ['status', 'created_at'],
          required: false
        },
        {
          model: User,
          as: 'courier',
          attributes: ['first_name', 'last_name', 'phone_number'],
          required: false
        }
      ]
    });

    if (!orderDetails) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order: orderDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching order details' });
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
    const profile = await User.findByPk(req.decodedUserId, {attributes: ["id", "email", "first_name", "last_name", "phone_number", "role", "avatar"]});
    const img = fs.readFileSync(profile.avatar);
    profile.avatar = `data:image/png;base64,${Buffer.from(img).toString("base64")}`;
    res.json({profile: profile});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

router.get('/dashboard', auth.checkJWT, async (req, res) => {
  try {
    const newOrdersCount = await Order.count({where: {status: "new"} });
    const allOrdersCount = await Order.count({});
    const total = await Order.sum('total_price');
    res.json({dashboard: {
      new_orders_count: newOrdersCount,
      all_orders_count: allOrdersCount,
      total: total
    }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

router.put('/settings', [auth.checkJWT, upload.single('avatar')], async (req, res) => {
  try {
    const { first_name, last_name, role, phone_number } = req.body;
    let settings = { 
      first_name: first_name,
      last_name: last_name,
      role: role,
      phone_number: phone_number
    }
    if (req.file?.path){
      settings.avatar = req.file.path
    }
    User.update(settings, {where: {id: req.decodedUserId}})
    res.json({success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});

router.post('/checkout', auth.checkJWT, async (req, res) => {
  try {
    const { cartId, totalPrice, userAddressId, address, courierId, deliveryDate, comment, deliveryType } = req.body;

    try {
      const result = await sequelize.transaction(async (t) => {
        let realUserAddress;

        if (userAddressId !== "-1") {
          realUserAddress = await UserAddress.findByPk(userAddressId);
        } else if (address) {
          realUserAddress = await UserAddress.create({
            user_id: req.decodedUserId,
            address: address
          }, { transaction: t });
        }

        const userInvoice = await Invoice.create({
          user_id: req.decodedUserId,
          status: 'new',
          created_at: new Date().toISOString(), 
        }, { transaction: t });

        const newOrder = await Order.create({
          cart_id: cartId,
          user_id: req.decodedUserId,
          total_price: totalPrice,
          user_address_id: realUserAddress ? realUserAddress.id : null,
          invoice_id: userInvoice.id,
          courier_id: courierId,
          created_at: new Date().toISOString(), 
          comment: `${comment}, deliverydate: ${deliveryDate}`,
          status: 'new',
          delivery_type: deliveryType,
        }, { transaction: t });

        return { newOrder, userInvoice };
      });

      return res.status(201).json({ orderId: result.newOrder.id, invoiceId: result.userInvoice.id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Помилка обробки транзакції' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Помилка отримання даних з бази даних' });
  }
});

router.get('/couriers', auth.checkJWT, async (req, res) => {
  try {
    const couriers = await User.findAll({attributes: ['id', [
      sequelize.fn('CONCAT',
        sequelize.col('first_name'), ' ', 
        sequelize.col('last_name'), 
      ),
      'full_name'
    ]],where: { role: 'courier' } });
    res.json(couriers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання користувачів' });
  }
});

router.get('/user_addresses', auth.checkJWT, async (req, res) => {
  try {
    const userAddresses = await UserAddress.findAll({attributes: ['id', 'address']});
    res.json(userAddresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка отримання адрес користувачів з бази даних' });
  }
});

module.exports = router