'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    description: DataTypes.TEXT,
    publishedDocId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isVisible: DataTypes.BOOLEAN,
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(
      models.users,
      { sourceKey: 'userId' },
      { targetKey: 'id' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
    comments.belongsTo(
      models.published_docs,
      { sourceKey: 'publishedDocId' },
      { targetKey: 'id' },
      { onDelete: 'cascade' },
      { onUpdate: 'cascade' }
    );
  };
  return comments;
};