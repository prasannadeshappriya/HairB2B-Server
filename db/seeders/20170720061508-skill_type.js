'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('skill_types',[
          {skill_name: 'Barber'},
          {skill_name: 'Makeup'},
          {skill_name: 'Dry cutting'},
          {skill_name: 'Shaving'},
          {skill_name: 'Hair styling'},
          {skill_name: 'Wigs cutting'},
          {skill_name: 'Curling'},
          {skill_name: 'Coloring'},
          {skill_name: 'Color correction'},
          {skill_name: 'Long hair'},
          {skill_name: 'Short hair'}
      ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
