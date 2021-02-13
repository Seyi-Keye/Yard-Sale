'use strict';
module.exports = function(sequelize, DataTypes) {
  var cartItems = sequelize.define('CartItems', {
    cartId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    userEmail: DataTypes.STRING,
    productId: DataTypes.INTEGER,
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
        cartItems.belongsTo(models.Product, {
          foriegnKey: 'productId',
          onDelete: 'CASCADE',
        });
        cartItems.belongsTo(models.user, {
          foriegnKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return cartItems;
};
