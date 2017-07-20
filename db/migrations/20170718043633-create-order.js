'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('orders', {
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
            model: "users",
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "payments",
            key: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      order_expire_date: {
        type: Sequelize.DATE
      },
      order_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      order_details: {

        type: Sequelize.STRING
      },
      order_amount: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      order_location_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_create_date: {

        type: Sequelize.DATE
      },
      order_tax: {

        type: Sequelize.DOUBLE
      },
      order_hairbnb: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            type: 'FOREIGN KEY',
            model: "user_jobtypes",
            key: "job_id"
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
    return queryInterface.dropTable('orders');
  }
};