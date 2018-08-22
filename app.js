let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let flash = require('connect-flash');
let session = require('express-session');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let jobsRouter = require('./routes/jobs');

let app = express();

let models = require('./models');

// Creates database table for Job
models.jobs.sync({force: true}).then(function() {
  let initialJobs = initJobs();
  return models.jobs.bulkCreate(initialJobs);
}).then(function(jobs) {
  // After inserting all initial books into database, loop over and print out the titles
  // for (let i = 0; i < jobs.length; i++) {
  //     console.log(jobs[i].toJSON());
  // }
});

models.users.sync({force: true})
.then(() => models.users.create({
  email: 'stewart.dulaney@gmail.com',
  password: '1234',
  name: 'Stewart Dulaney',
  gh_handle: 'sdulaney',
  gh_avatar_url: 'https://avatars2.githubusercontent.com/u/10219100?v=4',
  gh_location: 'Los Angeles, CA',
  gh_blog: 'https://www.stewartdulaney.com',
  gh_public_repos: 88,
}))
.then((newUser) => {
  // console.log(newUser.toJSON());
});

models.user_languages.sync({force: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
  let namespace = param.split('.');
  let root = namespace.shift();
  let formParam = root;

  while (namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param: formParam,
    msg: msg,
    value: value,
  };
  },
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
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

module.exports = app;
