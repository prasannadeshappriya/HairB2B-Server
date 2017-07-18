'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "stylists",
            key: "user_id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      date: {
        type: Sequelize.DATE
      },
      location_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "locations",
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    return queryInterface.dropTable('user_locations');
  }
};