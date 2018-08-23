'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserTopics = sequelize.define('user_topics', {
    user_topic_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    gh_topic: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  }, {
    underscored: true,
  });

  UserTopics.associate = function(models) {
    models.user_topics.belongsTo(models.users, {foreignKey: 'user_id'});
  };

  return UserTopics;
};
