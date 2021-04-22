'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.hasMany(models.TodoItem, {
        foreignKey: 'todoId',
        as: 'todoItems',
      });
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    requesterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 4,
      }
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    priority: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.permittedFields = (body) => {
    const rv = {};
    ['title', 'description', 'ownerId', 'requesterId', 'status', 'projectId'].forEach(field => {
      if (body[field] !== undefined) {
        rv[field] = body[field];
      }
    })
    return rv;
  }
  Todo.STATUS = {
    OPEN: 0,
    STARTED: 1,
    FINISHED: 2,
    ACCEPTED: 3,
    REJECTED: 4,
  }
  return Todo;
};