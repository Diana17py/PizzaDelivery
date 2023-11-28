const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate({Product}){
      this.belongsTo(Product,{foreignKey: 'product_id', as: 'product'})
    }
  };
  CartItem.init({
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
    product_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    price_per_item: {
      allowNull: false,
      type: DataTypes.DECIMAL(12,4)
    }

  },
  {
      sequelize,
      modelName: 'CartItem',
      tableName: 'cart_items',
      timestamps: false
  });
  return CartItem;
}