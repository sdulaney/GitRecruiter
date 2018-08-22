'use strict';

let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../config/config.js')[env];
let db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({force: true})
.then(function() {
  db['users'].create({
    email: 'stewart.dulaney@gmail.com',
    password: '1234',
    name: 'Stewart Dulaney',
    gh_handle: 'sdulaney',
    gh_avatar_url: 'https://avatars2.githubusercontent.com/u/10219100?v=4',
    gh_location: 'Los Angeles, CA',
    gh_blog: 'https://www.stewartdulaney.com',
    gh_public_repos: 88,
  });

  let initialJobs = initJobs();
  db['jobs'].bulkCreate(initialJobs);
});

// Helper functions
/**
 * Returns seed data for the Jobs database table.
 * @return {array} jobs seed data
 */
function initJobs() {
  let initialJobs = [
      {companyid: 1, position: 'Software Engineer', language: 'C++', framework: 'Boost', address: '523 Ocean Front Walk', city: 'Venice', state: 'CA', zip_code: '90291', country: 'United States', latitude: '33.99278', longitude: '-118.4786'},
      {companyid: 2, position: 'Software Engineer', language: 'C++', framework: 'Qt', address: '13031 W Jefferson Blvd #200', city: 'Los Angeles', state: 'CA', zip_code: '90094', country: 'United States', latitude: '33.97572', longitude: '-118.4264'},
      {companyid: 3, position: 'Software Development Engineer - Amazon Prime Video', location: 'Santa Monica, CA', language: 'Java', framework: 'Apache Struts', address: '1620 26th St', city: 'Santa Monica', state: 'CA', zip_code: '90404', country: 'United States', latitude: '34.0294', longitude: '-118.47088'},
      {companyid: 4, position: 'Software Engineer', language: 'PHP', framework: 'Laravel', address: '12777 W Jefferson Blvd', city: 'Los Angeles', state: 'CA', zip_code: '90066', country: 'United States', latitude: '33.97804', longitude: '-118.41817'},
      {companyid: 5, position: 'Software Engineer, Tools and Infrastructure', language: 'C++', framework: 'TensorFlow', address: '340 Main St', city: 'Venice', state: 'CA', zip_code: '90291', country: 'United States', latitude: '33.99549', longitude: '-118.476681'},
      {companyid: 6, position: 'Software Engineer, Motion Graphics', language: 'Swift', framework: 'Alamofire', address: '8777 Washington Blvd', city: 'Culver City', state: 'CA', zip_code: '90232', country: 'United States', latitude: '34.02862', longitude: '-118.38645'},
      {companyid: 7, position: 'Software Developer - Content (Metadata Platform)', language: 'Python', framework: 'Django', address: '2500 Broadway', city: 'Santa Monica', state: 'CA', zip_code: '90404', country: 'United States', latitude: '34.03051', longitude: '-118.47363'},
      {companyid: 8, position: 'Software Development Engineer in Test - Norton Engineering', language: 'C++', framework: 'Boost', address: '900 Corporate Pointe', city: ', Culver City', state: 'CA', zip_code: '90230', country: 'United States', latitude: '33.98784', longitude: '-118.38892'},
  ];

  return initialJobs;
}

/**
 * Returns seed data for the Companies database table.
 * @return {array} companies seed data
 */
function initCompanies() {
  let initialCompanies = [
      {name: 'Snap Inc.'},
      {name: 'Microsoft'},
      {name: 'Amazon'},
      {name: 'Facebook'},
      {name: 'Google'},
      {name: 'Apple'},
      {name: 'Hulu'},
      {name: 'Symantec'},
  ];

  return initialCompanies;
}

module.exports = db;
