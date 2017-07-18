'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
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
            profilepic: {
                type: Sequelize.STRING
            },
            profilebannerpic: {
                type: Sequelize.STRING
            },
            verify: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};