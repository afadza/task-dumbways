'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    duration: DataTypes.STRING,
    image: DataTypes.STRING,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    js: DataTypes.BOOLEAN,
    vuejs: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Project',
    timestamps: true,
    createdAt: true,
    updatedAt: 'updateTimestamp'
  });
  return Project;
};