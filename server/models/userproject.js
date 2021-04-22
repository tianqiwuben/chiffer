'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserProject.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      // })
      // UserProject.belongsTo(models.Project, {
      //   foreignKey: 'projectId',
      //   onDelete: 'CASCADE',
      // })
      
    }
  };
  UserProject.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProject',
  });
  UserProject.ROLES = {
    OWNER: 0,
    MEMBER: 1,
  }
  return UserProject;
};