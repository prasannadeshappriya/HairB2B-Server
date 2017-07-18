'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('user_roles', {
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
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "roles",
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
    return queryInterface.dropTable('user_roles');
  }
};