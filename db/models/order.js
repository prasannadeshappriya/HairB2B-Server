'use strict';
module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define('order', {
    user_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    payment_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    order_expire_date: {
      type:DataTypes.DATE
    },
    order_status: {
      type:DataTypes.STRING,
      required:true
    },
    order_details: {
      type:DataTypes.STRING,
      required:true
    },
    order_amount: {
      type: DataTypes.DOUBLE,
      required: true
    },
    order_location_id: {
      type:DataTypes.INTEGER,
      required:true
    },
    order_create_date: {
      type:DataTypes.DATE,
      required:true
    },
    order_tax: {
      type:DataTypes.DOUBLE,
      required:true
    },
    order_hairbnb: {
      type:DataTypes.DOUBLE,
      required:true
    },
    job_id: {
      type:DataTypes.INTEGER,
      required:true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return order;
};