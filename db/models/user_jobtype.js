'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_jobtype = sequelize.define('user_jobtype', {
    user_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    job_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    price: {
      type:DataTypes.DOUBLE,
      required:true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user_jobtype;
};