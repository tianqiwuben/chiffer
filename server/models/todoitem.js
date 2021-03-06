'use strict';
const {
  Model
} = require('sequelize');

const STATUS = {
  open: 0,
  start: 1,

}

module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TodoItem.belongsTo(models.Todo, {
        foreignKey: 'todoId',
        onDelete: 'CASCADE',
      });
    }
  };
  TodoItem.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TodoItem',
  });
  TodoItem.STATUS = STATUS;
  return TodoItem;
};
