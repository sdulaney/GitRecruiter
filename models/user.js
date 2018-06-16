'use strict';
module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: DataTypes.STRING,
    github_handle: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return User;
};
