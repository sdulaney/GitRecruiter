'use strict';
module.exports = (sequelize, DataTypes) => {
  let UserJobMatches = sequelize.define('user_job_matches', {
    user_job_match_id: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    match_score: {type: DataTypes.INTEGER.UNSIGNED, allowNull: false},
  }, {
    underscored: true,
  });

  UserJobMatches.associate = function(models) {
    models.user_job_matches.belongsTo(models.users, {foreignKey: 'user_id'});
    models.user_job_matches.belongsTo(models.jobs, {foreignKey: 'job_id'});
  };

  return UserJobMatches;
};
