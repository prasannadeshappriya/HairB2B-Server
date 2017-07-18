'use strict';
module.exports = function(sequelize, DataTypes) {
  var skill_type = sequelize.define('skill_type', {
      skill_name: {
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
  return skill_type;
};