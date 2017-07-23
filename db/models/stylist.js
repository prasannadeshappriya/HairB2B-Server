'use strict';
module.exports = function(sequelize, DataTypes) {
  var stylist = sequelize.define('stylist', {
      user_id: {
        type:DataTypes.INTEGER,
        required:true
      },
      description: {
        type:DataTypes.STRING,
        required:true
      },
      rates: {
        type:DataTypes.DOUBLE,
        required:true
      },
      order_completion: {
        type:DataTypes.DOUBLE,
        required:true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //   stylist.hasMany(models.user_skill,{foreignKey: user_id})
      }
    }
  });
  return stylist;
};