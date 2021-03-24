"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles,{
        as: 'userRole',
        foreignKey: "role"
      })
    }
  }
  users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      role: DataTypes.INTEGER,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      institution: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
