'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserLanguages = sequelize.define('user_languages', {
    user_language_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    gh_language: {type: DataTypes.STRING, allowNull: false},
    gh_bytes: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  }, {
    underscored: true,
  });

  return UserLanguages;
};
