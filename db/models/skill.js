'use strict';
module.exports = function(sequelize, DataTypes) {
  var skill = sequelize.define('skill', {
    user_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    job_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    skill_id: {
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
  return skill;
};