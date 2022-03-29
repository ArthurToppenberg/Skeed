var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authentication', { 
    title: 'Authentication',

    type: 'logi',
    //nav bar
    logo: 'images/logo_transparent.png',
    //content
    page: 'Login'
  });
});

router.post('/login', function(req, res, next) {

  console.log('login');
  res.redirect('/users');

});

module.exports = router;
