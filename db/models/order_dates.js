'use strict';
module.exports = function(sequelize, DataTypes) {
  var order_dates = sequelize.define('order_dates', {
      order_id: {
        type: DataTypes.INTEGER,
        required: true
      },
      order_date: {
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
  return order_dates;
};