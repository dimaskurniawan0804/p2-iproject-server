'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gallery extends Model {
    static associate(models) {
      Gallery.belongsTo(models.Customer, { foreignKey: "customerId" })
    }
  }
  Gallery.init({
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Image is required" },
        notNull: { msg: "Image is required" }
      }
    },
    captions: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Captions is required" },
        notNull: { msg: "Captions is required" }
      }
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: "Location is required" },
        notNull: { msg: "Location is required" }
      }
    },
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Gallery',
  });
  return Gallery;
};