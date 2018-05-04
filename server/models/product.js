'use strict';
module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define('product', {
    name: DataTypes.STRING,
    condition: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING,
    maxslot: DataTypes.INTEGER,
    leftOver: DataTypes.INTEGER,
    yardsaleId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        product.belongsTo(models.YardSale, {
          foreignkey: 'yardsaleId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return product;
};
