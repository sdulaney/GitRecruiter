var express = require('express');
var router = express.Router();
let models  = require('../models');

/* GET jobs listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/delete/:job_id', function (req, res, next) {
	models.Job.find({
        where: {
            job_id: req.params.job_id
        }
    }).then(function(job) {
        return job.destroy();
    }).then(function() {
        res.redirect('/');		
    })
});

module.exports = router;
