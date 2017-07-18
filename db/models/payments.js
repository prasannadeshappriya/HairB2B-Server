'use strict';
module.exports = function(sequelize, DataTypes) {
  var payments = sequelize.define('payments', {
      amount: {
        type:DataTypes.DOUBLE,
        required:true
      },
      type: {
        type:DataTypes.STRING,
        required:true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return payments;
};