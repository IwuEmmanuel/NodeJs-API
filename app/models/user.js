'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    pseudo: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address',
      },
      unique: {
        args: true,
        msg: 'Email already exists',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address',
        },
      },
    },
    rank: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    code: DataTypes.STRING,
    coins: DataTypes.INTEGER,
    parraine:{
      field: 'parrainé',
      type: DataTypes.STRING,
    }, 
    info: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};