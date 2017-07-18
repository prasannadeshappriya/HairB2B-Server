'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_role = sequelize.define('user_role', {
      user_id: {
        type:DataTypes.INTEGER,
        required:true
      },
      role_id: {
        type:DataTypes.INTEGER,
        required:true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_role;
};