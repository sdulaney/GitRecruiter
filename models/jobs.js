'use strict';
module.exports = (sequelize, DataTypes) => {
  let Jobs = sequelize.define('jobs', {
    job_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
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

  Jobs.associate = function(models) {
    models.jobs.hasMany(models.user_job_matches, {foreignKey: 'job_id'});
    models.jobs.belongsTo(models.companies, {foreignKey: 'company_id'});
  };

  return Jobs;
};
