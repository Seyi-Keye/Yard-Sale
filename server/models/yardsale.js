'use strict';
module.exports = function(sequelize, DataTypes) {
  var yardSale = sequelize.define('YardSales', {
    title: DataTypes.STRING,
    startdate: DataTypes.DATE,
    saleDate: DataTypes.DATE,
    note: DataTypes.STRING,
    location: DataTypes.STRING,
    rating: DataTypes.STRING,
    imgURL: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        yardSale.hasMany(models.Product, {
          foreignKey: 'yardSaleId',
          as: 'yardSaleProducts',
        });
        yardSale.hasMany(models.OrderItems, {
          foreignKey: 'yardSaleId',
          as: 'yardSaleCompletedOrders',
        });
      }
    }
  });
  return yardSale;
};
