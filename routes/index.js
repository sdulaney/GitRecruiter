let express = require('express');
let router = express.Router();
let models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Job.findAll().then(function(results) {
    res.render('index', {
      jobs: results,
    });
  });
});

router.get('/post-job', function(req, res, next) {
  res.render('post-job');
});

router.get('/error', function(req, res, next) {
  res.send('The job is invalid.');
});

module.exports = router;
