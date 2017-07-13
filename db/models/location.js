'use strict';
module.exports = function(sequelize, DataTypes) {
  var location = sequelize.define('location', {
    location_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return location;
};