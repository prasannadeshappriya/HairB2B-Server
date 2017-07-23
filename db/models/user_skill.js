'use strict';
module.exports = function(sequelize, DataTypes) {
  var user_skill = sequelize.define('user_skill', {
    user_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    skill_id: {
      type:DataTypes.INTEGER,
      required:true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //   user_skill.hasMany(models.stylist,{foreignKey: user_id})
      }
    }
  });
  return user_skill;
};