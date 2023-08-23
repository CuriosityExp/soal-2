'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helpers/bcrypt');
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
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required"
        },
        notEmpty: {
          msg: "Name is required"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
        len:{
          args: [5,8],
          msg: "Password minimal 5 karakter dan maksimal 8 karakter"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user,options) =>{
        user.password = hashPass(user.password)
      },
      beforeUpdate: (user,options) => {
        if (user.changed('password')) {
          user.password = hashPass(user.password)
        }
      }
    }
  });
  return User;
};