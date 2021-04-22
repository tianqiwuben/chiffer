'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn(
      'Todos', // table name
      'description', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'Todos', // table name
      'ownerId', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'Todos', // table name
      'requesterId', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    );
    await queryInterface.addColumn(
      'Todos', // table name
      'status', // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    );
    await queryInterface.addColumn(
      'Todos', // table name
      'projectId', // new field name
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Projects',
          key: 'id',
          as: 'projectId',
        },
      },
    );
    await queryInterface.addColumn(
      'Todos', // table name
      'priority', // new field name
      {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('Todos', 'priority'),
      queryInterface.removeColumn('Todos', 'projectId'),
      queryInterface.removeColumn('Todos', 'status'),
      queryInterface.removeColumn('Todos', 'requesterId'),
      queryInterface.removeColumn('Todos', 'ownerId'),
      queryInterface.removeColumn('Todos', 'description'),
     ]);
  }
};
