const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {};
  Product.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(12, 4)
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
      sequelize,
      modelName: 'Product',
      timestamps: false
  });
  return Product;
}