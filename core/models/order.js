const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({User, UserAddress, Cart}){
      this.belongsTo(User,{foreignKey: 'user_id', as: 'user'})
      this.belongsTo(UserAddress,{foreignKey: 'user_address_id', as: 'user_address'})
      this.belongsTo(Cart,{foreignKey: 'cart_id', as: 'cart'})
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
    user_address_id: {
      allowNull: true,
      type: DataTypes.INTEGER
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