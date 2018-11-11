'use strict';
module.exports = (sequelize, DataTypes) => {
  let Companies = sequelize.define('companies', {
    company_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
  }, {
    underscored: true,
  });

  Companies.associate = function(models) {
    models.companies.hasMany(models.jobs, {foreignKey: 'company_id'});
  };

  return Companies;
};
