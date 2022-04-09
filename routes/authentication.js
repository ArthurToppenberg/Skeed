//handle regestration and login

const express = require('express');
const session = require('express-session');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({
  secret: 'ajhmudihabibi', 
  resave: true, 
  saveUninitialized: false, 
  cookie: { maxAge: 60*60*1000 }
}));

const validateNewAccount = require('../src/validateNewAccount');
const loginValidation = require('../src/loginValidation');

// login post
router.post('/login', function(req, res, next) {
  if(loginValidation(req.body.username, req.body.password)) {
      // set username in session so we can access it in other routes and validate if user is logged in
    req.session.username = req.body.username;
    res.redirect('/home');
    } else {
      res.redirect('/');
    }
});

//register post
router.post('/register', function(req, res, next) {

  //save user information into file and create if is new user
  if(validateNewAccount(req.body.username, req.body.password, req.body.password_confirmation)) {
    res.redirect('/login');
  } else {
    res.render('authentication', { 
      title: 'Authentication',
  
      type: 'register',
      //nav bar
      logo: 'images/logo_transparent.png',
      //content
      page: 'Register',
      errorregister: 'Unvalid username or password',
    });
  }
});


//redirects ---------------------------------------------------------------


//redirect login
router.get('/login', function(req, res, next) {
  res.render('authentication', { 
    title: 'Authentication',
    type: 'login',
    //nav bar
    logo: 'images/logo_transparent.png',
    //content
    page: 'Login'
  });
});

//redirect register
router.get('/register', function(req, res, next) {
  res.render('authentication', { 
    title: 'Authentication',

    type: 'register',
    //nav bar
    logo: 'images/logo_transparent.png',
    //content
    page: 'Register'
  });
});

router.get('/', function(req, res, next) {
  res.redirect('/login');
});

module.exports = router;
