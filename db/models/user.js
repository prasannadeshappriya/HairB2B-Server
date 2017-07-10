'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};