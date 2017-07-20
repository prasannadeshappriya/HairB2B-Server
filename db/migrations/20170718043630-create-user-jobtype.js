'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_jobtypes', {
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
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "job_types",
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      price: {
        allowNull: false,
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
    return queryInterface.dropTable('user_jobtypes');
  }
};