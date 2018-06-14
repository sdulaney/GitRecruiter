let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let jobsRouter = require('./routes/jobs');

let app = express();

let models = require('./models');

// Creates database table for Job
models.Job.sync({force: true}).then(function() {
  let initialJobs = initJobs();
  return models.Job.bulkCreate(initialJobs);
}).then(function(jobs) {
  // After inserting all initial books into database, loop over and print out the titles
  for (let i = 0; i < jobs.length; i++) {
      console.log(jobs[i].position + ', ' + jobs[i].company);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
function initJobs() {
  let initialJobs = [
      {position: 'Software Engineer', company: 'Snap Inc.', location: 'Los Angeles, CA', job_id: '1', language: 'C++'},
      {position: 'Software Engineer', company: 'Microsoft', location: 'Los Angeles, CA', job_id: '2', language: 'C++'},
      {position: 'Software Development Engineer - Amazon Prime Video', company: 'Amazon', location: 'Santa Monica, CA', job_id: '3', language: 'Java'},
      {position: 'Software Engineer', company: 'Facebook', location: 'Los Angeles, CA', job_id: '4', language: 'PHP'},
      {position: 'Software Engineer, Tools and Infrastructure', company: 'Google', location: 'Venice, CA', job_id: '5', language: 'C++'},
      {position: 'Software Engineer, Motion Graphics', company: 'Apple', location: 'Culver City, CA', job_id: '6', language: 'Swift'},
      {position: 'Software Developer - Content (Metadata Platform)', company: 'Hulu', location: 'Santa Monica, CA', job_id: '7', language: 'Python'},
      {position: 'Software Development Engineer in Test - Norton Engineering', company: 'Symantec', location: 'Culver City, CA', job_id: '8', language: 'C++'},
  ];

  return initialJobs;
}

module.exports = app;
