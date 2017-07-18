'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('stylists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            type: 'FOREIGN KEY',
            model: "users",
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      description: {
        type: Sequelize.STRING
      },
      rates: {
        type: Sequelize.DOUBLE
      },
      order_completion: {
        type: Sequelize.DOUBLE
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
    return queryInterface.dropTable('stylists');
  }
};