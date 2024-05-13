const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {};
  UserAddress.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
      sequelize,
      modelName: 'UserAddress',
      tableName: 'user_addresses',
      timestamps: false
  });
  return UserAddress;
}