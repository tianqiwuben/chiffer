'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('UserProjects', {
      fields: ['userId', 'projectId'],
      type: 'unique',
      name: 'custom_primary_constraint_uid_pid'
    });
    await queryInterface.addConstraint('UserProjects', {
      fields: ['projectId', 'userId'],
      type: 'unique',
      name: 'custom_primary_constraint_pid_uid',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserProjects');
  }
};