/**
 * Created by prasanna_d on 7/10/2017.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

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
        }
    },{
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return user;
};