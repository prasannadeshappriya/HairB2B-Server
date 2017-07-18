'use strict';
module.exports = function(sequelize, DataTypes) {
  var feedback = sequelize.define('feedback', {
      user_id: {
          type:DataTypes.INTEGER,
          required: true
      },
      order_id: {
          type:DataTypes.INTEGER,
          required: true
      },
      feedback_message: DataTypes.STRING,
      rating: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return feedback;
};