'use strict';
module.exports = function(sequelize, DataTypes) {
  var busy_date = sequelize.define('busy_date', {
        user_id: {
            type:DataTypes.INTEGER,
            required:true
        },
        date: {
            type:DataTypes.DATE,
            required:true
        }
    }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return busy_date;
};