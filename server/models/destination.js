'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    static associate(models) {
      Destination.belongsToMany(models.Customer, {
        through: models.CustomerDestination,
        foreignKey: "destinationid"
      })
    }
  }
  Destination.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};