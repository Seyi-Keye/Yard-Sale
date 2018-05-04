'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key: 'id',
          as: 'cartId',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      product: {
        type: Sequelize.STRING
      },
      requestedQuantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.INTEGER
      },
      unassignedQuantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('CartItems');
  }
};