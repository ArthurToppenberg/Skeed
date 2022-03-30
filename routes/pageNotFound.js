var express = require('express');
const random_text = require('../src/random_text');
var router = express.Router();

/* GET error page. */
router.get('/', function(req, res, next) {
  res.render('redirect', { 
    title: 'Page not found', 
    redirectLocation: '/home', 
    redirectText: 'Back to home', 
    randomText: random_text(10000)
    });
});

module.exports = router;
