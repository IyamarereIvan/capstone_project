'use strict';
module.exports = (sequelize, DataTypes) => {
  const published_docs = sequelize.define('published_docs', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    publishedAt: DataTypes.DATE,
    docUrl: DataTypes.STRING, 
    publisher: DataTypes.INTEGER,
    is_visible: DataTypes.BOOLEAN
  }, {});
  published_docs.associate = function(models) {
    published_docs.belongsTo(
      models.users,{
      as: 'docPublisher',
      foreignKey: "publisher"}
    );
  };
  return published_docs;
};