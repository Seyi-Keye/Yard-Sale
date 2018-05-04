'use strict';
module.exports = function(sequelize, DataTypes) {
  var cart = sequelize.define('Cart', {
    userId: DataTypes.INTEGER,
    yardSaleId: DataTypes.INTEGER,
    expirationDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  cart.associate = (models)  => {
    // associations can be defined here
    cart.hasMany(models.CartItems, {
      foreignKey: 'cartId',
      as: 'cartItems',
    });
    cart.belongsTo(models.User, {
      foriegnKey: 'userId',
      onDelete: 'CASCADE',
    });

  };
  return cart;
};
