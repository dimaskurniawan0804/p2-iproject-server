'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDestination extends Model {
    static associate(models) {
      CustomerDestination.belongsTo(models.Customer, { foreignKey: "customerId" })
      CustomerDestination.belongsTo(models.Destination, { foreignKey: "destinationId" })
    }
  }

  CustomerDestination.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Customers",
        key: "id"
      }
    },
    destinationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Destinations",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'CustomerDestination',
  });
  return CustomerDestination;
};