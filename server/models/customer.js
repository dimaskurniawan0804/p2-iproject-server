'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.Destination, {
        through: models.CustomerDestination,
        foreignKey: "customerId"
      })
      Customer.hasMany(models.Gallery, { foreignKey: "customerId" })
    }
  }
  Customer.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "First name is required" },
        notNull: { msg: "First name is required" }
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Last name is required" },
        notNull: { msg: "Last name is required" }
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Password is required" },
        notNull: { msg: "Password is required" }
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Phone number is required" },
        notNull: { msg: "Phone number is required" }
      }
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Address is required" },
        notNull: { msg: "Address is required" }
      }
    }
  }, {
    hooks: {
      beforeCreate: (customer, option) => {
        customer.password = hashPassword(customer.password)
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};