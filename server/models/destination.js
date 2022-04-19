'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Destination.belongsToMany(models.Customer, {
        through: "CustomerDestinations",
        foreignKey: "destinationId"
      })
      Destination.belongsTo(models.Admin)
    }
  }
  Destination.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    location: DataTypes.STRING,
    adminId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};