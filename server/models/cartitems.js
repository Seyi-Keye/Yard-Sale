'use strict';
module.exports = function(sequelize, DataTypes) {
  var cartItems = sequelize.define('cartItems', {
    cartId: DataTypes.INTEGER,
    product: DataTypes.STRING,
    requestedQuantity: DataTypes.INTEGER,
    price: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    unassignedQuantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        cartItems.belongsTo(models.Cart, {
          foriegnKey: 'cartId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return cartItems;
};
