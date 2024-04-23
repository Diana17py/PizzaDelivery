const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING
    },
    delivery_type: {
      allowNull: true,
      type: DataTypes.STRING
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING
    }
  },
  {
      sequelize,
      modelName: 'User',
      timestamps: false,
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password.toString(), salt);
        }
      },
  });
  return User;
}