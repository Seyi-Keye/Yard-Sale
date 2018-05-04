'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('YardSales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      startdate: {
        type: Sequelize.DATE
      },
      saleDate: {
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      imgURL: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('YardSales');
  }
};
