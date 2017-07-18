'use strict';
module.exports = function(sequelize, DataTypes) {
  var job_type = sequelize.define('job_type', {
      job_name: {
          type:DataTypes.STRING,
          required: true
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return job_type;
};