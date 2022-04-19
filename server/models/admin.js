'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      Admin.hasMany(models.Destination, { foreignKey: "adminId" })
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      }


    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email is required" },
        notNull: { msg: "Email is required" },
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};