'use strict';
module.exports = (sequelize, DataTypes) => {
  let Job = sequelize.define('Job', {
    position: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    job_id: DataTypes.STRING,
    language: DataTypes.STRING,
  });

  return Job;
};
