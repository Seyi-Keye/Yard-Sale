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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'email',
          as: 'email',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      userEmail: {
        type: Sequelize.INTEGER
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
