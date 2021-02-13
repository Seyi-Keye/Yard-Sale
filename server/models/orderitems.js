'use strict';
module.exports = function(sequelize, DataTypes) {
  var orderItems = sequelize.define('orderItems', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    yardsaleId: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        orderItems.belongsTo(models.YardSale, {
          foreignkey: 'yardsaleId',
          onDelete: 'CASCADE'
        });
        orderItems.belongsTo(models.user, {
          foreignkey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return orderItems;
};
