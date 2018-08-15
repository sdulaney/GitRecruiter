let express = require('express');
let router = express.Router();
let models = require('../models');
let bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('user-register');
});

router.post('/register', function(req, res, next) {
  let email = req.body.email;
  let githubHandle = req.body.github_handle;
  let password = req.body.password;
  let confirmPassword = req.body.confirm_password;

  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('github_handle', 'GitHub Handle is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirm_password', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if (errors) {
    res.render('user-register', {
      errors: errors,
    });
  } else {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err;
        }

        models.Users.create({
          email: email,
          github_handle: githubHandle,
          password: hash,
        })
        .then((newUser) => {
          console.log(newUser.toJSON());
        });

      });
    });
    req.flash('success_msg', 'You are registered and can now login');
    res.redirect('/users/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('user-login');
});

module.exports = router;
