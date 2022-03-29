const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(session({secret: 'ajhmudihabibi', resave: false, saveUninitialized: false}));

// login post
router.post('/login', function(req, res, next) {


  
});

//register post
router.post('/register', function(req, res, next) {

  //save user information into file
  if(validateNewAccount.validate(req.body.username)){
    
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
