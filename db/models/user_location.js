'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_location = sequelize.define('user_location', {
      user_id: {
        type:DataTypes.INTEGER,
        required:true
      },
      date: {
        type:DataTypes.DATE,
        required:true
      },
      location_id: {
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
  return user_location;
};