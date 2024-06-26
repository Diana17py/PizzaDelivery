const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({User, UserAddress, Cart, Invoice}){
      this.belongsTo(User,{foreignKey: 'user_id', as: 'user'})
      this.belongsTo(UserAddress,{foreignKey: 'user_address_id', as: 'user_address'})
      this.belongsTo(Cart,{foreignKey: 'cart_id', as: 'cart'})
      this.belongsTo(Invoice,{foreignKey: 'invoice_id', as: 'invoice'})
      this.belongsTo(User,{foreignKey: 'courier_id', as: 'courier'})
    }
  };
  Order.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    total_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(12, 4)
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    user_address_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    courier_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    invoice_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    comment:{
      allowNull: true,
      type: DataTypes.STRING
    },
    delivery_type: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
      sequelize,
      modelName: 'Order',
      timestamps: false
  });
  
  Order.createNewOrder = async ({ cartId, userId, totalPrice, status }) => {
    try {
      const order = await Order.create({
        cart_id: cartId,
        user_id: userId,
        total_price: totalPrice,
        status,
      });
      return order;
    } catch (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  };

  return Order;
};