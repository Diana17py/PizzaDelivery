const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {};
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
    }
  },
  {
      sequelize,
      modelName: 'Order',
      timestamps: false
  });
  return Order;
}