'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      default: "user"
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user.hasMany(models.orderItems, {
          foreignKey: 'userId',
          as: 'orderedItems',
        });
      }
    }
  });
  return user;
};
