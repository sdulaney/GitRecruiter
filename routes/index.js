var express = require('express');
var router = express.Router();
let models  = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Job.findAll().then(function (results) {
    res.render('index', {
      jobs: results
    });
  });
});

module.exports = router;
