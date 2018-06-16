let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('user-register');
});

router.get('/login', function(req, res, next) {
  res.render('user-login');
});

module.exports = router;
