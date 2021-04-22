'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addIndex('Todos', {
      fields: ['projectId', 'status', 'priority'],
      name: 'custom_primary_constraint_status_priority'
    });
    await queryInterface.addIndex('Todos', {
      fields: ['projectId', 'ownerId', 'status', 'priority'],
      name: 'custom_primary_constraint_ownerid_status_priority'
    });
    await queryInterface.addIndex('Todos', {
      fields: ['projectId', 'requesterId', 'status', 'priority'],
      name: 'custom_primary_constraint_requesterId_status_priority'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.removeIndex('Todos', 'custom_primary_constraint_requesterId_status_priority');
     await queryInterface.removeIndex('Todos', 'custom_primary_constraint_ownerid_status_priority');
     await queryInterface.removeIndex('Todos', 'custom_primary_constraint_status_priority');
  }
};
