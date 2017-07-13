'use strict';
module.exports = function(sequelize, DataTypes) {
  var role = sequelize.define('role', {
    role_name: {
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
  return role;
};