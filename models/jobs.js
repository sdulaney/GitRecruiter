'use strict';
module.exports = (sequelize, DataTypes) => {
  let Jobs = sequelize.define('jobs', {
    job_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    companyid: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
    position: {type: DataTypes.STRING, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    framework: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    state: {type: DataTypes.STRING, allowNull: false},
    zip_code: {type: DataTypes.STRING, allowNull: false},
    country: {type: DataTypes.STRING, allowNull: false},
    latitude: {type: DataTypes.STRING, allowNull: false},
    longitude: {type: DataTypes.STRING, allowNull: false},
  }, {
    underscored: true,
  });

  return Jobs;
};
