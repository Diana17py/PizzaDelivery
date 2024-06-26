const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate({CartItem}){
      this.hasMany(CartItem,{foreignKey: 'cart_id', as: 'cart_items'})
    }
  };
  Cart.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
      sequelize,
      modelName: 'Cart',
      timestamps: false
  });
  return Cart;
}