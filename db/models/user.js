'use strict';
module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        firstname: {
            type: DataTypes.STRING,
            required: true
        },
        lastname: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        role_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        location_id: {
            type: DataTypes.INTEGER,
            required: true
        },
        profilepic: {
            type: DataTypes.STRING,
            required: true
        },
        profilebannerpic: {
            type: DataTypes.STRING,
            required: true
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return user;
};