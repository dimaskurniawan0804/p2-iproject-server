'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerDestination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerDestination.belongsTo(models.Customer, { foreignKey: "customerId" })
      CustomerDestination.belongsTo(models.Destination, { foreignKey: "destinationId" })
    }
  }
  CustomerDestination.init({
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