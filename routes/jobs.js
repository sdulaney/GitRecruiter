let express = require('express');
let router = express.Router();
let models = require('../models');
let db = require('../models/index.js');

/* GET jobs listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/add', function(req, res, next) {
    let inputPosition = req.body.position;
    let inputCompany = req.body.company;
    let inputLocation = req.body.location;
    let inputLanguage = req.body.language;
    let inputJobID = req.body.job_id;

    if (inputPosition.length > 0 && inputCompany.length > 0 && inputLocation.length > 0 && inputLanguage.length > 0 && inputJobID.length > 0) {
        models.Job.create({
            position: inputPosition,
            company: inputCompany,
            location: inputLocation,
            language: inputLanguage,
            job_id: inputJobID,
        }).then(function() {
            res.redirect('/');
        });
    } else {
        console.log('You tried to add an invalid job to GitRecruiter.');
        res.redirect('/error');
    }
});

router.get('/delete/:job_id', function(req, res, next) {
    models.Job.find({
        where: {
            job_id: req.params.job_id,
        },
    }).then(function(job) {
        return job.destroy();
    }).then(function() {
        res.redirect('/');
    });
});

module.exports = router;
